// src/services/authService.ts
import api from './api'; // Importa a instância do axios que você já configurou

// Tipagens para o TypeScript não reclamar
export interface User {
  id: number;
  name: string;
  email: string;
  clientId: number;
  role: string;
}

export interface LoginResponse {
  token: string;
  user: User;
}

export const login = async (email: string, password: string): Promise<LoginResponse> => {
  try {
    // 1. Faz a requisição POST real para a sua API Node.js
    const response = await api.post('auth/login', { email, password });
    
    // 2. O axios coloca a resposta do servidor dentro de '.data'
    // Como nosso backend retorna { success: true, data: { token, user } }, acessamos data.data
    const { token, user } = response.data.data;

    // 3. Salva no LocalStorage
    localStorage.setItem('@MetaPainel:token', token);
    localStorage.setItem('@MetaPainel:user', JSON.stringify(user));

    return { token, user };
  } catch (error: any) {
    // 4. Captura o erro do backend (ex: "Senha incorreta") e repassa para a tela de login
    const errorMessage = error.response?.data?.message || 'Erro ao conectar com o servidor. Verifique se a API está rodando.';
    throw new Error(errorMessage);
  }
};

export const logout = (): void => {
  localStorage.removeItem('@MetaPainel:token');
  localStorage.removeItem('@MetaPainel:user');
  window.location.href = '/login'; // Limpa tudo e joga o usuário para fora
};

export const getUser = (): User | null => {
  const user = localStorage.getItem('@MetaPainel:user');
  return user ? JSON.parse(user) : null;
};

