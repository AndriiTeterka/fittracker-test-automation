-- Sample Data for FitTracker Application
-- Execute this script after setting up schema and policies
-- This data is designed for testing automation scenarios

-- =============================================================================
-- SAMPLE EXERCISES DATA
-- =============================================================================

INSERT INTO public.exercises (name, category, muscle_group, instructions, difficulty_level, equipment) VALUES
-- Chest Exercises
('Push-ups', 'Strength', 'Chest', 'Start in plank position, lower body until chest nearly touches ground, push back up', 'beginner', 'None'),
('Bench Press', 'Strength', 'Chest', 'Lie on bench, grip bar shoulder-width apart, lower to chest, press up', 'intermediate', 'Barbell'),
('Incline Dumbbell Press', 'Strength', 'Chest', 'Lie on inclined bench, press dumbbells up and together', 'intermediate', 'Dumbbells'),
('Chest Flyes', 'Strength', 'Chest', 'Lie flat, arms extended with dumbbells, lower in arc motion, squeeze chest', 'beginner', 'Dumbbells'),

-- Back Exercises
('Pull-ups', 'Strength', 'Back', 'Hang from bar, pull body up until chin over bar, lower slowly', 'intermediate', 'Pull-up Bar'),
('Deadlift', 'Strength', 'Back', 'Stand with feet hip-width, bend at hips and knees, lift bar keeping back straight', 'advanced', 'Barbell'),
('Bent-over Rows', 'Strength', 'Back', 'Bend forward at hips, pull weight to lower chest, squeeze shoulder blades', 'intermediate', 'Barbell'),
('Lat Pulldowns', 'Strength', 'Back', 'Sit at machine, pull bar down to upper chest, squeeze lats', 'beginner', 'Cable Machine'),

-- Legs Exercises
('Squats', 'Strength', 'Legs', 'Stand with feet shoulder-width, lower hips back and down, return to standing', 'beginner', 'None'),
('Lunges', 'Strength', 'Legs', 'Step forward, lower hips until both knees at 90 degrees, return to start', 'beginner', 'None'),
('Leg Press', 'Strength', 'Legs', 'Sit in machine, place feet on platform, push weight up extending legs', 'beginner', 'Leg Press Machine'),
('Calf Raises', 'Strength', 'Legs', 'Stand with balls of feet on edge, raise up on toes, lower slowly', 'beginner', 'None'),

-- Shoulders Exercises
('Shoulder Press', 'Strength', 'Shoulders', 'Press weights overhead from shoulder level, lower with control', 'intermediate', 'Dumbbells'),
('Lateral Raises', 'Strength', 'Shoulders', 'Raise weights out to sides until parallel to ground, lower slowly', 'beginner', 'Dumbbells'),
('Front Raises', 'Strength', 'Shoulders', 'Raise weights forward to shoulder height, lower slowly', 'beginner', 'Dumbbells'),

-- Arms Exercises
('Bicep Curls', 'Strength', 'Arms', 'Curl weights up to shoulders, squeeze biceps, lower slowly', 'beginner', 'Dumbbells'),
('Tricep Dips', 'Strength', 'Arms', 'Support body on chair/bench, lower body by bending elbows, push back up', 'intermediate', 'Chair/Bench'),
('Hammer Curls', 'Strength', 'Arms', 'Curl weights with neutral grip, keep elbows at sides', 'beginner', 'Dumbbells'),

-- Core Exercises
('Plank', 'Core', 'Core', 'Hold push-up position, keep body straight from head to heels', 'beginner', 'None'),
('Crunches', 'Core', 'Core', 'Lie on back, curl shoulders toward knees, squeeze abs', 'beginner', 'None'),
('Mountain Climbers', 'Cardio', 'Core', 'Start in plank, alternate bringing knees to chest rapidly', 'intermediate', 'None'),
('Russian Twists', 'Core', 'Core', 'Sit with knees bent, lean back slightly, rotate torso side to side', 'intermediate', 'None'),

