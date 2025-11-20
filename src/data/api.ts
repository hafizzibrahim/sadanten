import axios from "axios";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// ✅ TAMBAHKAN REQUEST INTERCEPTOR
api.interceptors.request.use(
  (config) => {
    // Jika data adalah FormData, hapus Content-Type
    // Biar browser yang set otomatis dengan boundary
    if (config.data instanceof FormData) {
      delete config.headers['Content-Type'];
      console.log('🔧 Detected FormData - Removed Content-Type header');
      console.log('Request headers:', config.headers);
    }
    
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Log the full error for debugging
    console.error('API Error:', {
      status: error.response?.status,
      statusText: error.response?.statusText,
      data: error.response?.data,
      url: error.config?.url,
      method: error.config?.method,
      headers: error.config?.headers
    });

    // Create a more descriptive error message
    let errorMessage = 'Terjadi kesalahan pada server';

    if (error.response?.data?.message) {
      errorMessage = error.response.data.message;
    } else if (error.response?.data?.error) {
      errorMessage = error.response.data.error;
    } else if (error.response?.status === 400) {
      errorMessage = 'Data yang dikirim tidak valid';
    } else if (error.response?.status === 401) {
      errorMessage = 'Tidak memiliki akses';
    } else if (error.response?.status === 403) {
      errorMessage = 'Akses ditolak';
    } else if (error.response?.status === 404) {
      errorMessage = 'Data tidak ditemukan';
    } else if (error.response?.status === 500) {
      errorMessage = 'Terjadi kesalahan internal server';
    } else if (error.message) {
      errorMessage = error.message;
    }

    // Create and throw a new error with the descriptive message
    const enhancedError = new Error(errorMessage);
    enhancedError.name = 'APIError';

    // Attach additional error info if available
    if (error.response?.data) {
      (enhancedError as Error & { details: unknown }).details = error.response.data;
    }

    throw enhancedError;
  }
);

export default api;