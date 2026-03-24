// src/App.tsx
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import AdsList from './pages/AdsList';
import Dashboards from './pages/Dashboards';
import Home from './pages/Home';
import Integrations from './pages/Integrations';
import Settings from './pages/Settings';


function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Rota de Login */}
        <Route path="/login" element={<Login />} />

        <Route path="/home" element={<Home />} />
        
        {/* Rota do Dashboard (Protegida futuramente) */}
        <Route path="/dashboards" element={<Dashboards />} />
        
        <Route path="/integrations" element={<Integrations />} />
        {/* Redireciona qualquer rota vazia para o Login por padrão */}
        <Route path="/" element={<Navigate to="/login" replace />} />

        <Route path="/ads" element={<AdsList />} />

        <Route path="/settings" element={<Settings />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;