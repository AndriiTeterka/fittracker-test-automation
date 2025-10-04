import React, { useState } from 'react'
import { useAuth } from '@/contexts/AuthContext'
import { demoData } from '@/lib/supabase-demo'
import { LoadingSpinner } from '@/components/ui/LoadingSpinner'

interface Workout {
  id: string
  name: string
  description: string
  duration_minutes: number
  calories_burned: number
  workout_date: string
  status: 'planned' | 'completed' | 'cancelled'
}

export default function WorkoutsPage() {
  const { isDemoMode } = useAuth()
  const [workouts, setWorkouts] = useState<Workout[]>(isDemoMode ? demoData.workouts : [])
  const [loading, setLoading] = useState(false)
  const [showCreateModal, setShowCreateModal] = useState(false)
  const [editingWorkout, setEditingWorkout] = useState<Workout | null>(null)
  const [filterStatus, setFilterStatus] = useState<string>('all')
  const [searchTerm, setSearchTerm] = useState('')
  
  // Filter workouts based on status and search
  const filteredWorkouts = workouts.filter(workout => {
    const matchesStatus = filterStatus === 'all' || workout.status === filterStatus
    const matchesSearch = workout.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         workout.description.toLowerCase().includes(searchTerm.toLowerCase())
    return matchesStatus && matchesSearch
  })

  const handleCreateWorkout = () => {
    setEditingWorkout(null)
    setShowCreateModal(true)
  }

  const handleEditWorkout = (workout: Workout) => {
    setEditingWorkout(workout)
    setShowCreateModal(true)
  }

  const handleDeleteWorkout = (workoutId: string) => {
    if (window.confirm('Are you sure you want to delete this workout?')) {
      setWorkouts(prev => prev.filter(w => w.id !== workoutId))
    }
  }

  const handleSaveWorkout = (workoutData: Omit<Workout, 'id'>) => {
    if (editingWorkout) {
      // Update existing workout
      setWorkouts(prev => prev.map(w => 
        w.id === editingWorkout.id 
          ? { ...workoutData, id: editingWorkout.id }
          : w
      ))
    } else {
      // Create new workout
      const newWorkout: Workout = {
        ...workoutData,
        id: `workout-${Date.now()}`
      }
      setWorkouts(prev => [newWorkout, ...prev])
    }
    setShowCreateModal(false)
    setEditingWorkout(null)
  }

  return (
    <div className="space-y-6" data-testid="workouts-page">
      {/* Header */}
      <div className="bg-white shadow rounded-lg">
        <div className="px-4 py-5 sm:p-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900" data-testid="workouts-title">
                My Workouts
              </h1>
              <p className="mt-1 text-sm text-gray-600" data-testid="workouts-subtitle">
                Track and manage your fitness sessions
              </p>
            </div>
            <button
              onClick={handleCreateWorkout}
              className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              data-testid="create-workout-button"
            >
              <span className="mr-2">➕</span>
              New Workout
            </button>
          </div>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="bg-white shadow rounded-lg">
        <div className="px-4 py-4 sm:px-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-3 sm:space-y-0 sm:space-x-4">
            {/* Search */}
            <div className="flex-1 max-w-lg">
              <label htmlFor="search" className="sr-only">Search workouts</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  placeholder="Search workouts..."
                  data-testid="search-input"
                />
              </div>
            </div>
            
            {/* Status Filter */}
            <div className="flex items-center space-x-4">
              <label htmlFor="status-filter" className="text-sm font-medium text-gray-700">
                Status:
              </label>
              <select
                id="status-filter"
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
                data-testid="status-filter"
              >
                <option value="all">All Status</option>
                <option value="planned">Planned</option>
                <option value="completed">Completed</option>
                <option value="cancelled">Cancelled</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Workouts List */}
      <div className="bg-white shadow rounded-lg" data-testid="workouts-list">
        <div className="px-4 py-5 sm:p-6">
          {loading ? (
            <div className="flex justify-center py-8">
              <LoadingSpinner size="lg" />
            </div>
          ) : filteredWorkouts.length > 0 ? (
            <div className="space-y-4" data-testid="workout-items">
              {filteredWorkouts.map((workout, index) => (
                <div 
                  key={workout.id} 
                  className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
                  data-testid={`workout-item-${index}`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3">
                        <h3 className="text-lg font-medium text-gray-900" data-testid={`workout-name-${index}`}>
                          {workout.name}
                        </h3>
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          workout.status === 'completed' ? 'bg-green-100 text-green-800' :
                          workout.status === 'planned' ? 'bg-blue-100 text-blue-800' :
                          'bg-red-100 text-red-800'
                        }`} data-testid={`workout-status-${index}`}>
                          {workout.status}
                        </span>
                      </div>
                      <p className="mt-1 text-sm text-gray-600" data-testid={`workout-description-${index}`}>
                        {workout.description}
                      </p>
                      <div className="mt-2 flex items-center space-x-4 text-sm text-gray-500">
                        <span data-testid={`workout-duration-${index}`}>
                          ⏱️ {workout.duration_minutes} minutes
                        </span>
                        <span data-testid={`workout-calories-${index}`}>
                          🔥 {workout.calories_burned} calories
                        </span>
                        <span data-testid={`workout-date-${index}`}>
                          📅 {new Date(workout.workout_date).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => handleEditWorkout(workout)}
                        className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                        data-testid={`edit-workout-${index}`}
                      >
                        ✏️ Edit
                      </button>
                      <button
                        onClick={() => handleDeleteWorkout(workout.id)}
                        className="inline-flex items-center px-3 py-2 border border-red-300 shadow-sm text-sm leading-4 font-medium rounded-md text-red-700 bg-white hover:bg-red-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                        data-testid={`delete-workout-${index}`}
                      >
                        🗑️ Delete
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12" data-testid="no-workouts-message">
              <div className="text-gray-400 text-6xl mb-4">🏋️</div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">No workouts found</h3>
              <p className="text-gray-600 mb-4">
                {searchTerm || filterStatus !== 'all' 
                  ? 'Try adjusting your filters or search terms'
                  : 'Start your fitness journey by creating your first workout'}
              </p>
              {!searchTerm && filterStatus === 'all' && (
                <button
                  onClick={handleCreateWorkout}
                  className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
                  data-testid="create-first-workout-button"
                >
                  ➕ Create Your First Workout
                </button>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Create/Edit Modal */}
      {showCreateModal && (
        <WorkoutModal
          workout={editingWorkout}
          onSave={handleSaveWorkout}
          onCancel={() => {
            setShowCreateModal(false)
            setEditingWorkout(null)
          }}
        />
      )}
    </div>
  )
}

// Workout Create/Edit Modal Component
interface WorkoutModalProps {
  workout: Workout | null
  onSave: (workout: Omit<Workout, 'id'>) => void
  onCancel: () => void
}

function WorkoutModal({ workout, onSave, onCancel }: WorkoutModalProps) {
  const [formData, setFormData] = useState({
    name: workout?.name || '',
    description: workout?.description || '',
    duration_minutes: workout?.duration_minutes || 30,
    calories_burned: workout?.calories_burned || 200,
    workout_date: workout?.workout_date || new Date().toISOString().split('T')[0],
    status: (workout?.status || 'planned') as 'planned' | 'completed' | 'cancelled'
  })
  
  const [errors, setErrors] = useState<any>({})

  const validateForm = () => {
    const newErrors: any = {}
    
    if (!formData.name.trim()) newErrors.name = 'Workout name is required'
    if (formData.duration_minutes <= 0) newErrors.duration_minutes = 'Duration must be positive'
    if (formData.calories_burned < 0) newErrors.calories_burned = 'Calories cannot be negative'
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (validateForm()) {
      onSave(formData)
    }
  }

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50" data-testid="workout-modal">
      <div className="relative top-20 mx-auto p-5 border w-full max-w-md shadow-lg rounded-md bg-white">
        <div className="mt-3">
          <h2 className="text-lg font-bold text-gray-900 mb-4" data-testid="modal-title">
            {workout ? 'Edit Workout' : 'Create New Workout'}
          </h2>
          
          <form onSubmit={handleSubmit} className="space-y-4" data-testid="workout-form">
            <div>
              <label className="block text-sm font-medium text-gray-700">Workout Name</label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                placeholder="e.g., Morning Cardio"
                data-testid="workout-name"
              />
              {errors.name && <p className="mt-1 text-sm text-red-600" data-testid="name-error">{errors.name}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Description</label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                rows={3}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                placeholder="Describe your workout..."
                data-testid="workout-description"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Duration (minutes)</label>
                <input
                  type="number"
                  value={formData.duration_minutes}
                  onChange={(e) => setFormData({ ...formData, duration_minutes: parseInt(e.target.value) || 0 })}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  min="1"
                  data-testid="workout-duration"
                />
                {errors.duration_minutes && <p className="mt-1 text-sm text-red-600" data-testid="duration-error">{errors.duration_minutes}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Calories Burned</label>
                <input
                  type="number"
                  value={formData.calories_burned}
                  onChange={(e) => setFormData({ ...formData, calories_burned: parseInt(e.target.value) || 0 })}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  min="0"
                  data-testid="workout-calories"
                />
                {errors.calories_burned && <p className="mt-1 text-sm text-red-600" data-testid="calories-error">{errors.calories_burned}</p>}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Date</label>
                <input
                  type="date"
                  value={formData.workout_date}
                  onChange={(e) => setFormData({ ...formData, workout_date: e.target.value })}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  data-testid="workout-date"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Status</label>
                <select
                  value={formData.status}
                  onChange={(e) => setFormData({ ...formData, status: e.target.value as any })}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  data-testid="workout-status"
                >
                  <option value="planned">Planned</option>
                  <option value="completed">Completed</option>
                  <option value="cancelled">Cancelled</option>
                </select>
              </div>
            </div>

            <div className="flex items-center justify-end space-x-3 pt-4">
              <button
                type="button"
                onClick={onCancel}
                className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                data-testid="cancel-workout"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                data-testid="save-workout"
              >
                {workout ? 'Update' : 'Create'} Workout
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}