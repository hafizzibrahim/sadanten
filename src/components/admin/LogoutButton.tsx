"use client";

import { useRouter } from "next/navigation";
import { logoutAction } from "../../actions/logoutActions";

export default function LogoutButton() {
  const router = useRouter();

  const handleLogout = async () => {
    try {
      const result = await logoutAction();
      if (result.success) {
        // Redirect ke halaman login setelah logout berhasil
        router.push('/login');
        router.refresh(); // Me-refresh state router
      } else {
        console.error("Logout failed:", result.message);
      }
    } catch (error) {
      console.error("Logout error:", error);
      // Jika terjadi error, tetap redirect ke login
      router.push('/login');
    }
  };

  return (
    <button
      onClick={handleLogout}
      className="flex items-center w-full px-6 py-3 text-gray-700 hover:bg-red-100 hover:text-red-800 rounded-lg transition-all font-medium"
    >
      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
      </svg>
      Logout
    </button>
  );
}