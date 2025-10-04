import React from 'react'
import { useAuth } from '@/contexts/AuthContext'

export default function AdminPage() {
  const { isDemoMode } = useAuth()

  return (
    <div className="space-y-6" data-testid="admin-page">
      {/* Header */}
      <div className="bg-white shadow rounded-lg">
        <div className="px-4 py-5 sm:p-6">
          <h1 className="text-2xl font-bold text-gray-900" data-testid="admin-title">
            Admin Panel
          </h1>
          <p className="mt-1 text-sm text-gray-600" data-testid="admin-subtitle">
            System administration and user management
          </p>
          {isDemoMode && (
            <div className="mt-3 p-3 bg-yellow-50 border border-yellow-200 rounded-md" data-testid="admin-demo-notice">
              <p className="text-sm text-yellow-800">
                <strong>Demo Mode:</strong> Admin features are simulated for testing purposes
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Admin Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4" data-testid="admin-stats">
        <div className="bg-white shadow rounded-lg p-4">
          <div className="flex items-center">
            <span className="text-2xl mr-3">👥</span>
            <div>
              <p className="text-sm text-gray-600">Total Users</p>
              <p className="text-lg font-semibold text-gray-900" data-testid="total-users-stat">
                {isDemoMode ? '1,234' : '0'}
              </p>
            </div>
          </div>
        </div>
        
        <div className="bg-white shadow rounded-lg p-4">
          <div className="flex items-center">
            <span className="text-2xl mr-3">🏋️</span>
            <div>
              <p className="text-sm text-gray-600">Total Workouts</p>
              <p className="text-lg font-semibold text-gray-900" data-testid="total-workouts-stat">
                {isDemoMode ? '5,678' : '0'}
              </p>
            </div>
          </div>
        </div>
        
        <div className="bg-white shadow rounded-lg p-4">
          <div className="flex items-center">
            <span className="text-2xl mr-3">💪</span>
            <div>
              <p className="text-sm text-gray-600">Exercises</p>
              <p className="text-lg font-semibold text-gray-900" data-testid="total-exercises-stat">
                {isDemoMode ? '156' : demoData.exercises.length}
              </p>
            </div>
          </div>
        </div>
        
        <div className="bg-white shadow rounded-lg p-4">
          <div className="flex items-center">
            <span className="text-2xl mr-3">📊</span>
            <div>
              <p className="text-sm text-gray-600">Active Today</p>
              <p className="text-lg font-semibold text-gray-900" data-testid="active-today-stat">
                {isDemoMode ? '89' : '0'}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white shadow rounded-lg">
        <div className="px-4 py-5 sm:p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Quick Actions</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4" data-testid="admin-quick-actions">
            <button className="p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-blue-300 hover:bg-blue-50 transition-colors" data-testid="manage-users-button">
              <span className="block text-2xl mb-2">👥</span>
              <span className="text-sm font-medium text-gray-700">Manage Users</span>
            </button>
            
            <button className="p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-green-300 hover:bg-green-50 transition-colors" data-testid="manage-exercises-button">
              <span className="block text-2xl mb-2">💪</span>
              <span className="text-sm font-medium text-gray-700">Manage Exercises</span>
            </button>
            
            <button className="p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-purple-300 hover:bg-purple-50 transition-colors" data-testid="view-analytics-button">
              <span className="block text-2xl mb-2">📊</span>
              <span className="text-sm font-medium text-gray-700">View Analytics</span>
            </button>
            
            <button className="p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-orange-300 hover:bg-orange-50 transition-colors" data-testid="system-settings-button">
              <span className="block text-2xl mb-2">⚙️</span>
              <span className="text-sm font-medium text-gray-700">System Settings</span>
            </button>
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white shadow rounded-lg">
        <div className="px-4 py-5 sm:p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Recent System Activity</h3>
          <div className="space-y-3" data-testid="recent-activity-list">
            {isDemoMode ? [
              { action: 'New user registered', user: 'sarah.wilson@email.com', time: '2 minutes ago' },
              { action: 'Workout completed', user: 'john.doe@fittracker.com', time: '5 minutes ago' },
              { action: 'Profile updated', user: 'jane.smith@fittracker.com', time: '10 minutes ago' },
              { action: 'Exercise added', user: 'Admin', time: '1 hour ago' },
            ].map((activity, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg" data-testid={`activity-${index}`}>
                <div>
                  <p className="text-sm font-medium text-gray-900">{activity.action}</p>
                  <p className="text-xs text-gray-500">{activity.user}</p>
                </div>
                <span className="text-xs text-gray-400">{activity.time}</span>
              </div>
            )) : (
              <p className="text-sm text-gray-500" data-testid="no-activity">
                No recent activity
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}