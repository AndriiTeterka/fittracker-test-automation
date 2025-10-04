# Backend Setup - Supabase Configuration

This backend uses Supabase as a Backend-as-a-Service (BaaS) platform providing:
- PostgreSQL Database
- Authentication
- Real-time subscriptions
- Auto-generated REST API
- Row Level Security (RLS)

**Important**: This is a Supabase-based backend, not a traditional Node.js server. The `package.json` contains Supabase CLI tools and utilities for development.

## 🚀 Quick Setup

### Option 1: Manual Setup (Recommended for beginners)

#### 1. Create Supabase Project

1. Go to [Supabase](https://app.supabase.com)
2. Create a new project
3. Choose project details:
   - **Name**: FitTracker Test Automation
   - **Database Password**: Generate a secure password (save it!)
   - **Region**: Choose closest to your location
4. Wait for the database to be ready (2-3 minutes)

#### 2. Get API Keys

1. In your Supabase project dashboard, go to **Settings** > **API**
2. Copy these values:
   - **URL**: `https://your-project-id.supabase.co`
   - **anon public**: Your public API key
   - **service_role**: Your service role key (keep secret!)

#### 3. Configure Frontend Environment

Create `.env.local` in the **frontend** directory (not backend):

```bash
cd frontend
cp .env.example .env.local
```

Edit `frontend/.env.local` with your Supabase values:

```bash
NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
```

#### 4. Setup Database Schema

In your Supabase dashboard, go to **SQL Editor** and execute these scripts **in order**:

1. **Create Tables**: Copy and run `backend/schema/01_create_tables.sql`
2. **Enable RLS**: Copy and run `backend/schema/02_enable_rls.sql`
3. **Create Policies**: Copy and run `backend/schema/03_create_policies.sql`
4. **Insert Sample Data**: Copy and run `backend/schema/04_sample_data.sql`

#### 5. Verify Setup

In Supabase Dashboard, check:
- **Database > Tables**: You should see `users`, `workouts`, `exercises` tables
- **Authentication > Users**: Should be empty initially
- **API > Logs**: Should show no errors

### Option 2: Using Supabase CLI (Advanced)

**Prerequisites**: Install Supabase CLI first
```bash
npm install -g supabase
```

```bash
cd backend
npm install

# Initialize local Supabase (optional for local development)
supabase init

# Start local Supabase (requires Docker)
supabase start

# Apply migrations
supabase db reset

# Generate TypeScript types
npm run generate:types
```

## 📊 Database Schema

### Users Table (extends Supabase auth.users)
```sql
CREATE TABLE public.users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  auth_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
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
CREATE TABLE public.workouts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  name VARCHAR(255) NOT NULL,
  description TEXT,
  duration_minutes INTEGER CHECK (duration_minutes > 0),
  calories_burned INTEGER CHECK (calories_burned >= 0),
  workout_date DATE NOT NULL DEFAULT CURRENT_DATE,
  status VARCHAR(20) DEFAULT 'completed',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);
```

### Exercises Table
```sql
CREATE TABLE public.exercises (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(255) NOT NULL UNIQUE,
  category VARCHAR(100) NOT NULL,
  muscle_group VARCHAR(100) NOT NULL,
  instructions TEXT NOT NULL,
  difficulty_level VARCHAR(20) DEFAULT 'beginner',
  equipment VARCHAR(100),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);
```

## 🔐 Row Level Security (RLS)

RLS is automatically configured to ensure:
- **Users**: Can only access their own profile data
- **Workouts**: Users can only see/modify their own workouts
- **Exercises**: All authenticated users can read, only admins can modify
- **Admin Access**: Admin users can access all data

## 📡 API Endpoints

Supabase automatically generates REST API endpoints at:
`https://your-project-id.supabase.co/rest/v1/`

### Authentication Endpoints
```
POST /auth/v1/signup     - Create new user
POST /auth/v1/token      - Login user  
POST /auth/v1/logout     - Logout user
GET  /auth/v1/user       - Get current user
```

### Data Endpoints
```
# Users
GET    /rest/v1/users
PATCH  /rest/v1/users?id=eq.{user_id}

# Workouts
GET    /rest/v1/workouts
POST   /rest/v1/workouts
PATCH  /rest/v1/workouts?id=eq.{workout_id}
DELETE /rest/v1/workouts?id=eq.{workout_id}

# Exercises
GET    /rest/v1/exercises
POST   /rest/v1/exercises  # Admin only
PATCH  /rest/v1/exercises?id=eq.{exercise_id}  # Admin only
```

## 🧪 Test Data and Utilities

### Pre-configured Test Users
After running the sample data script, you can use these test accounts:

- **Admin**: `admin@fittracker.com` / `Admin123!`
- **User 1**: `john.doe@fittracker.com` / `User123!`
- **User 2**: `jane.smith@fittracker.com` / `User123!`

### Testing Functions
```sql
-- Reset all test data
SELECT cleanup_test_data();

-- Create sample workouts for a user
SELECT create_sample_workouts_for_user('user-uuid-here');
```

### API Testing Examples

**Get user workouts:**
```bash
curl -X GET 'https://your-project.supabase.co/rest/v1/workouts' \
  -H "apikey: YOUR_ANON_KEY" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

**Create new workout:**
```bash
curl -X POST 'https://your-project.supabase.co/rest/v1/workouts' \
  -H "apikey: YOUR_ANON_KEY" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test Workout",
    "duration_minutes": 30,
    "calories_burned": 200
  }'
```

## 📊 Monitoring and Debugging

### Supabase Dashboard
- **Database > Tables**: View all tables and data
- **Authentication > Users**: Manage user accounts
- **API > Logs**: Monitor API requests and errors
- **Settings > API**: Check CORS and key settings

### Common Debugging Commands
```bash
# Check database status (if using CLI)
supabase status

# View logs (if using CLI)
supabase logs

# Reset database (if using CLI)
supabase db reset
```

## 🚫 Troubleshooting

### ❌ "npm install" not working?
**Issue**: Backend folder doesn't behave like a normal Node.js project
**Solution**: This is normal! Backend uses Supabase (cloud database). Only install frontend dependencies:
```bash
cd frontend
npm install
```

### ❌ RLS blocking queries?
**Solution**: Check that your JWT token is valid and policies are correctly set up

### ❌ CORS errors?
**Solution**: 
1. Go to Supabase Dashboard > Settings > API
2. Add your domain to CORS origins: `http://localhost:3000`

### ❌ Database connection failed?
**Solution**: 
1. Check your `.env.local` file in frontend folder
2. Verify Supabase URL and keys are correct
3. Ensure your Supabase project is active

### ❌ Sample data not appearing?
**Solution**: 
1. Check you ran all 4 SQL scripts in order
2. Verify in Supabase Dashboard > Database > Tables
3. Try running the sample data script again

---

**Next Step**: [Set up the Frontend Application](../frontend/README.md)