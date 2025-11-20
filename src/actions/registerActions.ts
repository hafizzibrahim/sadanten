"use server";

import { cookies } from "next/headers";
import api from "../data/api";

export async function registerAction(username: string, email: string, password: string) {
  try {
    // Validasi input sebelum dikirim
    if (!username || !email || !password) {
      return {
        success: false,
        message: "Semua field harus diisi"
      };
    }

    const response = await api.post("/auth/register", {
      username,
      email,
      password
    });

    // Jika backend mengembalikan token langsung setelah register
    if (response.data.data && response.data.data.token) {
      const token = response.data.data.token;

      // Simpan token ke HTTP-only cookie
      const cookieStore = await cookies();

      cookieStore.set("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production", // Non-secure di development
        sameSite: "strict",
        path: "/",
      });
    }

    return {
      success: true,
      message: response.data.message || "Registrasi berhasil"
    };
  } catch (err: any) {
    console.error("Register Error:", err);

    // Cek apakah error karena koneksi atau error dari server
    if (err.response) {
      // Server merespon dengan status error (4xx, 5xx)
      return {
        success: false,
        message: err.response.data?.message || err.response.data?.error?.message || `Registrasi gagal: ${err.response.status}`
      };
    } else if (err.request) {
      // Request dibuat tetapi tidak ada respons dari server
      return {
        success: false,
        message: "Tidak dapat terhubung ke server. Pastikan backend sedang berjalan."
      };
    } else {
      // Error lainnya
      return {
        success: false,
        message: err.message || "Terjadi kesalahan saat registrasi"
      };
    }
  }
}