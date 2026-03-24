import axios from 'axios';
import type { Project, ContactFormData, ApiResponse, AuthUser } from '../types';

// In dev, Vite proxies /api → http://localhost:5000 (no CORS issues).
// In production, set VITE_API_URL to your deployed backend URL.
const BASE_URL = import.meta.env.VITE_API_URL || '/api';

const api = axios.create({
  baseURL: BASE_URL,
  headers: { 'Content-Type': 'application/json' },
});

// Attach JWT token to every request if present
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// ── Projects ───────────────────────────────────────────────────────────────

export const fetchProjects = async (): Promise<Project[]> => {
  const { data } = await api.get<ApiResponse<Project[]>>('/projects');
  return data.data ?? [];
};

export const addProject = async (
  projectData: Omit<Project, '_id' | 'createdAt'>
): Promise<Project> => {
  const { data } = await api.post<ApiResponse<Project>>('/projects', projectData);
  return data.data!;
};

export const removeProject = async (id: string): Promise<void> => {
  await api.delete(`/projects/${id}`);
};

// ── Contact ────────────────────────────────────────────────────────────────

export const submitContact = async (formData: ContactFormData): Promise<string> => {
  const { data } = await api.post<ApiResponse<null>>('/contact', formData);
  return data.message ?? 'Message sent!';
};

// ── Auth ───────────────────────────────────────────────────────────────────

export const loginAdmin = async (
  email: string,
  password: string
): Promise<{ token: string; user: AuthUser }> => {
  const { data } = await api.post<{ success: boolean; token: string; user: AuthUser }>(
    '/auth/login',
    { email, password }
  );
  return { token: data.token, user: data.user };
};

export default api;
