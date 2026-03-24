// src/services/api.ts
import axios from 'axios';

export const api = axios.create({
  // URL do seu servidor Node.js. 
  // Em produção, isto viria de uma variável de ambiente (import.meta.env.VITE_API_URL)
  baseURL: 'http://localhost:3000/api', 
  headers: {
    'Content-Type': 'application/json',
  },
});

// INTERCEPTOR: Executa antes de CADA requisição sair do seu browser
api.interceptors.request.use(
  (config) => {
    // Procura o token que guardámos no authService.login
    const token = localStorage.getItem('@MetaPainel:token');

    if (token && config.headers) {
      // Injeta o cabeçalho Authorization: Bearer <TOKEN>
      // O seu authMiddleware.js no Node vai ler exatamente isto aqui!
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// INTERCEPTOR DE RESPOSTA: Útil para tratar erros globais (ex: token expirado)
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      // Se o back-end disser que o token não vale mais nada, deslogamos o utilizador
      localStorage.removeItem('@MetaPainel:token');
      localStorage.removeItem('@MetaPainel:user');
      if (window.location.pathname !== '/login') {
        window.location.href = '/login';
      }
    }
    return Promise.reject(error);
  }
);