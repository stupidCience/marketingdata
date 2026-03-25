// src/App.tsx
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ProtectedRoute } from './components/ProtectedRoute';
import AppLayout from './components/AppLayout'; // ESTA LINHA ESTAVA FALTANDO

// Páginas
import Login from './pages/Login';
import Home from './pages/Home';
import Dashboards from './pages/Dashboards';
import AdsList from './pages/AdsList';
import Integrations from './pages/Integrations';
import Settings from './pages/Settings';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Rota Pública */}
        <Route path="/login" element={<Login />} />

        {/* Rotas Protegidas */}
        <Route element={<ProtectedRoute />}>
          {/* O AppLayout envolve as rotas internas e renderiza as páginas no <Outlet /> */}
          <Route element={<AppLayout />}>
            <Route path="/home" element={<Home />} />
            <Route path="/dashboards" element={<Dashboards />} />
            <Route path="/ads" element={<AdsList />} />
            <Route path="/integrations" element={<Integrations />} />
            <Route path="/settings" element={<Settings />} />
          </Route>
        </Route>

        {/* Redirecionamento Inicial */}
        <Route path="/" element={<Navigate to="/login" replace />} />
        
        {/* Catch-all para rotas não encontradas */}
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;