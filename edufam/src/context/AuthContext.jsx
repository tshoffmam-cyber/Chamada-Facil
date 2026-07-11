// ---------------------------------------------------------------------------
// context/AuthContext.jsx
//
// Autenticacao mockada (3 credenciais fixas em data/mockData.js). Guarda o
// usuario logado em localStorage para persistir a sessao entre recargas.
//
// PARA UM BACKEND REAL: login() deveria chamar uma API real (ex: POST
// /auth/login) que devolve um token (JWT ou sessao), nunca comparar senha
// no cliente como hoje. O campo 'role' (professor/diretor/adm) e o que o
// App.jsx usa para decidir para qual area do app o usuario vai apos o
// login — ver App.jsx e pages/adm/*.
// ---------------------------------------------------------------------------
import { createContext, useContext, useState } from 'react'
import { autenticar } from '../data/mockData'
const AuthContext = createContext(null)
export function AuthProvider({ children }) {
const [user, setUser] = useState(() => {
try { const s = localStorage.getItem('edufam_user'); return s ? JSON.parse(s) : null } catch { return null }
})
function login(email, password) {
const found = autenticar(email, password)
if (found) { setUser(found); localStorage.setItem('edufam_user', JSON.stringify(found)); return { ok: true, user: found } }
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
