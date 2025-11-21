"use server";

import { cookies } from "next/headers";
import api from "../data/api";

export async function loginAction(email: string, password: string) {
  try {
    const response = await api.post("/auth/login", { email, password });
    const token = response.data.data.token;

    // Simpan token ke HTTP-only cookie
    const cookieStore = await cookies();

    cookieStore.set("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production", // Non-secure in development
      sameSite: "strict",
      path: "/",
    });

    return { success: true };
  } catch (err: any) {
    return { success: false, message: err.message };
  }
}