-- Cardio Exercises
('Running', 'Cardio', 'Full Body', 'Maintain steady pace, land on midfoot, keep upright posture', 'beginner', 'None'),
('Jump Rope', 'Cardio', 'Full Body', 'Jump over rope with both feet, maintain steady rhythm', 'intermediate', 'Jump Rope'),
('Burpees', 'Cardio', 'Full Body', 'Drop to squat, jump back to plank, push-up, jump feet forward, jump up', 'advanced', 'None'),
('High Knees', 'Cardio', 'Legs', 'Run in place bringing knees up to waist level', 'beginner', 'None');

-- =============================================================================
-- CREATE TEST USERS (Will be created via auth, but we need to set up profiles)
-- Note: Users will be created through the application auth system
-- This is just for reference - actual user creation happens via Supabase Auth
-- =============================================================================

-- The following users should be created through the application:
-- 1. admin@fittracker.com (password: Admin123!) - Admin user
-- 2. john.doe@fittracker.com (password: User123!) - Regular user
-- 3. jane.smith@fittracker.com (password: User123!) - Regular user
-- 4. mike.wilson@fittracker.com (password: User123!) - Regular user
-- 5. test.user@fittracker.com (password: Test123!) - Test user for automation

-- =============================================================================
-- SAMPLE WORKOUTS (Will be created after users exist)
-- =============================================================================

-- Note: The following INSERT statements should be run AFTER creating users through auth
-- Replace the user_id values with actual UUIDs from the users table

/*
-- Sample workout data (uncomment and update user_id values after user creation)

-- Sample workouts for testing
INSERT INTO public.workouts (user_id, name, description, duration_minutes, calories_burned, workout_date, status) VALUES
-- Replace 'USER_ID_1' with actual user UUID
('USER_ID_1', 'Morning Push Session', 'Chest and triceps focused workout', 45, 320, '2025-10-01', 'completed'),
('USER_ID_1', 'Leg Day', 'Lower body strength training', 60, 450, '2025-10-02', 'completed'),
('USER_ID_1', 'Cardio Blast', 'High intensity cardio session', 30, 280, '2025-10-03', 'completed'),
('USER_ID_1', 'Back and Biceps', 'Pull exercises focus', 50, 380, '2025-10-04', 'planned'),

-- Replace 'USER_ID_2' with actual user UUID
('USER_ID_2', 'Full Body Beginner', 'Introduction to strength training', 40, 250, '2025-10-01', 'completed'),
('USER_ID_2', 'Yoga Flow', 'Flexibility and core strength', 35, 150, '2025-10-02', 'completed'),
('USER_ID_2', 'Walking Session', 'Light cardio activity', 25, 120, '2025-10-03', 'completed');

-- Sample workout exercises (link exercises to workouts)
INSERT INTO public.workout_exercises (workout_id, exercise_id, sets, reps, weight_kg, notes) VALUES
-- Replace WORKOUT_ID and EXERCISE_ID with actual UUIDs
('WORKOUT_ID_1', 'EXERCISE_ID_PUSHUPS', 3, 15, 0, 'Perfect form maintained'),
('WORKOUT_ID_1', 'EXERCISE_ID_BENCHPRESS', 4, 8, 70, 'Increased weight from last session'),
('WORKOUT_ID_1', 'EXERCISE_ID_CHESTFLYES', 3, 12, 15, 'Good stretch at bottom'),

('WORKOUT_ID_2', 'EXERCISE_ID_SQUATS', 4, 12, 0, 'Bodyweight only'),
('WORKOUT_ID_2', 'EXERCISE_ID_LUNGES', 3, 10, 0, 'Each leg'),
('WORKOUT_ID_2', 'EXERCISE_ID_CALFRAISES', 3, 20, 0, 'Slow and controlled');
*/

-- =============================================================================
-- FUNCTIONS FOR TEST DATA MANAGEMENT
-- =============================================================================

