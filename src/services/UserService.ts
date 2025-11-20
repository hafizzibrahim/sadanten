import api from "../data/api";
import { User } from "../models/User";

export interface ApiResponse<T> {
  success: boolean;
  message?: string;
  data: T;
}

class UserService {
    async getAllUsers(): Promise<User[]> {
        try {
            const response = await api.get<ApiResponse<User[]>>('/auth/users');
            return response.data.data;
        } catch (error) {
            throw error;
        }
    }

    async getUserById(id: number): Promise<User> {
        try {
            const response = await api.get<ApiResponse<User>>(`/auth/users/${id}`);
            return response.data.data;
        } catch (error) {
            throw error;
        }
    }
    async createUser(user: Omit<User, 'id' | 'createdAt' | 'updatedAt'>): Promise<User> {
        try {
            const response = await api.post<ApiResponse<User>>('/auth/register', user);
            return response.data.data;
        } catch (error) {
            throw error;
        }
    }

    async updateUser(id: number, user: Partial<Omit<User, 'id' | 'createdAt' | 'updatedAt'>>): Promise<User> {
        try {
            const response = await api.put<ApiResponse<User>>(`/users/${id}`, user);
            return response.data.data;
        } catch (error) {
            throw error;
        }
    }
    async deleteUser(id: number): Promise<void> {
        try {
            await api.delete(`/users/${id}`);
        } catch (error) {
            throw error;
        }
    }
}

export default new UserService();