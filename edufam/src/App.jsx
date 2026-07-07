import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider, useAuth } from './context/AuthContext'
import { DataProvider } from './context/DataContext'

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
import AgendaScreen from './pages/professor/AgendaScreen'

function PrivateRoute({ children }) {
  const { user } = useAuth()
  return user ? children : <Navigate to="/login" replace />
}

export default function App() {
  return (
    <AuthProvider>
      <DataProvider>
        <BrowserRouter basename="/Chamada-Facil">
          <Routes>
            <Route path="/login" element={<LoginScreen />} />
            <Route path="/" element={<PrivateRoute><AppLayout /></PrivateRoute>}>
              <Route index element={<Navigate to="/home" replace />} />
              <Route path="home" element={<HomeProfessor />} />
              <Route path="organizacoes" element={<OrganizacoesProfessor />} />
              <Route path="agenda" element={<AgendaScreen />} />
              <Route path="turma/:turmaId" element={<ModoAula />} />
              <Route path="turma/:turmaId/chamada" element={<ChamadaScreen />} />
              <Route path="turma/:turmaId/atividade" element={<AtividadeScreen />} />
              <Route path="turma/:turmaId/aluno/:alunoId" element={<AlunoPerfilScreen />} />
              <Route path="turma/:turmaId/vida-escolar" element={<VidaEscolarScreen />} />
              <Route path="comunicacao" element={<ComunicacaoScreen />} />
              <Route path="ia" element={<IAScreen />} />
              <Route path="perfil" element={<PerfilScreen />} />
            </Route>
            <Route path="*" element={<Navigate to="/home" replace />} />
          </Routes>
        </BrowserRouter>
      </DataProvider>
    </AuthProvider>
  )
}
