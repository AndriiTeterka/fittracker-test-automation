import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react'
import { supabase } from '@/lib/supabase-demo'
import { User, Session, AuthError } from '@supabase/supabase-js'

interface AuthContextType {
  user: User | null
  session: Session | null
  loading: boolean
  signUp: (email: string, password: string, userData?: any) => Promise<{ data: any; error: AuthError | null }>
  signIn: (email: string, password: string) => Promise<{ data: any; error: AuthError | null }>
  signOut: () => Promise<{ error: AuthError | null }>
  isAdmin: boolean
  isDemoMode: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

interface AuthProviderProps {
  children: ReactNode
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null)
  const [session, setSession] = useState<Session | null>(null)
  const [loading, setLoading] = useState(true)
  const isDemoMode = import.meta.env.VITE_DEMO_MODE === 'true'

  useEffect(() => {
    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session)
      setUser(session?.user ?? null)
      setLoading(false)
    })

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
      setUser(session?.user ?? null)
      setLoading(false)
    })

    return () => subscription.unsubscribe()
  }, [])

  const signUp = async (email: string, password: string, userData?: any) => {
    setLoading(true)
    const result = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: userData
      }
    })
    setLoading(false)
    return result
  }

  const signIn = async (email: string, password: string) => {
    setLoading(true)
    const result = await supabase.auth.signInWithPassword({
      email,
      password
    })
    setLoading(false)
    return result
  }

  const signOut = async () => {
    setLoading(true)
    const result = await supabase.auth.signOut()
    setUser(null)
    setSession(null)
    setLoading(false)
    return result
  }

  // Check if user is admin (in demo mode, everyone is admin for testing)
  const isAdmin = isDemoMode || (user?.user_metadata?.role === 'admin')

  const value = {
    user,
    session,
    loading,
    signUp,
    signIn,
    signOut,
    isAdmin,
    isDemoMode
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}