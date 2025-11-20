"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { loginAction } from "../../actions/loginActions";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const handleLogin = async (e: { preventDefault: () => void; }) => {
  e.preventDefault();
  setLoading(true);
  setError("");

  const result = await loginAction(email, password);

  if (!result.success) {
    setError(result.message || "Login gagal");
    setLoading(false);
    return;
  }

  router.push("/admin");
  setLoading(false);
};

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 px-4">
      <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-xl shadow-lg border border-red-100 opacity-0 animate-fadeIn">
        <div className="text-center flex flex-col items-center">
          <div className="mb-4 animate-scaleIn">
            <img src="/sadanten_logo.svg" className="h-20 w-auto object-contain" />
          </div>

          <h1 className="text-3xl font-bold text-red-800">Admin Login</h1>
          <p className="mt-2 text-gray-600">Masuk ke panel admin</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-6">
          {error && <p className="text-sm text-red-600 text-center">{error}</p>}

          <div>
            <label className="block text-sm font-medium text-red-800">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              disabled={loading}
              className="w-full px-4 py-2 mt-1 border border-red-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 text-gray-900"
              placeholder="admin@example.com"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-red-800">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              disabled={loading}
              className="w-full px-4 py-2 mt-1 border border-red-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 text-gray-900"
              placeholder="password"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full px-4 py-2 font-medium text-white bg-red-800 rounded-lg hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 shadow-md transition-colors disabled:bg-red-400"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes scaleIn {
          from { opacity: 0; transform: scale(0.8); }
          to { opacity: 1; transform: scale(1); }
        }
        .animate-fadeIn { animation: fadeIn 0.5s ease-out forwards; }
        .animate-scaleIn { animation: scaleIn 0.4s ease-out forwards; }
      `}</style>
    </div>
  );
}
