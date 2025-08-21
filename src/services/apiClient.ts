import axios from 'axios';
import NetInfo from '@react-native-community/netinfo';
import Logger from '../utils/logger';

const BASE_URL = 'https://dummyjson.com';

const apiClient = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

apiClient.interceptors.request.use(
  async config => {
    const netInfo = await NetInfo.fetch();
    if (!netInfo.isConnected) {
      throw new Error('No internet connection');
    }

    Logger.debug('API Request', {
      url: config.url,
      method: config.method?.toUpperCase(),
      params: config.params,
    });

    return config;
  },
  error => {
    Logger.error('Request Error', error);
    return Promise.reject(error);
  },
);

apiClient.interceptors.response.use(
  response => {
    Logger.debug('API Response', {
      url: response.config.url,
      status: response.status,
      data: response.data,
    });
    return response;
  },
  error => {
    const errorInfo = {
      url: error.config?.url,
      method: error.config?.method?.toUpperCase(),
      status: error.response?.status,
      message: error.message,
      data: error.response?.data,
    };

    Logger.error('Response Error', errorInfo);

    if (!error.response) {
      error.message = 'Network error. Please check your connection.';
    } else if (error.response.status >= 500) {
      error.message = 'Server error. Please try again later.';
    } else if (error.response.status === 404) {
      error.message = 'Requested resource not found.';
    }

    return Promise.reject(error);
  },
);

export default apiClient;
