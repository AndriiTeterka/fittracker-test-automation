-- Enable Row Level Security (RLS) for all tables
-- Execute this script after creating tables

-- Enable RLS on all tables
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.workouts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.exercises ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.workout_exercises ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_preferences ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if they exist (for re-running script)
DROP POLICY IF EXISTS "Users can read their own profile" ON public.users;
DROP POLICY IF EXISTS "Users can update their own profile" ON public.users;
DROP POLICY IF EXISTS "Admins can read all users" ON public.users;
DROP POLICY IF EXISTS "Enable insert for authenticated users" ON public.users;

DROP POLICY IF EXISTS "Users can read their own workouts" ON public.workouts;
DROP POLICY IF EXISTS "Users can create their own workouts" ON public.workouts;
DROP POLICY IF EXISTS "Users can update their own workouts" ON public.workouts;
DROP POLICY IF EXISTS "Users can delete their own workouts" ON public.workouts;
DROP POLICY IF EXISTS "Admins can read all workouts" ON public.workouts;

DROP POLICY IF EXISTS "Everyone can read exercises" ON public.exercises;
DROP POLICY IF EXISTS "Only admins can modify exercises" ON public.exercises;

DROP POLICY IF EXISTS "Users can read their workout exercises" ON public.workout_exercises;
DROP POLICY IF EXISTS "Users can manage their workout exercises" ON public.workout_exercises;

DROP POLICY IF EXISTS "Users can read their own preferences" ON public.user_preferences;
DROP POLICY IF EXISTS "Users can update their own preferences" ON public.user_preferences;
DROP POLICY IF EXISTS "Enable insert for authenticated users" ON public.user_preferences;

-- Create helper function to check if user is admin
CREATE OR REPLACE FUNCTION public.is_admin(user_uuid UUID)
RETURNS BOOLEAN AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM public.users 
    WHERE auth_id = user_uuid AND role = 'admin'
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create helper function to get current user's profile ID
CREATE OR REPLACE FUNCTION public.get_user_id()
RETURNS UUID AS $$
BEGIN
  RETURN (SELECT id FROM public.users WHERE auth_id = auth.uid());
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

COMMENT ON FUNCTION public.is_admin IS 'Check if the given user UUID has admin role';
COMMENT ON FUNCTION public.get_user_id IS 'Get the profile ID for the current authenticated user';