// src/services/authService.ts
import { api } from './api';
import type { ApiResponse, User } from '../types/api.types';

interface LoginResponse {
  token: string;
  user: User;
}

export const authService = {
  login: async (email: string, password: string): Promise<ApiResponse<LoginResponse>> => {
    // Faz a chamada para a nova rota que criamos no Node
    const response = await api.post<ApiResponse<LoginResponse>>('/auth/login', { 
      email, 
      password 
    });
    
    // Se o login for sucesso, guardamos o token no localStorage
    if (response.data.success) {
      localStorage.setItem('@MetaPainel:token', response.data.data.token);
      localStorage.setItem('@MetaPainel:user', JSON.stringify(response.data.data.user));
    }

    return response.data;
  },

  logout: () => {
    localStorage.removeItem('@MetaPainel:token');
    localStorage.removeItem('@MetaPainel:user');
    window.location.href = '/login';
  }
};