import api from "../data/api";
import { Ensiklopedia } from "../models/Ensiklopedia";

export interface ApiResponse<T> {
  success: boolean;
  message?: string;
  data: T;
}

class HomeService {
  async getRandomEnsiklopedia(limit: number = 6): Promise<Ensiklopedia[]> {
    try {
      const response = await api.get<ApiResponse<Ensiklopedia[]>>("/ensiklopedia");
      const allData = response.data.data;
      
      // Acak data dan ambil sejumlah limit
      const shuffled = [...allData].sort(() => 0.5 - Math.random());
      return shuffled.slice(0, limit);
    } catch (error) {
      console.error("Error fetching random ensiklopedia:", error);
      throw error;
    }
  }

  async getAllEnsiklopedia(): Promise<Ensiklopedia[]> {
    try {
      const response = await api.get<ApiResponse<Ensiklopedia[]>>("/ensiklopedia");
      return response.data.data;
    } catch (error) {
      console.error("Error fetching all ensiklopedia:", error);
      throw error;
    }
  }

  async getEnsiklopediaById(id: string): Promise<Ensiklopedia> {
    try {
      const response = await api.get<ApiResponse<Ensiklopedia>>(`/ensiklopedia/${id}`);
      return response.data.data;
    } catch (error) {
      console.error("Error fetching ensiklopedia by id:", error);
      throw error;
    }
  }
}

export default new HomeService();