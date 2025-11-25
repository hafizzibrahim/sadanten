import api from "../data/api";
import { Ensiklopedia } from "../models/Ensiklopedia";
import { BANTEN_LOCATIONS, getLocationByName, getLocationsFromText } from "../types/location";

export interface ApiResponse<T> {
  success: boolean;
  message?: string;
  data: T;
}

export interface LocationEnsiklopedia {
  location: string;
  locationInfo: {
    id: string;
    name: string;
    type: 'kabupaten' | 'kota';
  };
  cultures: Ensiklopedia[];
}

class HomeService {
  async getRandomEnsiklopedia(limit: number = 6): Promise<Ensiklopedia[]> {
    try {
      // Tambahkan timestamp untuk cache busting
      const timestamp = Date.now();
      const response = await api.get<ApiResponse<Ensiklopedia[]>>("/ensiklopedia", {
        params: { _t: timestamp } // Cache busting parameter
      });
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
      // Tambahkan timestamp untuk cache busting
      const timestamp = Date.now();
      const response = await api.get<ApiResponse<Ensiklopedia[]>>("/ensiklopedia", {
        params: { _t: timestamp } // Cache busting parameter
      });
      return response.data.data;
    } catch (error) {
      console.error("Error fetching all ensiklopedia:", error);
      throw error;
    }
  }

  async getEnsiklopediaById(id: string): Promise<Ensiklopedia> {
    try {
      // Tambahkan timestamp untuk cache busting
      const timestamp = Date.now();
      const response = await api.get<ApiResponse<Ensiklopedia>>(`/ensiklopedia/${id}`, {
        params: { _t: timestamp } // Cache busting parameter
      });
      return response.data.data;
    } catch (error) {
      console.error("Error fetching ensiklopedia by id:", error);
      throw error;
    }
  }

  async getEnsiklopediaByLocation(): Promise<LocationEnsiklopedia[]> {
    try {
      const allCultures = await this.getAllEnsiklopedia();

      // Kelompokkan berdasarkan lokasi - sekarang satu budaya bisa muncul di banyak lokasi
      const grouped: Record<string, Ensiklopedia[]> = {};

      allCultures.forEach(culture => {
        // Ambil semua lokasi yang cocok dengan string lokasi
        const locations = getLocationsFromText(culture.location);

        if (locations.length > 0) {
          // Tambahkan budaya ke setiap lokasi yang cocok
          locations.forEach(location => {
            if (!grouped[location.name]) {
              grouped[location.name] = [];
            }

            // Cek apakah budaya sudah ditambahkan ke lokasi ini untuk menghindari duplikat
            if (!grouped[location.name].some(c => c.id === culture.id)) {
              grouped[location.name].push(culture);
            }
          });
        }
      });

      // Urutkan berdasarkan urutan BANTEN_LOCATIONS
      const result: LocationEnsiklopedia[] = [];

      BANTEN_LOCATIONS.forEach(location => {
        const locationCultures = grouped[location.name] || [];
        result.push({
          location: location.name,
          locationInfo: location,
          cultures: locationCultures
        });
      });

      return result;
    } catch (error) {
      console.error("Error fetching ensiklopedia by location:", error);
      throw error;
    }
  }

  async getTopCulturesByLocations(limit: number = 4): Promise<LocationEnsiklopedia[]> {
    try {
      const locationCultures = await this.getEnsiklopediaByLocation();

      // Ambil hanya sejumlah limit budaya untuk setiap lokasi
      return locationCultures.map(locationData => ({
        ...locationData,
        cultures: locationData.cultures.slice(0, limit)
      }));
    } catch (error) {
      console.error("Error fetching top cultures by locations:", error);
      throw error;
    }
  }
}

export default new HomeService();