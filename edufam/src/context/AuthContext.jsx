import { createContext, useContext, useState } from 'react'
import { mockUsers } from '../data/mockData'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('edufam_user')
    return saved ? JSON.parse(saved) : null
  })

  function login(email, password) {
    const found = mockUsers.find(u => u.email === email && u.password === password)
    if (found) {
      const { password: _, ...safeUser } = found
      setUser(safeUser)
      localStorage.setItem('edufam_user', JSON.stringify(safeUser))
      return { ok: true }
    }
    return { ok: false, error: 'Email ou senha incorretos' }
  }

  function logout() {
    setUser(null)
    localStorage.removeItem('edufam_user')
  }

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be inside AuthProvider')
  return ctx
}
