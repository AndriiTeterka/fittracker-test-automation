import React, { useState } from 'react'
import { Link, Navigate, useLocation } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { useAuth } from '@/contexts/AuthContext'
import { LoadingSpinner } from '@/components/ui/LoadingSpinner'

interface LoginForm {
  email: string
  password: string
}

function LoginPage() {
  const { signIn, user, loading: authLoading, isDemoMode } = useAuth()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const location = useLocation()
  
  const from = (location.state as any)?.from?.pathname || '/dashboard'

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginForm>()

  // Redirect if already logged in
  if (user && !authLoading) {
    return <Navigate to={from} replace />
  }

  const onSubmit = async (data: LoginForm) => {
    setLoading(true)
    setError('')

    try {
      const { error } = await signIn(data.email, data.password)
      if (error) {
        setError(error.message)
      }
    } catch (err) {
      setError('An unexpected error occurred. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8" data-testid="login-page">
      <div className="max-w-md w-full space-y-8">
        <div>
          <div className="mx-auto h-12 w-12 flex items-center justify-center rounded-full bg-blue-100">
            <svg className="h-8 w-8 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900" data-testid="login-title">
            Sign in to FitTracker
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Don't have an account?{' '}
            <Link to="/register" className="font-medium text-blue-600 hover:text-blue-500" data-testid="register-link">
              Sign up
            </Link>
          </p>
          
          {isDemoMode && (
            <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-md" data-testid="demo-mode-notice">
              <p className="text-sm text-yellow-800">
                <strong>Demo Mode:</strong> Use any email/password to login
                <br />
                <span className="text-xs">Try: demo@fittracker.com / demo123</span>
              </p>
            </div>
          )}
        </div>
        
        <form className="mt-8 space-y-6" onSubmit={handleSubmit(onSubmit)} data-testid="login-form">
          {error && (
            <div className="rounded-md bg-red-50 p-4" data-testid="error-message">
              <div className="flex">
                <div className="flex-shrink-0">
                  <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="ml-3">
                  <p className="text-sm text-red-700">{error}</p>
                </div>
              </div>
            </div>
          )}
          
          <div className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email address
              </label>
              <input
                {...register('email', {
                  required: 'Email is required',
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: 'Invalid email address'
                  }
                })}
                type="email"
                className="mt-1 appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                placeholder="Enter your email"
                data-testid="email-input"
              />
              {errors.email && (
                <p className="mt-1 text-sm text-red-600" data-testid="email-error">
                  {errors.email.message}
                </p>
              )}
            </div>
            
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <input
                {...register('password', {
                  required: 'Password is required',
                  minLength: {
                    value: 6,
                    message: 'Password must be at least 6 characters'
                  }
                })}
                type="password"
                className="mt-1 appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                placeholder="Enter your password"
                data-testid="password-input"
              />
              {errors.password && (
                <p className="mt-1 text-sm text-red-600" data-testid="password-error">
                  {errors.password.message}
                </p>
              )}
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="text-sm">
              <Link to="/forgot-password" className="font-medium text-blue-600 hover:text-blue-500" data-testid="forgot-password-link">
                Forgot your password?
              </Link>
            </div>
          </div>

          <div>
            <button
              type="submit"
              disabled={loading}
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
              data-testid="login-button"
            >
              {loading ? (
                <div className="flex items-center">
                  <LoadingSpinner size="sm" className="mr-2" />
                  Signing in...
                </div>
              ) : (
                'Sign in'
              )}
            </button>
          </div>
          
          {isDemoMode && (
            <div className="mt-4 space-y-2" data-testid="demo-credentials">
              <p className="text-xs text-gray-500 text-center">Demo credentials:</p>
              <div className="grid grid-cols-1 gap-2 text-xs">
                <div className="text-center">
                  <span className="font-mono bg-gray-100 px-2 py-1 rounded">admin@fittracker.com</span> / 
                  <span className="font-mono bg-gray-100 px-2 py-1 rounded ml-1">Admin123!</span>
                </div>
                <div className="text-center">
                  <span className="font-mono bg-gray-100 px-2 py-1 rounded">demo@fittracker.com</span> / 
                  <span className="font-mono bg-gray-100 px-2 py-1 rounded ml-1">demo123</span>
                </div>
              </div>
            </div>
          )}
        </form>
      </div>
    </div>
  )
}

export default LoginPage