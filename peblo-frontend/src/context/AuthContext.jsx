import { createContext, useContext, useState, useEffect, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'
import * as authService from '../services/authService'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser]       = useState(null)
  const [loading, setLoading] = useState(true)
  const navigate              = useNavigate()

  // Rehydrate from localStorage on mount
  useEffect(() => {
    try {
      const storedUser  = localStorage.getItem('user')
      const storedToken = localStorage.getItem('token')
      if (storedUser && storedToken) {
        setUser(JSON.parse(storedUser))
      }
    } catch {
      localStorage.removeItem('user')
      localStorage.removeItem('token')
    } finally {
      setLoading(false)
    }
  }, [])

  const login = useCallback(async (email, password) => {
    const data = await authService.login(email, password)
    localStorage.setItem('token', data.token)
    localStorage.setItem('user', JSON.stringify({ _id: data._id, name: data.name, email: data.email }))
    setUser({ _id: data._id, name: data.name, email: data.email })
    toast.success(`Welcome back, ${data.name}!`)
    navigate('/dashboard')
  }, [navigate])

  const signup = useCallback(async (name, email, password) => {
    const data = await authService.signup(name, email, password)
    localStorage.setItem('token', data.token)
    localStorage.setItem('user', JSON.stringify({ _id: data._id, name: data.name, email: data.email }))
    setUser({ _id: data._id, name: data.name, email: data.email })
    toast.success(`Account created! Welcome, ${data.name}!`)
    navigate('/dashboard')
  }, [navigate])

  const logout = useCallback(() => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    setUser(null)
    navigate('/login')
    toast.success('Logged out successfully')
  }, [navigate])

  const value = { user, loading, login, signup, logout, isAuthenticated: !!user }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used inside AuthProvider')
  return ctx
}
