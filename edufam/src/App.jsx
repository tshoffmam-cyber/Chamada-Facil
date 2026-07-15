import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider, useAuth } from './context/AuthContext'
import { DataProvider } from './context/DataContext'

// Layouts
import AppLayout from './layouts/AppLayout'
import AppLayoutAdm from './layouts/AppLayoutAdm'
import AppLayoutDiretor from './layouts/AppLayoutDiretor'
import AppLayoutResponsavel from './layouts/AppLayoutResponsavel'
import AppLayoutAluno from './layouts/AppLayoutAluno'

// Auth
import LoginScreen from './pages/auth/LoginScreen'

// Professor
import HomeProfessor from './pages/professor/HomeProfessor'
import OrganizacoesProfessor from './pages/professor/OrganizacoesProfessor'
import NovaEscolaScreen from './pages/professor/NovaEscolaScreen'
import NovaTurmaScreen from './pages/professor/NovaTurmaScreen'
import ModoAula from './pages/professor/ModoAula'
import ChamadaScreen from './pages/professor/ChamadaScreen'
import AtividadeScreen from './pages/professor/AtividadeScreen'
import AlunoPerfilScreen from './pages/professor/AlunoPerfilScreen'
import VidaEscolarScreen from './pages/professor/VidaEscolarScreen'
import ComunicacaoScreen from './pages/professor/ComunicacaoScreen'
import IAScreen from './pages/professor/IAScreen'
import PerfilScreen from './pages/professor/PerfilScreen'
import AgendaScreen from './pages/professor/AgendaScreen'

// ADM (administrador global da plataforma)
import AdmHomeScreen from './pages/adm/AdmHomeScreen'
import AdmUsuariosScreen from './pages/adm/AdmUsuariosScreen'
import AdmSuporteScreen from './pages/adm/AdmSuporteScreen'
import AdmConfiguracoesScreen from './pages/adm/AdmConfiguracoesScreen'
import AdmConfigAvancadaScreen from './pages/adm/AdmConfigAvancadaScreen'
import AdmPlanosScreen from './pages/adm/AdmPlanosScreen'
import AdmNpsScreen from './pages/adm/AdmNpsScreen'

// Diretor (gestao da escola: nao da aula, acompanha professores/turmas/alunos)
import DiretorPainelScreen from './pages/diretor/DiretorPainelScreen'
import DiretorProfessoresScreen from './pages/diretor/DiretorProfessoresScreen'
import DiretorRecadosScreen from './pages/diretor/DiretorRecadosScreen'
import DiretorAlunosScreen from './pages/diretor/DiretorAlunosScreen'
import DiretorAlunoDetalheScreen from './pages/diretor/DiretorAlunoDetalheScreen'

// Responsavel (pai/mae/responsavel legal: acompanha o(s) filho(s), nao da aula)
import ResponsavelHomeScreen from './pages/responsavel/ResponsavelHomeScreen'
import ResponsavelAgendaScreen from './pages/responsavel/ResponsavelAgendaScreen'
import ResponsavelNotasScreen from './pages/responsavel/ResponsavelNotasScreen'
import ResponsavelRecadosScreen from './pages/responsavel/ResponsavelRecadosScreen'
import ResponsavelPerfilScreen from './pages/responsavel/ResponsavelPerfilScreen'

// Aluno (aluno logado: acompanha a propria vida escolar, somente leitura)
import AlunoHomeScreen from './pages/aluno/AlunoHomeScreen'
import AlunoAgendaScreen from './pages/aluno/AlunoAgendaScreen'
import AlunoNotasScreen from './pages/aluno/AlunoNotasScreen'
import AlunoVidaEscolarScreen from './pages/aluno/AlunoVidaEscolarScreen'
import AlunoMeuPerfilScreen from './pages/aluno/AlunoPerfilScreen'

// Rota privada: exige login. Quando 'somenteRole' e informado, exige
// tambem que o usuario tenha aquele papel especifico — caso contrario,
// manda o usuario de volta para a home certa do seu proprio papel (em
// vez de so bloquear), para nao deixar a pessoa numa tela sem saida.
function PrivateRoute({ children, somenteRole }) {
const { user } = useAuth()
if (!user) return <Navigate to="/login" replace />
if (somenteRole && user.role !== somenteRole) {
return <Navigate to={user.role === 'adm' ? '/adm/home' : user.role === 'diretor' ? '/diretor/home' : user.role === 'responsavel' ? '/responsavel/home' : user.role === 'aluno' ? '/aluno/home' : '/home'} replace />
}
return children
}

