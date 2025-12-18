import axios from 'axios';

// 🌍 Backend URL (local + production safe)
const API_URL =
  process.env.REACT_APP_BACKEND_URL || 'http://127.0.0.1:8000';

// 🔗 Axios instance
export const api = axios.create({
  baseURL: `${API_URL}/api`,
  headers: {
    'Content-Type': 'application/json',
  },
});

// 🔐 Attach JWT token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// 🚪 Auto logout on 401 (token expired / invalid)
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.replace('/login');
    }
    return Promise.reject(error);
  }
);

// ================= AUTH =================
export const authAPI = {
  signup: (data) => api.post('/auth/signup', data),
  login: (data) => api.post('/auth/login', data),
};

// ================= USER =================
export const userAPI = {
  getProfile: () => api.get('/user/profile'),
};

// ================= DASHBOARD =================
export const dashboardAPI = {
  getStats: () => api.get('/dashboard/stats'),
};

// ================= INVESTMENTS =================
export const investmentAPI = {
  getPlans: () => api.get('/investment-plans'),
  activate: (data) => api.post('/investments/activate', data),
};

// ================= TRANSACTIONS =================
export const transactionAPI = {
  getTransactions: () => api.get('/transactions'),
};
