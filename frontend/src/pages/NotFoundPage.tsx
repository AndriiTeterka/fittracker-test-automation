import React from 'react'
import { Link } from 'react-router-dom'

export default function NotFoundPage() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8" data-testid="not-found-page">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="text-center">
          <div className="text-9xl mb-4">🏃‍♂️</div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4" data-testid="not-found-title">
            404
          </h1>
          <h2 className="text-xl text-gray-600 mb-8" data-testid="not-found-subtitle">
            Looks like you took a wrong turn!
          </h2>
          <p className="text-gray-500 mb-8">
            The page you're looking for doesn't exist.
          </p>
          <div className="space-x-4">
            <Link
              to="/dashboard"
              className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              data-testid="go-to-dashboard"
            >
              🏠 Go to Dashboard
            </Link>
            <Link
              to="/workouts"
              className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              data-testid="go-to-workouts"
            >
              🏋️ View Workouts
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}