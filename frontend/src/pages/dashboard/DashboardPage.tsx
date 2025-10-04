import React from 'react'
import { useAuth } from '@/contexts/AuthContext'
import { demoData } from '@/lib/supabase-demo'

export default function DashboardPage() {
  const { user, isDemoMode } = useAuth()
  
  // Demo stats for visualization
  const stats = {
    totalWorkouts: isDemoMode ? 12 : 0,
    weeklyWorkouts: isDemoMode ? 3 : 0,
    totalMinutes: isDemoMode ? 540 : 0,
    caloriesBurned: isDemoMode ? 2450 : 0,
    currentStreak: isDemoMode ? 5 : 0,
    favoriteExercise: isDemoMode ? 'Push-ups' : 'None'
  }
  
  const recentWorkouts = isDemoMode ? demoData.workouts.slice(0, 3) : []
  
  const weeklyData = isDemoMode ? [
    { day: 'Mon', minutes: 45, calories: 320 },
    { day: 'Tue', minutes: 0, calories: 0 },
    { day: 'Wed', minutes: 60, calories: 450 },
    { day: 'Thu', minutes: 30, calories: 200 },
    { day: 'Fri', minutes: 50, calories: 380 },
    { day: 'Sat', minutes: 0, calories: 0 },
    { day: 'Sun', minutes: 35, calories: 250 }
  ] : []

  return (
    <div className="space-y-6" data-testid="dashboard-page">
      {/* Welcome Header */}
      <div className="bg-white overflow-hidden shadow rounded-lg">
        <div className="px-4 py-5 sm:p-6">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center">
                <span className="text-xl">👋</span>
              </div>
            </div>
            <div className="ml-4">
              <h1 className="text-2xl font-bold text-gray-900" data-testid="user-welcome">
                Welcome back, {user?.user_metadata?.username || 'Demo User'}!
              </h1>
              <p className="text-sm text-gray-600" data-testid="welcome-message">
                {isDemoMode ? 'Exploring the demo version of FitTracker' : 'Ready to track your fitness journey?'}
              </p>
            </div>
            {isDemoMode && (
              <div className="ml-auto">
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800" data-testid="demo-mode-badge">
                  Demo Mode Active
                </span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4" data-testid="stats-grid">
        <div className="bg-white overflow-hidden shadow rounded-lg" data-testid="stat-total-workouts">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="h-8 w-8 rounded-md bg-blue-500 flex items-center justify-center">
                  <span className="text-white text-sm">🏋️</span>
                </div>
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">Total Workouts</dt>
                  <dd className="text-lg font-medium text-gray-900">{stats.totalWorkouts}</dd>
                </dl>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white overflow-hidden shadow rounded-lg" data-testid="stat-weekly-workouts">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="h-8 w-8 rounded-md bg-green-500 flex items-center justify-center">
                  <span className="text-white text-sm">📅</span>
                </div>
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">This Week</dt>
                  <dd className="text-lg font-medium text-gray-900">{stats.weeklyWorkouts}</dd>
                </dl>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white overflow-hidden shadow rounded-lg" data-testid="stat-total-minutes">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="h-8 w-8 rounded-md bg-purple-500 flex items-center justify-center">
                  <span className="text-white text-sm">⏱️</span>
                </div>
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">Total Minutes</dt>
                  <dd className="text-lg font-medium text-gray-900">{stats.totalMinutes}</dd>
                </dl>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white overflow-hidden shadow rounded-lg" data-testid="stat-calories-burned">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="h-8 w-8 rounded-md bg-orange-500 flex items-center justify-center">
                  <span className="text-white text-sm">🔥</span>
                </div>
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">Calories Burned</dt>
                  <dd className="text-lg font-medium text-gray-900">{stats.caloriesBurned}</dd>
                </dl>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Charts and Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Weekly Activity Chart */}
        <div className="bg-white shadow rounded-lg" data-testid="weekly-activity-chart">
          <div className="px-4 py-5 sm:p-6">
            <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">Weekly Activity</h3>
            <div className="space-y-3">
              {weeklyData.map((day, index) => (
                <div key={day.day} className="flex items-center" data-testid={`chart-day-${day.day.toLowerCase()}`}>
                  <div className="w-12 text-sm text-gray-600">{day.day}</div>
                  <div className="flex-1 flex items-center">
                    <div className="w-full bg-gray-200 rounded-full h-3 mr-3">
                      <div 
                        className="bg-blue-600 h-3 rounded-full transition-all duration-300" 
                        style={{ width: `${Math.max(day.minutes / 60 * 100, 5)}%` }}
                        data-testid={`bar-${day.day.toLowerCase()}`}
                      />
                    </div>
                    <div className="text-sm text-gray-600 w-16 text-right">
                      {day.minutes}m
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Recent Workouts */}
        <div className="bg-white shadow rounded-lg" data-testid="recent-workouts">
          <div className="px-4 py-5 sm:p-6">
            <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">Recent Workouts</h3>
            {recentWorkouts.length > 0 ? (
              <div className="space-y-3">
                {recentWorkouts.map((workout, index) => (
                  <div key={workout.id} className="flex items-center p-3 bg-gray-50 rounded-lg" data-testid={`recent-workout-${index}`}>
                    <div className="flex-shrink-0">
                      <div className="h-10 w-10 rounded-full bg-green-100 flex items-center justify-center">
                        <span className="text-green-600 text-sm">✅</span>
                      </div>
                    </div>
                    <div className="ml-3 flex-1">
                      <p className="text-sm font-medium text-gray-900" data-testid={`workout-name-${index}`}>
                        {workout.name}
                      </p>
                      <p className="text-xs text-gray-500" data-testid={`workout-details-${index}`}>
                        {workout.duration_minutes}min • {workout.calories_burned} cal • {workout.workout_date}
                      </p>
                    </div>
                    <div className="flex-shrink-0">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        workout.status === 'completed' ? 'bg-green-100 text-green-800' :
                        workout.status === 'planned' ? 'bg-blue-100 text-blue-800' :
                        'bg-gray-100 text-gray-800'
                      }`} data-testid={`workout-status-${index}`}>
                        {workout.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-6" data-testid="no-workouts">
                <div className="text-gray-400 text-4xl mb-2">🏋️</div>
                <p className="text-sm text-gray-500">No workouts yet</p>
                <p className="text-xs text-gray-400 mt-1">Start your fitness journey today!</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white shadow rounded-lg" data-testid="quick-actions">
        <div className="px-4 py-5 sm:p-6">
          <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">Quick Actions</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <button className="flex flex-col items-center p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-blue-300 hover:bg-blue-50 transition-colors" data-testid="quick-action-workout">
              <span className="text-2xl mb-2">🏋️</span>
              <span className="text-sm font-medium text-gray-700">New Workout</span>
            </button>
            
            <button className="flex flex-col items-center p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-green-300 hover:bg-green-50 transition-colors" data-testid="quick-action-exercise">
              <span className="text-2xl mb-2">💪</span>
              <span className="text-sm font-medium text-gray-700">Browse Exercises</span>
            </button>
            
            <button className="flex flex-col items-center p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-purple-300 hover:bg-purple-50 transition-colors" data-testid="quick-action-progress">
              <span className="text-2xl mb-2">📊</span>
              <span className="text-sm font-medium text-gray-700">View Progress</span>
            </button>
            
            <button className="flex flex-col items-center p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-orange-300 hover:bg-orange-50 transition-colors" data-testid="quick-action-profile">
              <span className="text-2xl mb-2">👤</span>
              <span className="text-sm font-medium text-gray-700">Update Profile</span>
            </button>
          </div>
        </div>
      </div>

      {/* Achievement/Goals Section */}
      <div className="bg-white shadow rounded-lg" data-testid="achievements-section">
        <div className="px-4 py-5 sm:p-6">
          <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">Current Goals & Achievements</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg" data-testid="goal-weekly-workouts">
              <div className="flex items-center">
                <span className="text-2xl mr-3">🎯</span>
                <div>
                  <p className="font-medium text-gray-900">Weekly Workout Goal</p>
                  <p className="text-sm text-gray-600">{stats.weeklyWorkouts} / 4 workouts completed</p>
                </div>
              </div>
              <div className="flex-shrink-0">
                <div className="w-16 bg-white rounded-full h-2">
                  <div 
                    className="bg-blue-600 h-2 rounded-full transition-all duration-300" 
                    style={{ width: `${Math.min((stats.weeklyWorkouts / 4) * 100, 100)}%` }}
                    data-testid="weekly-progress-bar"
                  />
                </div>
              </div>
            </div>
            
            <div className="flex items-center justify-between p-4 bg-gradient-to-r from-green-50 to-green-100 rounded-lg" data-testid="achievement-streak">
              <div className="flex items-center">
                <span className="text-2xl mr-3">🔥</span>
                <div>
                  <p className="font-medium text-gray-900">Current Streak</p>
                  <p className="text-sm text-gray-600">{stats.currentStreak} days in a row!</p>
                </div>
              </div>
              <div className="flex-shrink-0">
                <span className="text-2xl font-bold text-green-600" data-testid="streak-count">
                  {stats.currentStreak}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}