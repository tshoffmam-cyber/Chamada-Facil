import { createContext, useContext, useState } from 'react'
import { autenticar } from '../data/mockData'
const AuthContext = createContext(null)
export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    try { const s = localStorage.getItem('edufam_user'); return s ? JSON.parse(s) : null } catch { return null }
  })
  function login(email, password) {
    const found = autenticar(email, password)
    if (found) { setUser(found); localStorage.setItem('edufam_user', JSON.stringify(found)); return { ok: true } }
    return { ok: false, error: 'E-mail ou senha incorretos' }
  }
  function logout() { setUser(null); localStorage.removeItem('edufam_user') }
  return <AuthContext.Provider value={{ user, login, logout }}>{children}</AuthContext.Provider>
}
export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth fora do AuthProvider')
  return ctx
}
