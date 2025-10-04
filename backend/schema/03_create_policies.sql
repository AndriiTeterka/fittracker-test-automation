-- Create Row Level Security Policies
-- Execute this script after enabling RLS

-- =============================================================================
-- USERS TABLE POLICIES
-- =============================================================================

-- Users can read their own profile
CREATE POLICY "Users can read their own profile" ON public.users
  FOR SELECT
  USING (auth_id = auth.uid());

-- Users can update their own profile
CREATE POLICY "Users can update their own profile" ON public.users
  FOR UPDATE
  USING (auth_id = auth.uid());

-- Admins can read all users
CREATE POLICY "Admins can read all users" ON public.users
  FOR SELECT
  USING (public.is_admin(auth.uid()));

-- Enable insert for authenticated users (handled by trigger)
CREATE POLICY "Enable insert for authenticated users" ON public.users
  FOR INSERT
  WITH CHECK (auth.uid() IS NOT NULL);

-- Admins can update any user
CREATE POLICY "Admins can update any user" ON public.users
  FOR UPDATE
  USING (public.is_admin(auth.uid()));

-- Only admins can delete users
CREATE POLICY "Only admins can delete users" ON public.users
  FOR DELETE
  USING (public.is_admin(auth.uid()));

-- =============================================================================
-- WORKOUTS TABLE POLICIES
-- =============================================================================

-- Users can read their own workouts
CREATE POLICY "Users can read their own workouts" ON public.workouts
  FOR SELECT
  USING (user_id = public.get_user_id());

-- Users can create their own workouts
CREATE POLICY "Users can create their own workouts" ON public.workouts
  FOR INSERT
  WITH CHECK (user_id = public.get_user_id());

-- Users can update their own workouts
CREATE POLICY "Users can update their own workouts" ON public.workouts
  FOR UPDATE
  USING (user_id = public.get_user_id());

-- Users can delete their own workouts
CREATE POLICY "Users can delete their own workouts" ON public.workouts
  FOR DELETE
  USING (user_id = public.get_user_id());

-- Admins can read all workouts
CREATE POLICY "Admins can read all workouts" ON public.workouts
  FOR SELECT
  USING (public.is_admin(auth.uid()));

-- Admins can update any workout
CREATE POLICY "Admins can update any workout" ON public.workouts
  FOR UPDATE
  USING (public.is_admin(auth.uid()));

-- Admins can delete any workout
CREATE POLICY "Admins can delete any workout" ON public.workouts
  FOR DELETE
  USING (public.is_admin(auth.uid()));

-- =============================================================================
-- EXERCISES TABLE POLICIES
-- =============================================================================

-- Everyone can read exercises
CREATE POLICY "Everyone can read exercises" ON public.exercises
  FOR SELECT
  USING (auth.uid() IS NOT NULL);

-- Only admins can create exercises
CREATE POLICY "Only admins can create exercises" ON public.exercises
  FOR INSERT
  WITH CHECK (public.is_admin(auth.uid()));

-- Only admins can update exercises
CREATE POLICY "Only admins can update exercises" ON public.exercises
  FOR UPDATE
  USING (public.is_admin(auth.uid()));

-- Only admins can delete exercises
CREATE POLICY "Only admins can delete exercises" ON public.exercises
  FOR DELETE
  USING (public.is_admin(auth.uid()));

-- =============================================================================
-- WORKOUT_EXERCISES TABLE POLICIES
-- =============================================================================

-- Users can read their workout exercises
CREATE POLICY "Users can read their workout exercises" ON public.workout_exercises
  FOR SELECT
  USING (
    workout_id IN (
      SELECT id FROM public.workouts WHERE user_id = public.get_user_id()
    )
  );

-- Users can create exercises for their workouts
CREATE POLICY "Users can create their workout exercises" ON public.workout_exercises
  FOR INSERT
  WITH CHECK (
    workout_id IN (
      SELECT id FROM public.workouts WHERE user_id = public.get_user_id()
    )
  );

-- Users can update exercises in their workouts
CREATE POLICY "Users can update their workout exercises" ON public.workout_exercises
  FOR UPDATE
  USING (
    workout_id IN (
      SELECT id FROM public.workouts WHERE user_id = public.get_user_id()
    )
  );

-- Users can delete exercises from their workouts
CREATE POLICY "Users can delete their workout exercises" ON public.workout_exercises
  FOR DELETE
  USING (
    workout_id IN (
      SELECT id FROM public.workouts WHERE user_id = public.get_user_id()
    )
  );

-- Admins can read all workout exercises
CREATE POLICY "Admins can read all workout exercises" ON public.workout_exercises
  FOR SELECT
  USING (public.is_admin(auth.uid()));

-- Admins can manage all workout exercises
CREATE POLICY "Admins can manage all workout exercises" ON public.workout_exercises
  FOR ALL
  USING (public.is_admin(auth.uid()));

-- =============================================================================
-- USER_PREFERENCES TABLE POLICIES
-- =============================================================================

-- Users can read their own preferences
CREATE POLICY "Users can read their own preferences" ON public.user_preferences
  FOR SELECT
  USING (user_id = public.get_user_id());

-- Users can update their own preferences
CREATE POLICY "Users can update their own preferences" ON public.user_preferences
  FOR UPDATE
  USING (user_id = public.get_user_id());

-- Enable insert for authenticated users (handled by trigger)
CREATE POLICY "Enable insert for authenticated users" ON public.user_preferences
  FOR INSERT
  WITH CHECK (user_id = public.get_user_id());

-- Admins can read all user preferences
CREATE POLICY "Admins can read all user preferences" ON public.user_preferences
  FOR SELECT
  USING (public.is_admin(auth.uid()));

-- Admins can update any user preferences
CREATE POLICY "Admins can update any user preferences" ON public.user_preferences
  FOR UPDATE
  USING (public.is_admin(auth.uid()));

-- Grant necessary permissions
GRANT USAGE ON SCHEMA public TO anon, authenticated;
GRANT ALL ON ALL TABLES IN SCHEMA public TO anon, authenticated;
GRANT ALL ON ALL SEQUENCES IN SCHEMA public TO anon, authenticated;
GRANT EXECUTE ON ALL FUNCTIONS IN SCHEMA public TO anon, authenticated;

-- Create indexes on commonly queried fields for RLS performance
CREATE INDEX IF NOT EXISTS idx_users_auth_id_role ON public.users(auth_id, role);
CREATE INDEX IF NOT EXISTS idx_workouts_user_id_date ON public.workouts(user_id, workout_date);

COMMENT ON SCHEMA public IS 'FitTracker application schema with Row Level Security enabled';