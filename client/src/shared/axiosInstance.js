// Подключение перехватчиков
// Перехватчики нужны для автоматизации процесса взаимодействия с сервером через токен доступа.
import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: '/api',
  withCredentials: true,
});

let accessToken = '';

export function setAccessToken(token) {
  accessToken = token;
}

// Перехватчик запросов (добавляет заголовк авторизации)
axiosInstance.interceptors.request.use((config) => {
  if (!config.headers.Authorization) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }
  return config;
});

// Перехватчик ответа
axiosInstance.interceptors.response.use(
  (response) => response,

  async (error) => {
    const prevRequest = error.config;

    if (error.response.status === 403 && !prevRequest.sent) {
      const response = await axios.get('/api/auth/refresh');
      accessToken = response.data.accessToken;
      prevRequest.sent = true;
      prevRequest.headers.Authorization = `Bearer ${accessToken}`;
      return axiosInstance(prevRequest);
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