-- Function to create sample workout data for a specific user
CREATE OR REPLACE FUNCTION public.create_sample_workouts_for_user(target_user_id UUID)
RETURNS VOID AS $$
DECLARE
    workout1_id UUID;
    workout2_id UUID;
    workout3_id UUID;
    pushups_id UUID;
    bench_id UUID;
    squats_id UUID;
    lunges_id UUID;
BEGIN
    -- Get exercise IDs
    SELECT id INTO pushups_id FROM public.exercises WHERE name = 'Push-ups' LIMIT 1;
    SELECT id INTO bench_id FROM public.exercises WHERE name = 'Bench Press' LIMIT 1;
    SELECT id INTO squats_id FROM public.exercises WHERE name = 'Squats' LIMIT 1;
    SELECT id INTO lunges_id FROM public.exercises WHERE name = 'Lunges' LIMIT 1;
    
    -- Create sample workouts
    INSERT INTO public.workouts (user_id, name, description, duration_minutes, calories_burned, workout_date, status)
    VALUES 
        (target_user_id, 'Morning Push Session', 'Chest and triceps focused workout', 45, 320, CURRENT_DATE - INTERVAL '3 days', 'completed')
    RETURNING id INTO workout1_id;
    
    INSERT INTO public.workouts (user_id, name, description, duration_minutes, calories_burned, workout_date, status)
    VALUES 
        (target_user_id, 'Leg Day', 'Lower body strength training', 60, 450, CURRENT_DATE - INTERVAL '2 days', 'completed')
    RETURNING id INTO workout2_id;
    
    INSERT INTO public.workouts (user_id, name, description, duration_minutes, calories_burned, workout_date, status)
    VALUES 
        (target_user_id, 'Cardio Session', 'High intensity cardio', 30, 280, CURRENT_DATE - INTERVAL '1 day', 'completed')
    RETURNING id INTO workout3_id;
    
    -- Add exercises to workouts
    IF workout1_id IS NOT NULL AND pushups_id IS NOT NULL THEN
        INSERT INTO public.workout_exercises (workout_id, exercise_id, sets, reps, weight_kg, notes)
        VALUES 
            (workout1_id, pushups_id, 3, 15, 0, 'Perfect form maintained'),
            (workout1_id, bench_id, 4, 8, 70, 'Increased weight from last session');
    END IF;
    
    IF workout2_id IS NOT NULL AND squats_id IS NOT NULL THEN
        INSERT INTO public.workout_exercises (workout_id, exercise_id, sets, reps, weight_kg, notes)
        VALUES 
            (workout2_id, squats_id, 4, 12, 0, 'Bodyweight only'),
            (workout2_id, lunges_id, 3, 10, 0, 'Each leg');
    END IF;
    
    RAISE NOTICE 'Sample workouts created for user %', target_user_id;
END;
$$ LANGUAGE plpgsql;

-- Function to clean up test data
CREATE OR REPLACE FUNCTION public.cleanup_test_data()
RETURNS VOID AS $$
BEGIN
    DELETE FROM public.workout_exercises;
    DELETE FROM public.workouts;
    DELETE FROM public.user_preferences WHERE user_id IN (
        SELECT id FROM public.users WHERE email LIKE '%test%' OR email LIKE '%fittracker.com'
    );
    DELETE FROM public.users WHERE email LIKE '%test%' OR email LIKE '%fittracker.com';
    
    RAISE NOTICE 'Test data cleaned up successfully';
END;
$$ LANGUAGE plpgsql;

COMMENT ON FUNCTION public.create_sample_workouts_for_user IS 'Creates sample workout data for testing purposes';
COMMENT ON FUNCTION public.cleanup_test_data IS 'Removes all test data from the database';

-- Create some default data that doesn't require user authentication
COMMENT ON TABLE public.exercises IS 'Exercise library populated with sample exercises for testing';
COMMENT ON SCHEMA public IS 'FitTracker schema with sample data ready for test automation';