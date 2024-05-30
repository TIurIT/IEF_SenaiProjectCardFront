import Cadastrar_card from './components/cadastrar_card';
import Menu_Superior from './components/MenuSuperior';
import FormularioLogin from './components/login';
import Cadastrar_Usuarios from './components/cadastrar_usuario';
import { BrowserRouter as Router, Route, Routes, Navigate, useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { AuthProvider, useAuth } from './components/AuthProvider';
import Cadastrar_Parceiro from './components/cadastrar_parceiro';
import ControleCartas from './components/ControleCartas';

const ProtectedRoute = ({ children }) => {
  const { autenticado } = useAuth();
  const navigate = useNavigate(); // Utilize useNavigate for programmatic navigation

  if (!autenticado) {
    navigate('/login'); // Redirect to login on unauthorized access
    return null;
  }

  return children;
};

const RoutesWithAuth = () => {
  const { autenticado } = useAuth();

  return (
    <Router>
      {autenticado && <Menu_Superior />}
      <Routes>
        <Route path="/login" element={<FormularioLogin />} />
        <Route path="/" element={autenticado ? (<Cadastrar_card /> // Use replace to prevent history stack issues
            ) : <FormularioLogin />}
        />
        <Route path="/cartas" element={<ProtectedRoute><Cadastrar_card /></ProtectedRoute>} />
        <Route path="/controle" element={<ProtectedRoute><ControleCartas/></ProtectedRoute>} />
        <Route path="/usuarios" element={<ProtectedRoute><Cadastrar_Usuarios /></ProtectedRoute>} />
        <Route path="/parceiros" element={<ProtectedRoute><Cadastrar_Parceiro /></ProtectedRoute>} />
        
      </Routes>
    </Router>
  );
};

const App = () => {
  return (
    <AuthProvider>
      <RoutesWithAuth />
    </AuthProvider>
  );
};

export default App;
