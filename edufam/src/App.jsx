import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider, useAuth } from './context/AuthContext'

// Layouts
import AppLayout from './layouts/AppLayout'

// Auth
import LoginScreen from './pages/auth/LoginScreen'

// Professor
import HomeProfessor from './pages/professor/HomeProfessor'
import OrganizacoesProfessor from './pages/professor/OrganizacoesProfessor'
import ModoAula from './pages/professor/ModoAula'
import ChamadaScreen from './pages/professor/ChamadaScreen'
import AtividadeScreen from './pages/professor/AtividadeScreen'
import AlunoPerfilScreen from './pages/professor/AlunoPerfilScreen'
import VidaEscolarScreen from './pages/professor/VidaEscolarScreen'
import ComunicacaoScreen from './pages/professor/ComunicacaoScreen'
import IAScreen from './pages/professor/IAScreen'
import PerfilScreen from './pages/professor/PerfilScreen'

function PrivateRoute({ children }) {
  const { user } = useAuth()
  return user ? children : <Navigate to="/login" replace />
}

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter basename="/Chamada-Facil">
        <Routes>
          <Route path="/login" element={<LoginScreen />} />
          <Route path="/" element={
            <PrivateRoute>
              <AppLayout />
            </PrivateRoute>
          }>
            <Route index element={<Navigate to="/home" replace />} />
            <Route path="home" element={<HomeProfessor />} />
            <Route path="organizacoes" element={<OrganizacoesProfessor />} />
            <Route path="ia" element={<IAScreen />} />
            <Route path="comunicacao" element={<ComunicacaoScreen />} />
            <Route path="perfil" element={<PerfilScreen />} />
            <Route path="modo-aula/:turmaId" element={<ModoAula />} />
            <Route path="chamada/:turmaId" element={<ChamadaScreen />} />
            <Route path="atividade/:turmaId" element={<AtividadeScreen />} />
            <Route path="aluno/:alunoId" element={<AlunoPerfilScreen />} />
            <Route path="vida-escolar/:alunoId" element={<VidaEscolarScreen />} />
          </Route>
          <Route path="*" element={<Navigate to="/home" replace />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  )
}
