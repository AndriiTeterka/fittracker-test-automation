// Demo Supabase Client for UI Preview
// This allows running the frontend without actual Supabase setup

import { createClient } from '@supabase/supabase-js'

// Check if we're in demo mode
const isDemoMode = import.meta.env.VITE_DEMO_MODE === 'true'

// Demo data for UI preview
const DEMO_USER = {
  id: 'demo-user-id',
  email: 'demo@fittracker.com',
  user_metadata: {
    username: 'Demo User',
    age: 28,
    height_cm: 175,
    weight_kg: 70
  },
  created_at: new Date().toISOString()
}

const DEMO_WORKOUTS = [
  {
    id: 'demo-workout-1',
    user_id: 'demo-user-id',
    name: 'Morning Cardio',
    description: 'Light cardio session to start the day',
    duration_minutes: 30,
    calories_burned: 200,
    workout_date: '2025-10-04',
    status: 'completed',
    created_at: '2025-10-04T06:00:00Z'
  },
  {
    id: 'demo-workout-2',
    user_id: 'demo-user-id',
    name: 'Strength Training',
    description: 'Upper body strength workout',
    duration_minutes: 45,
    calories_burned: 320,
    workout_date: '2025-10-03',
    status: 'completed',
    created_at: '2025-10-03T18:00:00Z'
  },
  {
    id: 'demo-workout-3',
    user_id: 'demo-user-id',
    name: 'Yoga Flow',
    description: 'Relaxing yoga session',
    duration_minutes: 60,
    calories_burned: 150,
    workout_date: '2025-10-02',
    status: 'completed',
    created_at: '2025-10-02T19:00:00Z'
  }
]

const DEMO_EXERCISES = [
  {
    id: 'demo-exercise-1',
    name: 'Push-ups',
    category: 'Strength',
    muscle_group: 'Chest',
    instructions: 'Start in plank position, lower body until chest nearly touches ground, push back up',
    difficulty_level: 'beginner',
    equipment: 'None'
  },
  {
    id: 'demo-exercise-2',
    name: 'Squats',
    category: 'Strength',
    muscle_group: 'Legs',
    instructions: 'Stand with feet shoulder-width, lower hips back and down, return to standing',
    difficulty_level: 'beginner',
    equipment: 'None'
  },
  {
    id: 'demo-exercise-3',
    name: 'Plank',
    category: 'Core',
    muscle_group: 'Core',
    instructions: 'Hold push-up position, keep body straight from head to heels',
    difficulty_level: 'beginner',
    equipment: 'None'
  }
]

// Create demo Supabase client that returns mock data
const createDemoClient = () => {
  const demoClient = {
    auth: {
      signUp: async (credentials: any) => {
        console.log('🎭 Demo Mode: Sign up attempt', credentials.email)
        return {
          data: { user: DEMO_USER, session: { access_token: 'demo-token' } },
          error: null
        }
      },
      signInWithPassword: async (credentials: any) => {
        console.log('🎭 Demo Mode: Sign in attempt', credentials.email)
        return {
          data: { user: DEMO_USER, session: { access_token: 'demo-token' } },
          error: null
        }
      },
      signOut: async () => {
        console.log('🎭 Demo Mode: Sign out')
        return { error: null }
      },
      getSession: async () => {
        return {
          data: { session: { access_token: 'demo-token', user: DEMO_USER } },
          error: null
        }
      },
      getUser: async () => {
        return {
          data: { user: DEMO_USER },
          error: null
        }
      },
      onAuthStateChange: (callback: any) => {
        // Simulate logged in state
        setTimeout(() => {
          callback('SIGNED_IN', { access_token: 'demo-token', user: DEMO_USER })
        }, 100)
        return { data: { subscription: { unsubscribe: () => {} } } }
      }
    },
    from: (table: string) => {
      const mockQuery = {
        select: (columns?: string) => mockQuery,
        insert: (data: any) => mockQuery,
        update: (data: any) => mockQuery,
        delete: () => mockQuery,
        eq: (column: string, value: any) => mockQuery,
        neq: (column: string, value: any) => mockQuery,
        gt: (column: string, value: any) => mockQuery,
        gte: (column: string, value: any) => mockQuery,
        lt: (column: string, value: any) => mockQuery,
        lte: (column: string, value: any) => mockQuery,
        like: (column: string, pattern: string) => mockQuery,
        ilike: (column: string, pattern: string) => mockQuery,
        in: (column: string, values: any[]) => mockQuery,
        order: (column: string, options?: any) => mockQuery,
        limit: (count: number) => mockQuery,
        range: (from: number, to: number) => mockQuery,
        single: () => mockQuery,
        then: async (callback: (result: any) => void) => {
          let data: any = []
          
          switch (table) {
            case 'users':
              data = [DEMO_USER]
              break
            case 'workouts':
              data = DEMO_WORKOUTS
              break
            case 'exercises':
              data = DEMO_EXERCISES
              break
            case 'workout_exercises':
              data = []
              break
            default:
              data = []
          }
          
          const result = { data, error: null, status: 200, statusText: 'OK' }
          console.log(`🎭 Demo Mode: Query ${table}`, result)
          
          if (callback) {
            return callback(result)
          }
          return result
        }
      }
      
      return mockQuery
    },
    rpc: async (functionName: string, params?: any) => {
      console.log(`🎭 Demo Mode: RPC call ${functionName}`, params)
      return { data: null, error: null }
    }
  }
  
  return demoClient as any
}

// Create the actual or demo client
const supabase = isDemoMode 
  ? createDemoClient()
  : createClient(
      import.meta.env.NEXT_PUBLIC_SUPABASE_URL || '',
      import.meta.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''
    )

// Add demo mode indicator
if (isDemoMode) {
  console.log('🎭 DEMO MODE ENABLED - Using mock data for UI preview')
  console.log('📊 Available demo data:', {
    user: DEMO_USER,
    workouts: DEMO_WORKOUTS.length,
    exercises: DEMO_EXERCISES.length
  })
}

export { supabase }
export default supabase

// Export demo data for use in components
export const demoData = {
  user: DEMO_USER,
  workouts: DEMO_WORKOUTS,
  exercises: DEMO_EXERCISES,
  isDemoMode
}