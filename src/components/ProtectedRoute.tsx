import { Navigate, Outlet } from 'react-router-dom';

export const ProtectedRoute = () => {
  const token = localStorage.getItem('@MetaPainel:token');

  // Se não houver token, ele redireciona para o login
  if (!token) {
    return <Navigate to="/login" replace />;
  }

  // Se houver token, ele libera a renderização das rotas filhas
  return <Outlet />;
};