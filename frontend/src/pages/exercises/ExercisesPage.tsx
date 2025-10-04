import React, { useState, useMemo } from 'react'
import { demoData } from '@/lib/supabase-demo'
import { LoadingSpinner } from '@/components/ui/LoadingSpinner'

interface Exercise {
  id: string
  name: string
  category: string
  muscle_group: string
  instructions: string
  difficulty_level: 'beginner' | 'intermediate' | 'advanced'
  equipment: string
}

export default function ExercisesPage() {
  const [exercises] = useState<Exercise[]>(demoData.exercises)
  const [loading] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const [categoryFilter, setCategoryFilter] = useState('all')
  const [difficultyFilter, setDifficultyFilter] = useState('all')
  const [selectedExercise, setSelectedExercise] = useState<Exercise | null>(null)

  // Get unique categories and difficulties
  const categories = useMemo(() => {
    const cats = [...new Set(exercises.map(e => e.category))]
    return ['all', ...cats]
  }, [exercises])

  const difficulties = ['all', 'beginner', 'intermediate', 'advanced']

  // Filter exercises
  const filteredExercises = useMemo(() => {
    return exercises.filter(exercise => {
      const matchesSearch = exercise.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          exercise.muscle_group.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesCategory = categoryFilter === 'all' || exercise.category === categoryFilter
      const matchesDifficulty = difficultyFilter === 'all' || exercise.difficulty_level === difficultyFilter
      
      return matchesSearch && matchesCategory && matchesDifficulty
    })
  }, [exercises, searchTerm, categoryFilter, difficultyFilter])

  const getDifficultyColor = (level: string) => {
    switch (level) {
      case 'beginner': return 'bg-green-100 text-green-800'
      case 'intermediate': return 'bg-yellow-100 text-yellow-800'
      case 'advanced': return 'bg-red-100 text-red-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <div className="space-y-6" data-testid="exercises-page">
      {/* Header */}
      <div className="bg-white shadow rounded-lg">
        <div className="px-4 py-5 sm:p-6">
          <h1 className="text-2xl font-bold text-gray-900" data-testid="exercises-title">
            Exercise Library
          </h1>
          <p className="mt-1 text-sm text-gray-600" data-testid="exercises-subtitle">
            Browse and discover exercises for your workouts
          </p>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="bg-white shadow rounded-lg">
        <div className="px-4 py-4 sm:px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {/* Search */}
            <div className="md:col-span-2">
              <label htmlFor="search" className="sr-only">Search exercises</label>
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
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  placeholder="Search exercises..."
                  data-testid="exercise-search"
                />
              </div>
            </div>
            
            {/* Category Filter */}
            <div>
              <select
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
                className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
                data-testid="category-filter"
              >
                {categories.map(cat => (
                  <option key={cat} value={cat}>
                    {cat === 'all' ? 'All Categories' : cat}
                  </option>
                ))}
              </select>
            </div>
            
            {/* Difficulty Filter */}
            <div>
              <select
                value={difficultyFilter}
                onChange={(e) => setDifficultyFilter(e.target.value)}
                className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
                data-testid="difficulty-filter"
              >
                {difficulties.map(diff => (
                  <option key={diff} value={diff}>
                    {diff === 'all' ? 'All Levels' : diff.charAt(0).toUpperCase() + diff.slice(1)}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Results count */}
      <div className="text-sm text-gray-600" data-testid="results-count">
        Showing {filteredExercises.length} of {exercises.length} exercises
      </div>

      {/* Exercise Grid */}
      {loading ? (
        <div className="flex justify-center py-8">
          <LoadingSpinner size="lg" />
        </div>
      ) : filteredExercises.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" data-testid="exercises-grid">
          {filteredExercises.map((exercise, index) => (
            <div 
              key={exercise.id}
              className="bg-white shadow rounded-lg p-6 hover:shadow-md transition-shadow cursor-pointer"
              onClick={() => setSelectedExercise(exercise)}
              data-testid={`exercise-card-${index}`}
            >
              <div className="flex items-start justify-between mb-3">
                <h3 className="text-lg font-medium text-gray-900" data-testid={`exercise-name-${index}`}>
                  {exercise.name}
                </h3>
                <span 
                  className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getDifficultyColor(exercise.difficulty_level)}`}
                  data-testid={`exercise-difficulty-${index}`}
                >
                  {exercise.difficulty_level}
                </span>
              </div>
              
              <div className="space-y-2 mb-4">
                <div className="flex items-center text-sm text-gray-600">
                  <span className="mr-2">💪</span>
                  <span data-testid={`exercise-muscle-${index}`}>{exercise.muscle_group}</span>
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <span className="mr-2">🏷️</span>
                  <span data-testid={`exercise-category-${index}`}>{exercise.category}</span>
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <span className="mr-2">🛠️</span>
                  <span data-testid={`exercise-equipment-${index}`}>{exercise.equipment || 'None'}</span>
                </div>
              </div>
              
              <p className="text-sm text-gray-600 line-clamp-3" data-testid={`exercise-instructions-${index}`}>
                {exercise.instructions}
              </p>
              
              <div className="mt-4 pt-3 border-t border-gray-200">
                <button 
                  className="text-blue-600 hover:text-blue-500 text-sm font-medium"
                  data-testid={`view-exercise-${index}`}
                >
                  View Details →
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-12" data-testid="no-exercises-message">
          <div className="text-gray-400 text-6xl mb-4">💪</div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">No exercises found</h3>
          <p className="text-gray-600">Try adjusting your filters or search terms</p>
        </div>
      )}

      {/* Exercise Detail Modal */}
      {selectedExercise && (
        <ExerciseDetailModal
          exercise={selectedExercise}
          onClose={() => setSelectedExercise(null)}
        />
      )}
    </div>
  )
}

// Exercise Detail Modal
interface ExerciseDetailModalProps {
  exercise: Exercise
  onClose: () => void
}

function ExerciseDetailModal({ exercise, onClose }: ExerciseDetailModalProps) {
  const getDifficultyColor = (level: string) => {
    switch (level) {
      case 'beginner': return 'bg-green-100 text-green-800'
      case 'intermediate': return 'bg-yellow-100 text-yellow-800'
      case 'advanced': return 'bg-red-100 text-red-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50" data-testid="exercise-detail-modal">
      <div className="relative top-20 mx-auto p-5 border w-full max-w-2xl shadow-lg rounded-md bg-white">
        <div className="flex items-start justify-between mb-4">
          <h2 className="text-xl font-bold text-gray-900" data-testid="exercise-detail-name">
            {exercise.name}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600"
            data-testid="close-modal"
          >
            <span className="sr-only">Close</span>
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        <div className="space-y-4">
          <div className="flex items-center space-x-4">
            <span 
              className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getDifficultyColor(exercise.difficulty_level)}`}
              data-testid="exercise-detail-difficulty"
            >
              {exercise.difficulty_level}
            </span>
            <span className="text-sm text-gray-600" data-testid="exercise-detail-category">
              📁 {exercise.category}
            </span>
            <span className="text-sm text-gray-600" data-testid="exercise-detail-muscle">
              💪 {exercise.muscle_group}
            </span>
          </div>
          
          <div>
            <h3 className="text-sm font-medium text-gray-900 mb-2">Equipment Needed</h3>
            <p className="text-sm text-gray-600" data-testid="exercise-detail-equipment">
              {exercise.equipment || 'No equipment needed'}
            </p>
          </div>
          
          <div>
            <h3 className="text-sm font-medium text-gray-900 mb-2">Instructions</h3>
            <p className="text-sm text-gray-600 leading-relaxed" data-testid="exercise-detail-instructions">
              {exercise.instructions}
            </p>
          </div>
          
          <div className="flex items-center justify-end space-x-3 pt-4 border-t">
            <button
              onClick={onClose}
              className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
              data-testid="close-detail-button"
            >
              Close
            </button>
            <button
              className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
              data-testid="add-to-workout-button"
            >
              Add to Workout
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}