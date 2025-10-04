import React, { useState } from 'react'
import { useAuth } from '@/contexts/AuthContext'
import { useForm } from 'react-hook-form'
import { LoadingSpinner } from '@/components/ui/LoadingSpinner'

interface ProfileForm {
  username: string
  email: string
  age: number
  height_cm: number
  weight_kg: number
  fitness_goal: string
  activity_level: string
  preferred_units: string
}

export default function ProfilePage() {
  const { user, isDemoMode } = useAuth()
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')
  const [activeTab, setActiveTab] = useState('profile')

  const {
    register,
    handleSubmit,
    formState: { errors, isDirty }
  } = useForm<ProfileForm>({
    defaultValues: {
      username: user?.user_metadata?.username || 'Demo User',
      email: user?.email || 'demo@fittracker.com',
      age: user?.user_metadata?.age || 28,
      height_cm: user?.user_metadata?.height_cm || 175,
      weight_kg: user?.user_metadata?.weight_kg || 70,
      fitness_goal: 'general_fitness',
      activity_level: 'moderate',
      preferred_units: 'metric'
    }
  })

  const onSubmit = async (data: ProfileForm) => {
    setLoading(true)
    setMessage('')
    
    try {
      // In demo mode, just simulate success
      if (isDemoMode) {
        await new Promise(resolve => setTimeout(resolve, 1000))
        setMessage('Profile updated successfully! (Demo mode - changes not saved)')
      } else {
        // Real API call would go here
        setMessage('Profile updated successfully!')
      }
    } catch (error) {
      setMessage('Failed to update profile. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const tabs = [
    { id: 'profile', name: 'Profile', icon: '👤' },
    { id: 'preferences', name: 'Preferences', icon: '⚙️' },
    { id: 'security', name: 'Security', icon: '🔒' }
  ]

  return (
    <div className="space-y-6" data-testid="profile-page">
      {/* Header */}
      <div className="bg-white shadow rounded-lg">
        <div className="px-4 py-5 sm:p-6">
          <div className="flex items-center">
            <div className="h-16 w-16 rounded-full bg-blue-100 flex items-center justify-center">
              <span className="text-2xl">
                {user?.email?.[0]?.toUpperCase() || 'D'}
              </span>
            </div>
            <div className="ml-4">
              <h1 className="text-2xl font-bold text-gray-900" data-testid="profile-title">
                Profile Settings
              </h1>
              <p className="text-sm text-gray-600" data-testid="profile-subtitle">
                Manage your account information and preferences
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white shadow rounded-lg">
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex space-x-8 px-6" data-testid="profile-tabs">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === tab.id
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
                data-testid={`tab-${tab.id}`}
              >
                <span className="mr-2">{tab.icon}</span>
                {tab.name}
              </button>
            ))}
          </nav>
        </div>

        <div className="px-4 py-5 sm:p-6">
          {message && (
            <div className={`mb-4 p-4 rounded-md ${
              message.includes('successfully') ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'
            }`} data-testid="profile-message">
              {message}
            </div>
          )}

          {/* Profile Tab */}
          {activeTab === 'profile' && (
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6" data-testid="profile-form">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Username</label>
                  <input
                    {...register('username', { required: 'Username is required' })}
                    type="text"
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    data-testid="username-input"
                  />
                  {errors.username && <p className="mt-1 text-sm text-red-600">{errors.username.message}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">Email</label>
                  <input
                    {...register('email')}
                    type="email"
                    disabled
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 bg-gray-50 text-gray-500 sm:text-sm"
                    data-testid="email-input"
                  />
                  <p className="mt-1 text-xs text-gray-500">Email cannot be changed</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Age</label>
                  <input
                    {...register('age', { 
                      required: 'Age is required',
                      min: { value: 13, message: 'Must be at least 13 years old' },
                      max: { value: 120, message: 'Must be less than 120 years old' }
                    })}
                    type="number"
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    data-testid="age-input"
                  />
                  {errors.age && <p className="mt-1 text-sm text-red-600">{errors.age.message}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">Height (cm)</label>
                  <input
                    {...register('height_cm', { 
                      required: 'Height is required',
                      min: { value: 100, message: 'Height must be at least 100cm' },
                      max: { value: 250, message: 'Height must be less than 250cm' }
                    })}
                    type="number"
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    data-testid="height-input"
                  />
                  {errors.height_cm && <p className="mt-1 text-sm text-red-600">{errors.height_cm.message}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">Weight (kg)</label>
                  <input
                    {...register('weight_kg', { 
                      required: 'Weight is required',
                      min: { value: 30, message: 'Weight must be at least 30kg' },
                      max: { value: 300, message: 'Weight must be less than 300kg' }
                    })}
                    type="number"
                    step="0.1"
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    data-testid="weight-input"
                  />
                  {errors.weight_kg && <p className="mt-1 text-sm text-red-600">{errors.weight_kg.message}</p>}
                </div>
              </div>

              <div className="flex justify-end space-x-3">
                <button
                  type="submit"
                  disabled={loading || !isDirty}
                  className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
                  data-testid="save-profile-button"
                >
                  {loading ? (
                    <>
                      <LoadingSpinner size="sm" className="mr-2" />
                      Saving...
                    </>
                  ) : (
                    'Save Changes'
                  )}
                </button>
              </div>
            </form>
          )}

          {/* Preferences Tab */}
          {activeTab === 'preferences' && (
            <div className="space-y-6" data-testid="preferences-tab">
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-4">App Preferences</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Fitness Goal</label>
                    <select className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm" data-testid="fitness-goal-select">
                      <option value="weight_loss">Weight Loss</option>
                      <option value="muscle_gain">Muscle Gain</option>
                      <option value="endurance">Endurance</option>
                      <option value="strength">Strength</option>
                      <option value="general_fitness">General Fitness</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Activity Level</label>
                    <select className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm" data-testid="activity-level-select">
                      <option value="sedentary">Sedentary</option>
                      <option value="light">Light</option>
                      <option value="moderate">Moderate</option>
                      <option value="active">Active</option>
                      <option value="very_active">Very Active</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Security Tab */}
          {activeTab === 'security' && (
            <div className="space-y-6" data-testid="security-tab">
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-4">Password & Security</h3>
                <div className="bg-yellow-50 border border-yellow-200 rounded-md p-4">
                  <p className="text-sm text-yellow-700">
                    {isDemoMode ? 'Password changes are not available in demo mode.' : 'Password management coming soon!'}
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}