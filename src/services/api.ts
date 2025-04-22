import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to requests if it exists
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const authService = {
  login: async (email: string, password: string) => {
    const response = await api.post('/auth/login', { email, password });
    if (response.data.token) {
      localStorage.setItem('token', response.data.token);
    }
    return response.data;
  },
  register: async (name: string, email: string, password: string, phone: string) => {
    const response = await api.post('/auth/register', { name, email, password, phone });
    return response.data;
  },
  logout: () => {
    localStorage.removeItem('token');
  }
};

export const userService = {
  getProfile: async () => {
    const response = await api.get('/users/profile');
    return response.data;
  },
  updateProfile: async (data: { name?: string; email?: string; phone?: string }) => {
    const response = await api.put('/users/profile', data);
    return response.data;
  }
};

export const medicalService = {
  getRecords: async () => {
    const response = await api.get('/medical/records');
    return response.data;
  },
  updateRecords: async (data: {
    conditions?: Array<{ name: string; date: string }>;
    medications?: Array<{ name: string; dosage: string }>;
    hospitalVisits?: Array<{ hospital: string; date: string; reason: string }>;
  }) => {
    const response = await api.put('/medical/records', data);
    return response.data;
  }
}; 