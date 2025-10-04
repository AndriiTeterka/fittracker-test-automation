# Backend Setup - Supabase Configuration

This backend uses Supabase as a Backend-as-a-Service (BaaS) platform providing:
- PostgreSQL Database
- Authentication
- Real-time subscriptions
- Auto-generated REST API
- Row Level Security (RLS)

## 🚀 Quick Setup

### 1. Create Supabase Project

1. Go to [Supabase](https://app.supabase.com)
2. Create a new project
3. Wait for the database to be ready (2-3 minutes)
4. Copy your project URL and anon key

### 2. Environment Configuration

Create `.env.local` in the frontend directory:

```bash
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
```

### 3. Database Schema Setup

Run the SQL scripts in your Supabase SQL Editor:

1. **Create Tables**: Execute `schema/01_create_tables.sql`
2. **Enable RLS**: Execute `schema/02_enable_rls.sql`
3. **Create Policies**: Execute `schema/03_create_policies.sql`
4. **Insert Sample Data**: Execute `schema/04_sample_data.sql`

### 4. Verify Setup

Check in Supabase Dashboard:
- Tables are created with proper columns
- RLS is enabled on all tables
- Policies are active
- Sample data is inserted

## 📊 Database Schema

### Users Table
```sql
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  username VARCHAR(50) UNIQUE NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  age INTEGER CHECK (age > 0 AND age < 120),
  height_cm INTEGER CHECK (height_cm > 0 AND height_cm < 300),
  weight_kg DECIMAL(5,2) CHECK (weight_kg > 0 AND weight_kg < 500),
  role VARCHAR(20) DEFAULT 'user' CHECK (role IN ('user', 'admin')),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);
```

### Workouts Table
```sql
CREATE TABLE workouts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  name VARCHAR(255) NOT NULL,
  description TEXT,
  duration_minutes INTEGER CHECK (duration_minutes > 0),
  calories_burned INTEGER CHECK (calories_burned >= 0),
  workout_date DATE NOT NULL DEFAULT CURRENT_DATE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);
```

### Exercises Table
```sql
CREATE TABLE exercises (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(255) NOT NULL,
  category VARCHAR(100) NOT NULL,
  muscle_group VARCHAR(100) NOT NULL,
  instructions TEXT NOT NULL,
  difficulty_level VARCHAR(20) DEFAULT 'beginner' 
    CHECK (difficulty_level IN ('beginner', 'intermediate', 'advanced')),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);
```

## 🔐 Row Level Security (RLS)

### Users Policies
- Users can read their own profile
- Users can update their own profile
- Admins can read all users
- Only authenticated users can create accounts

### Workouts Policies
- Users can CRUD their own workouts
- Admins can read all workouts

### Exercises Policies
- All authenticated users can read exercises
- Only admins can create/update/delete exercises

## 📡 API Endpoints

Supabase auto-generates REST API endpoints:

### Authentication
```
POST /auth/v1/signup
POST /auth/v1/signin
POST /auth/v1/signout
GET  /auth/v1/user
```

### Users
```
GET    /rest/v1/users
GET    /rest/v1/users?id=eq.{id}
PATCH  /rest/v1/users?id=eq.{id}
DELETE /rest/v1/users?id=eq.{id}
```

### Workouts
```
GET    /rest/v1/workouts
POST   /rest/v1/workouts
GET    /rest/v1/workouts?id=eq.{id}
PATCH  /rest/v1/workouts?id=eq.{id}
DELETE /rest/v1/workouts?id=eq.{id}
```

### Exercises
```
GET    /rest/v1/exercises
POST   /rest/v1/exercises
GET    /rest/v1/exercises?id=eq.{id}
PATCH  /rest/v1/exercises?id=eq.{id}
DELETE /rest/v1/exercises?id=eq.{id}
```

## 🔍 Query Examples

### Filter and Search
```javascript
// Get workouts for specific user
const { data } = await supabase
  .from('workouts')
  .select('*')
  .eq('user_id', userId)

// Search exercises by muscle group
const { data } = await supabase
  .from('exercises')
  .select('*')
  .ilike('muscle_group', '%chest%')

// Get workouts with pagination
const { data } = await supabase
  .from('workouts')
  .select('*')
  .range(0, 9) // First 10 records
```

## 🛠️ Testing Utilities

### Test Data Reset
```sql
-- Clear all data (for testing)
DELETE FROM workouts;
DELETE FROM exercises;
DELETE FROM auth.users;
```

### Create Test User
```javascript
const { data, error } = await supabase.auth.signUp({
  email: 'test@fittracker.com',
  password: 'Test123!',
  options: {
    data: {
      username: 'testuser',
      age: 25,
      height_cm: 175,
      weight_kg: 70
    }
  }
})
```

## 📊 Monitoring

- **Database**: Supabase Dashboard > Database
- **Auth**: Supabase Dashboard > Authentication
- **API Logs**: Supabase Dashboard > API
- **Real-time**: Supabase Dashboard > Realtime

## 🚫 Common Issues

### Issue: RLS blocking queries
**Solution**: Check policies are correctly set up

### Issue: CORS errors
**Solution**: Add your domain to Supabase > Settings > API

### Issue: Auth not persisting
**Solution**: Check localStorage and session configuration

---

**Next**: Set up the [Frontend Application](../frontend/README.md)