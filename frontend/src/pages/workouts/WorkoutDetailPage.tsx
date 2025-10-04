import React from 'react'
import { useParams, Link } from 'react-router-dom'
import { demoData } from '@/lib/supabase-demo'

export default function WorkoutDetailPage() {
  const { id } = useParams<{ id: string }>()
  const workout = demoData.workouts.find(w => w.id === id)

  if (!workout) {
    return (
      <div className="text-center py-12" data-testid="workout-not-found">
        <div className="text-gray-400 text-6xl mb-4">🔍</div>
        <h3 className="text-lg font-medium text-gray-900 mb-2">Workout Not Found</h3>
        <p className="text-gray-600 mb-4">The requested workout could not be found.</p>
        <Link
          to="/workouts"
          className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
          data-testid="back-to-workouts"
        >
          ← Back to Workouts
        </Link>
      </div>
    )
  }

  return (
    <div className="space-y-6" data-testid="workout-detail-page">
      {/* Header */}
      <div className="bg-white shadow rounded-lg">
        <div className="px-4 py-5 sm:p-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900" data-testid="workout-detail-name">
                {workout.name}
              </h1>
              <p className="mt-1 text-sm text-gray-600" data-testid="workout-detail-description">
                {workout.description}
              </p>
            </div>
            <span 
              className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                workout.status === 'completed' ? 'bg-green-100 text-green-800' :
                workout.status === 'planned' ? 'bg-blue-100 text-blue-800' :
                'bg-red-100 text-red-800'
              }`}
              data-testid="workout-detail-status"
            >
              {workout.status}
            </span>
          </div>
        </div>
      </div>

      {/* Workout Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white shadow rounded-lg p-4" data-testid="workout-duration-stat">
          <div className="flex items-center">
            <span className="text-2xl mr-3">⏱️</span>
            <div>
              <p className="text-sm text-gray-600">Duration</p>
              <p className="text-lg font-semibold text-gray-900">{workout.duration_minutes} minutes</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white shadow rounded-lg p-4" data-testid="workout-calories-stat">
          <div className="flex items-center">
            <span className="text-2xl mr-3">🔥</span>
            <div>
              <p className="text-sm text-gray-600">Calories</p>
              <p className="text-lg font-semibold text-gray-900">{workout.calories_burned} kcal</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white shadow rounded-lg p-4" data-testid="workout-date-stat">
          <div className="flex items-center">
            <span className="text-2xl mr-3">📅</span>
            <div>
              <p className="text-sm text-gray-600">Date</p>
              <p className="text-lg font-semibold text-gray-900">
                {new Date(workout.workout_date).toLocaleDateString()}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="flex space-x-3">
        <Link
          to="/workouts"
          className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
          data-testid="back-to-workouts-button"
        >
          ← Back to Workouts
        </Link>
        <button
          className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
          data-testid="edit-workout-button"
        >
          ✏️ Edit Workout
        </button>
      </div>
    </div>
  )
}