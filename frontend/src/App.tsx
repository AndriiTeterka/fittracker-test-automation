import { Routes, Route, Navigate } from 'react-router-dom'
import { Suspense } from 'react'

// Layout Components
import { Layout } from '@components/layout/Layout'
import { ProtectedRoute } from '@components/auth/ProtectedRoute'
import { LoadingSpinner } from '@components/ui/LoadingSpinner'

// Page Components (lazy loaded for better performance)
import { lazy } from 'react'

const LoginPage = lazy(() => import('@pages/auth/LoginPage'))
const RegisterPage = lazy(() => import('@pages/auth/RegisterPage'))
const DashboardPage = lazy(() => import('@pages/dashboard/DashboardPage'))
const WorkoutsPage = lazy(() => import('@pages/workouts/WorkoutsPage'))
const WorkoutDetailPage = lazy(() => import('@pages/workouts/WorkoutDetailPage'))
const ExercisesPage = lazy(() => import('@pages/exercises/ExercisesPage'))
const ProfilePage = lazy(() => import('@pages/profile/ProfilePage'))
const AdminPage = lazy(() => import('@pages/admin/AdminPage'))
const NotFoundPage = lazy(() => import('@pages/NotFoundPage'))

function App() {
  return (
    <div 
      className="min-h-screen bg-background font-sans antialiased"
      data-testid="app-container"
    >
      <Suspense 
        fallback={
          <div className="flex items-center justify-center min-h-screen">
            <LoadingSpinner size="lg" />
          </div>
        }
      >
        <Routes>
          {/* Public Routes */}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          
          {/* Protected Routes */}
          <Route element={<ProtectedRoute />}>
            <Route element={<Layout />}>
              <Route path="/dashboard" element={<DashboardPage />} />
              <Route path="/workouts" element={<WorkoutsPage />} />
              <Route path="/workouts/:id" element={<WorkoutDetailPage />} />
              <Route path="/exercises" element={<ExercisesPage />} />
              <Route path="/profile" element={<ProfilePage />} />
              
              {/* Admin Routes */}
              <Route 
                path="/admin/*" 
                element={
                  <ProtectedRoute requiredRole="admin">
                    <AdminPage />
                  </ProtectedRoute>
                } 
              />
            </Route>
          </Route>
          
          {/* Default Redirects */}
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Suspense>
      
      {/* Development/Test Mode Indicators */}
      {(import.meta.env.DEV || import.meta.env.VITE_TEST_MODE) && (
        <div 
          className="fixed bottom-4 right-4 bg-yellow-100 border border-yellow-400 text-yellow-800 px-2 py-1 rounded text-xs font-mono z-50"
          data-testid="test-mode-indicator"
        >
          TEST MODE
        </div>
      )}
      
      {/* Accessibility Announcements */}
      <div 
        id="announcements" 
        className="sr-only" 
        aria-live="polite" 
        aria-atomic="true"
        data-testid="accessibility-announcements"
      />
    </div>
  )
}

export default App