// Usado no catch-all ('*'): manda quem digitar uma URL invalida para a
// home certa conforme o papel do usuario logado (ou para o login).
function RedirecionarPorPapel() {
const { user } = useAuth()
if (!user) return <Navigate to="/login" replace />
return <Navigate to={user.role === 'adm' ? '/adm/home' : user.role === 'diretor' ? '/diretor/home' : user.role === 'responsavel' ? '/responsavel/home' : user.role === 'aluno' ? '/aluno/home' : '/home'} replace />
}

export default function App() {
return (
<AuthProvider>
<DataProvider>
<BrowserRouter basename="/Chamada-Facil">
<Routes>
<Route path="/login" element={<LoginScreen />} />

{/* Area do professor/diretor */}
<Route path="/" element={<PrivateRoute somenteRole="professor"><AppLayout /></PrivateRoute>}>
<Route index element={<Navigate to="/home" replace />} />
<Route path="home" element={<HomeProfessor />} />
<Route path="organizacoes" element={<OrganizacoesProfessor />} />
<Route path="nova-escola" element={<NovaEscolaScreen />} />
<Route path="nova-turma/:organizacaoId" element={<NovaTurmaScreen />} />
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

{/* Area do Diretor (gestao da escola — nao da aula por padrao) */}
<Route path="/diretor" element={<PrivateRoute somenteRole="diretor"><AppLayoutDiretor /></PrivateRoute>}>
<Route index element={<Navigate to="/diretor/home" replace />} />
<Route path="home" element={<DiretorPainelScreen />} />
<Route path="professores" element={<DiretorProfessoresScreen />} />
<Route path="recados" element={<DiretorRecadosScreen />} />
<Route path="alunos" element={<DiretorAlunosScreen />} />
<Route path="alunos/:alunoId" element={<DiretorAlunoDetalheScreen />} />
<Route path="perfil" element={<PerfilScreen />} />
</Route>

{/* Area do Responsavel (pai/mae/responsavel legal) */}
<Route path="/responsavel" element={<PrivateRoute somenteRole="responsavel"><AppLayoutResponsavel /></PrivateRoute>}>
<Route index element={<Navigate to="/responsavel/home" replace />} />
<Route path="home" element={<ResponsavelHomeScreen />} />
<Route path="agenda" element={<ResponsavelAgendaScreen />} />
<Route path="notas" element={<ResponsavelNotasScreen />} />
<Route path="recados" element={<ResponsavelRecadosScreen />} />
<Route path="perfil" element={<ResponsavelPerfilScreen />} />
</Route>

{/* Area do Aluno (aluno logado, somente leitura) */}
<Route path="/aluno" element={<PrivateRoute somenteRole="aluno"><AppLayoutAluno /></PrivateRoute>}>
<Route index element={<Navigate to="/aluno/home" replace />} />
<Route path="home" element={<AlunoHomeScreen />} />
<Route path="agenda" element={<AlunoAgendaScreen />} />
<Route path="notas" element={<AlunoNotasScreen />} />
<Route path="vida-escolar" element={<AlunoVidaEscolarScreen />} />
<Route path="perfil" element={<AlunoMeuPerfilScreen />} />
</Route>

{/* Area do ADM (administrador global da plataforma) */}
<Route path="/adm" element={<PrivateRoute somenteRole="adm"><AppLayoutAdm /></PrivateRoute>}>
<Route index element={<Navigate to="/adm/home" replace />} />
<Route path="home" element={<AdmHomeScreen />} />
<Route path="usuarios" element={<AdmUsuariosScreen />} />
<Route path="suporte" element={<AdmSuporteScreen />} />
<Route path="configuracoes" element={<AdmConfiguracoesScreen />} />
<Route path="configuracoes-avancadas" element={<AdmConfigAvancadaScreen />} />
<Route path="planos" element={<AdmPlanosScreen />} />
<Route path="nps" element={<AdmNpsScreen />} />
<Route path="perfil" element={<PerfilScreen />} />
</Route>

<Route path="*" element={<RedirecionarPorPapel />} />
</Routes>
</BrowserRouter>
</DataProvider>
</AuthProvider>
)
}
