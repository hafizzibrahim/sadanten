"use server";

import { cookies } from "next/headers";

export async function logoutAction() {
  try {
    // Hapus token dari cookie
    const cookieStore = await cookies();
    cookieStore.delete("token");

    return { success: true, message: "Logout berhasil" };
  } catch (error) {
    console.error("Logout error:", error);
    return { success: false, message: "Gagal logout" };
  }
}