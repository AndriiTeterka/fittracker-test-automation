# FitTracker API Documentation

Complete API reference for the FitTracker application built on Supabase.

## Base URL

```
https://your-project-id.supabase.co/rest/v1
```

## Authentication

All API requests require authentication using Bearer tokens.

### Headers

```http
Authorization: Bearer YOUR_JWT_TOKEN
apikey: YOUR_SUPABASE_ANON_KEY
Content-Type: application/json
Prefer: return=representation
```

## Authentication Endpoints

### Sign Up

```http
POST /auth/v1/signup
```

**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "password123",
  "data": {
    "username": "johndoe",
    "age": 25,
    "height_cm": 175,
    "weight_kg": 70
  }
}
```

**Response (201):**
```json
{
  "access_token": "jwt_token_here",
  "token_type": "bearer",
  "expires_in": 3600,
  "refresh_token": "refresh_token_here",
  "user": {
    "id": "uuid",
    "email": "user@example.com",
    "created_at": "2025-10-04T17:00:00Z"
  }
}
```

### Sign In

```http
POST /auth/v1/token?grant_type=password
```

**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "password123"
}
```

### Sign Out

```http
POST /auth/v1/logout
```

## Users API

### Get Current User Profile

```http
GET /users?auth_id=eq.{auth_user_id}&select=*
```

**Response (200):**
```json
[
  {
    "id": "uuid",
    "auth_id": "uuid",
    "username": "johndoe",
    "email": "user@example.com",
    "age": 25,
    "height_cm": 175,
    "weight_kg": 70.5,
    "role": "user",
    "avatar_url": null,
    "created_at": "2025-10-04T17:00:00Z",
    "updated_at": "2025-10-04T17:00:00Z"
  }
]
```

### Update User Profile

```http
PATCH /users?id=eq.{user_id}
```

**Request Body:**
```json
{
  "username": "newusername",
  "age": 26,
  "height_cm": 176,
  "weight_kg": 72.0
}
```

### Get All Users (Admin only)

```http
GET /users?select=*&order=created_at.desc&limit=20&offset=0
```

## Workouts API

### Get User Workouts

```http
GET /workouts?user_id=eq.{user_id}&select=*,workout_exercises(id,exercise_id,exercises(name,category),sets,reps,weight_kg)&order=workout_date.desc
```

**Query Parameters:**
- `limit`: Number of results (default: 20, max: 100)
- `offset`: Pagination offset
- `workout_date`: Filter by date (`gte.2025-10-01`, `lte.2025-10-31`)
- `status`: Filter by status (`eq.completed`)

**Response (200):**
```json
[
  {
    "id": "uuid",
    "user_id": "uuid",
    "name": "Morning Push Session",
    "description": "Chest and triceps focused workout",
    "duration_minutes": 45,
    "calories_burned": 320,
    "workout_date": "2025-10-04",
    "status": "completed",
    "created_at": "2025-10-04T17:00:00Z",
    "updated_at": "2025-10-04T17:00:00Z",
    "workout_exercises": [
      {
        "id": "uuid",
        "exercise_id": "uuid",
        "exercises": {
          "name": "Push-ups",
          "category": "Strength"
        },
        "sets": 3,
        "reps": 15,
        "weight_kg": 0
      }
    ]
  }
]
```

### Create Workout

```http
POST /workouts
```

**Request Body:**
```json
{
  "user_id": "uuid",
  "name": "Evening Cardio",
  "description": "Light cardio session",
  "duration_minutes": 30,
  "calories_burned": 200,
  "workout_date": "2025-10-04",
  "status": "planned"
}
```

### Update Workout

```http
PATCH /workouts?id=eq.{workout_id}
```

**Request Body:**
```json
{
  "name": "Updated Workout Name",
  "duration_minutes": 50,
  "calories_burned": 350,
  "status": "completed"
}
```

### Delete Workout

```http
DELETE /workouts?id=eq.{workout_id}
```

## Exercises API

### Get All Exercises

```http
GET /exercises?select=*&order=name.asc
```

**Query Parameters:**
- `category`: Filter by category (`eq.Strength`, `eq.Cardio`, `eq.Core`)
- `muscle_group`: Filter by muscle group (`eq.Chest`, `eq.Back`, `eq.Legs`)
- `difficulty_level`: Filter by difficulty (`eq.beginner`, `eq.intermediate`, `eq.advanced`)
- `name`: Search by name (`ilike.*push*`)

**Response (200):**
```json
[
  {
    "id": "uuid",
    "name": "Push-ups",
    "category": "Strength",
    "muscle_group": "Chest",
    "instructions": "Start in plank position, lower body until chest nearly touches ground, push back up",
    "difficulty_level": "beginner",
    "equipment": "None",
    "image_url": null,
    "created_at": "2025-10-04T17:00:00Z",
    "updated_at": "2025-10-04T17:00:00Z"
  }
]
```

### Search Exercises

```http
GET /exercises?or=(name.ilike.*{query}*,instructions.ilike.*{query}*,muscle_group.ilike.*{query}*)&limit=10
```

### Create Exercise (Admin only)

```http
POST /exercises
```

**Request Body:**
```json
{
  "name": "New Exercise",
  "category": "Strength",
  "muscle_group": "Arms",
  "instructions": "Detailed exercise instructions",
  "difficulty_level": "intermediate",
  "equipment": "Dumbbells"
}
```

