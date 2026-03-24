// src/types/api.types.ts

// O <T> permite que esta interface seja usada para qualquer tipo de dado (Users, Ads, etc)
export interface ApiResponse<T = any> {
  success: boolean;
  message: string;
  data: T;
  errors?: any;
}

export interface User {
  id: number;
  name: string;
  email: string;
  clientId: number;
  role: string;
}

export interface MetaAdAccount {
  id: string;
  name: string;
  account_status: number;
  currency: string;
}