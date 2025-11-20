import api from "../data/api";
import { Ensiklopedia } from "../models/Ensiklopedia";

export interface ApiResponse<T> {
  success: boolean;
  message?: string;
  data: T;
}

class EnsiklopediaService {
  async getAllEnsiklopedia(): Promise<Ensiklopedia[]> {
    try {
      const response = await api.get<ApiResponse<Ensiklopedia[]>>(
        "/ensiklopedia"
      );
      return response.data.data;
    } catch (error) {
      throw error;
    }
  }

  async getEnsiklopediaById(id: string): Promise<Ensiklopedia> {
    try {
      const response = await api.get<ApiResponse<Ensiklopedia>>(
        `/ensiklopedia/${id}`
      );
      return response.data.data;
    } catch (error) {
      throw error;
    }
  }

  async createEnsiklopedia(
    ensiklopedia: any,
    token?: string
  ): Promise<Ensiklopedia> {
    try {
      const formData = new FormData();

      // Loop semua field
      Object.keys(ensiklopedia).forEach((key) => {
        if (ensiklopedia[key] !== null && ensiklopedia[key] !== undefined) {
          formData.append(key, ensiklopedia[key]);
        }
      });

      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      };

      const response = await api.post<ApiResponse<Ensiklopedia>>(
        "/ensiklopedia",
        formData,
        config
      );

      return response.data.data;
    } catch (error) {
      throw error;
    }
  }

  async updateEnsiklopedia(
    id: string,
    ensiklopedia: any,
    token?: string
  ): Promise<Ensiklopedia> {
    try {
      const formData = new FormData();

      Object.keys(ensiklopedia).forEach((key) => {
        if (ensiklopedia[key] !== null && ensiklopedia[key] !== undefined) {
          formData.append(key, ensiklopedia[key]);
        }
      });

      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      };

      const response = await api.put<ApiResponse<Ensiklopedia>>(
        `/ensiklopedia/${id}`,
        formData,
        config
      );

      return response.data.data;
    } catch (error) {
      throw error;
    }
  }
  async deleteEnsiklopedia(id: string, token?: string): Promise<void> {
    try {
      const config = token
        ? { headers: { Authorization: `Bearer ${token}` } }
        : {};
      await api.delete(`/ensiklopedia/${id}`, config);
    } catch (error) {
      throw error;
    }
  }

async createEnsiklopediaWithFormData(
  formData: FormData,
  token?: string
): Promise<Ensiklopedia> {
  try {
    console.log('=== Sending to Backend ===');
    console.log('URL:', `${process.env.NEXT_PUBLIC_API_URL}/ensiklopedia`);
    console.log('Token:', token ? 'Present' : 'Missing');
    
    // Log FormData contents
    for (let [key, value] of formData.entries()) {
      if (value instanceof File) {
        console.log('FormData field:', key, '→ File:', value.name, value.size);
      } else {
        console.log('FormData field:', key, '→', value);
      }
    }

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
        // JANGAN set Content-Type manual!
        // Biar browser/axios yang set dengan boundary
      },
    };

    const response = await api.post<ApiResponse<Ensiklopedia>>(
      "/ensiklopedia",
      formData,
      config
    );

    console.log('✅ Backend response:', response.data);
    return response.data.data;
  } catch (error) {
    console.error('❌ Service error:', error);
    throw error;
  }
}

  async updateEnsiklopediaWithFormData(
    id: string,
    formData: FormData,
    token?: string
  ): Promise<Ensiklopedia> {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      const response = await api.put<ApiResponse<Ensiklopedia>>(
        `/ensiklopedia/${id}`,
        formData,
        config
      );

      return response.data.data;
    } catch (error) {
      throw error;
    }
  }
}

export default new EnsiklopediaService();
