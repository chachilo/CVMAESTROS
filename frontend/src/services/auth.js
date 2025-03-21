import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_URL,
});

export const login = async (credentials) => {
  try {
    const response = await api.post('/auth/login', credentials);
    const { userId, token } = response.data;
    localStorage.setItem('userId', userId);
    localStorage.setItem('token', token);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Error al iniciar sesión');
  }
};