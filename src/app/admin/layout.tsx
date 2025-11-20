"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import LogoutButton from "../../components/admin/LogoutButton";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  const navItem = (href: string, label: string) => (
    <Link
      href={href}
      className={`flex items-center px-6 py-3 rounded-lg transition-all font-medium
        ${
          pathname === href
            ? "bg-red-800 text-white shadow-lg"
            : "text-gray-700 hover:bg-red-100 hover:text-red-800"
        }`}
    >
      {label}
    </Link>
  );

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-lg flex flex-col border-r border-gray-200">
        <div className="p-4 border-b border-gray-200 flex flex-col items-center">
          <Link href="/admin" className="flex flex-col items-center">
            <div className="flex items-center justify-center">
              <img
                src="/sadanten_logo.svg"
                alt="Sadanten Logo"
                className="h-40 w-auto"
              />
            </div>
          </Link>
        </div>

        <nav className="flex flex-col space-y-1 px-4 mt-6">
          {navItem("/admin", "Dashboard")}
          {navItem("/admin/data", "Manajemen Data")}
        </nav>

        {/* Logout Button */}
        <div className="mt-auto px-4 pb-4">
          <LogoutButton />
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto p-6 bg-gray-50">
        {children}
      </main>
    </div>
  );
}