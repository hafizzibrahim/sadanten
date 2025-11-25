import api from "../data/api";
import { Ensiklopedia } from "../models/Ensiklopedia";

export interface ApiResponse<T> {
  success: boolean;
  message?: string;
  data: T;
}

export interface DashboardStats {
  totalCultures: number;
  totalCategories: number;
  totalAdmins: number;
  visitorsToday: number;
}

class AdminService {
  // Fungsi untuk mendapatkan statistik dashboard
  async getDashboardStats(): Promise<DashboardStats> {
    try {
      // Ambil semua budaya untuk menghitung total
      const culturesResponse = await api.get<ApiResponse<Ensiklopedia[]>>("/ensiklopedia");
      const cultures = culturesResponse.data.data;
      
      // Hitung total kategori unik
      const uniqueCategories = new Set(cultures.map(culture => culture.category));
      
      // Untuk pengunjung hari ini, kita bisa menggunakan nilai dummy untuk sekarang
      // atau mengimplementasikan tracking pengunjung di backend nanti
      const visitorsToday = Math.floor(Math.random() * 1000) + 500; // Dummy data untuk sekarang
      
      // Untuk total admin, kita butuh endpoint API untuk mengambil jumlah admin
      // Untuk sekarang kita gunakan 1 sebagai dummy, tapi seharusnya ada API endpoint
      const totalAdmins = 1;

      return {
        totalCultures: cultures.length,
        totalCategories: uniqueCategories.size,
        totalAdmins,
        visitorsToday
      };
    } catch (error) {
      console.error("Error fetching dashboard stats:", error);
      throw error;
    }
  }

  // Fungsi untuk mendapatkan semua budaya
  async getAllCultures(): Promise<Ensiklopedia[]> {
    try {
      const response = await api.get<ApiResponse<Ensiklopedia[]>>("/ensiklopedia");
      return response.data.data;
    } catch (error) {
      console.error("Error fetching all cultures:", error);
      throw error;
    }
  }
}

export default new AdminService();