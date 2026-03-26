// src/services/api.ts
import axios from 'axios';

// Removido o 'export' daqui
const api = axios.create({
  // URL do seu servidor Node.js. 
  baseURL: 'http://localhost:3000/api', // ATENÇÃO: Removi o '/api' do final caso suas rotas no Node não usem esse prefixo. Se usarem, coloque de volta!
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

// ✅ A ADIÇÃO É ESTA LINHA AQUI
export default api;