## Workout Exercises API

### Add Exercise to Workout

```http
POST /workout_exercises
```

**Request Body:**
```json
{
  "workout_id": "uuid",
  "exercise_id": "uuid",
  "sets": 3,
  "reps": 12,
  "weight_kg": 20.0,
  "duration_seconds": null,
  "rest_seconds": 60,
  "notes": "Good form, increase weight next time"
}
```

### Update Workout Exercise

```http
PATCH /workout_exercises?id=eq.{workout_exercise_id}
```

**Request Body:**
```json
{
  "sets": 4,
  "reps": 10,
  "weight_kg": 22.5,
  "notes": "Increased weight successfully"
}
```

### Delete Exercise from Workout

```http
DELETE /workout_exercises?id=eq.{workout_exercise_id}
```

## User Preferences API

### Get User Preferences

```http
GET /user_preferences?user_id=eq.{user_id}&select=*
```

**Response (200):**
```json
[
  {
    "id": "uuid",
    "user_id": "uuid",
    "preferred_units": "metric",
    "fitness_goal": "muscle_gain",
    "activity_level": "moderate",
    "notifications_enabled": true,
    "theme": "light",
    "created_at": "2025-10-04T17:00:00Z",
    "updated_at": "2025-10-04T17:00:00Z"
  }
]
```

### Update User Preferences

```http
PATCH /user_preferences?user_id=eq.{user_id}
```

**Request Body:**
```json
{
  "preferred_units": "imperial",
  "fitness_goal": "weight_loss",
  "activity_level": "active",
  "theme": "dark"
}
```

## Error Responses

### 400 Bad Request
```json
{
  "code": "PGRST103",
  "details": "The request parameters are invalid",
  "hint": "Check your query parameters",
  "message": "Bad request"
}
```

### 401 Unauthorized
```json
{
  "message": "JWT expired"
}
```

### 403 Forbidden
```json
{
  "code": "42501",
  "details": "permission denied for table users",
  "hint": null,
  "message": "new row violates row-level security policy for table \"users\""
}
```

### 404 Not Found
```json
{
  "code": "PGRST116",
  "details": "The result contains 0 rows",
  "hint": null,
  "message": "JSON object requested, multiple (or no) rows returned"
}
```

### 422 Unprocessable Entity
```json
{
  "code": "23505",
  "details": "Key (email)=(user@example.com) already exists.",
  "hint": null,
  "message": "duplicate key value violates unique constraint \"users_email_key\""
}
```

## Rate Limiting

- **Anonymous requests**: 100 requests per hour
- **Authenticated requests**: 1000 requests per hour
- **Admin requests**: 5000 requests per hour

## Pagination

Use `limit` and `offset` parameters for pagination:

```http
GET /workouts?limit=10&offset=20
```

**Response Headers:**
```
Content-Range: 20-29/150
```

## Filtering and Sorting

### Comparison Operators
- `eq`: equals
- `neq`: not equals
- `gt`: greater than
- `gte`: greater than or equal
- `lt`: less than
- `lte`: less than or equal
- `like`: pattern matching (case-sensitive)
- `ilike`: pattern matching (case-insensitive)
- `in`: one of a list of values
- `is`: checking for exact equality (null, true, false)

### Examples
```http
# Filter by date range
GET /workouts?workout_date=gte.2025-10-01&workout_date=lte.2025-10-31

# Search by name
GET /exercises?name=ilike.*push*

# Multiple filters
GET /exercises?category=eq.Strength&difficulty_level=eq.beginner

# Sorting
GET /workouts?order=workout_date.desc,created_at.asc
```

## Testing Endpoints

For test automation, these endpoints provide useful utilities:

### Health Check
```http
GET /health
```

### Reset Test Data
```http
POST /rpc/cleanup_test_data
```

### Create Sample Data
```http
POST /rpc/create_sample_workouts_for_user
```

**Request Body:**
```json
{
  "target_user_id": "uuid"
}
```

---

## SDK Examples

### JavaScript/TypeScript

```typescript
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  'https://your-project-id.supabase.co',
  'your-anon-key'
)

// Sign in
const { data, error } = await supabase.auth.signInWithPassword({
  email: 'user@example.com',
  password: 'password123'
})

// Get workouts
const { data: workouts } = await supabase
  .from('workouts')
  .select(`
    *,
    workout_exercises (
      *,
      exercises (name, category)
    )
  `)
  .order('workout_date', { ascending: false })
  .limit(10)
```

### REST Assured (Java)

```java
import io.restassured.RestAssured;
import static io.restassured.RestAssured.*;
import static org.hamcrest.Matchers.*;

public class FitTrackerApiTest {
    private static final String BASE_URL = "https://your-project-id.supabase.co/rest/v1";
    private static final String API_KEY = "your-anon-key";
    
    @Test
    public void testGetWorkouts() {
        given()
            .baseUri(BASE_URL)
            .header("apikey", API_KEY)
            .header("Authorization", "Bearer " + jwt_token)
        .when()
            .get("/workouts")
        .then()
            .statusCode(200)
            .body("size()", greaterThan(0))
            .body("[0].name", notNullValue());
    }
}
```