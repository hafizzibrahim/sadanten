"use client";

import { useState } from "react";
import { Ensiklopedia } from "../../models/Ensiklopedia";
import {
  createEnsiklopedia,
  deleteEnsiklopedia,
  updateEnsiklopedia,
} from "../../actions/ensiklopediaActions";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;

// ----- URL Helpers -----
const getFullUrl = (url: string) => {
  if (!url) return "";
  return url.startsWith("/") ? `${API_BASE_URL}${url}` : url;
};

const isValidUrl = (url: string) =>
  url && url !== "test" && (url.startsWith("http") || url.startsWith("/"));

// Placeholder image
const PLACEHOLDER =
  "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNTAiIGhlaWdodD0iNTAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHJlY3Qgd2lkdGg9IjUwIiBoZWlnaHQ9IjUwIiBmaWxsPSIjY2NjIi8+PC9zdmc+";

export default function DataClient({ data }: { data: Ensiklopedia[] }) {
  const [isAddModalOpen, setAddOpen] = useState(false);
  const [isEditModalOpen, setEditOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<Ensiklopedia | null>(null);

  const openAdd = () => setAddOpen(true);
  const closeAdd = () => setAddOpen(false);

  const openEdit = (item: Ensiklopedia) => {
    setSelectedItem(item);
    setEditOpen(true);
  };
  const closeEdit = () => {
    setSelectedItem(null);
    setEditOpen(false);
  };

  const handleDelete = async (id: string) => {
    if (confirm("Yakin ingin menghapus data ini?")) {
      await deleteEnsiklopedia(id);
    }
  };

  return (
    <div>
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">
            Manajemen Data Budaya
          </h1>
          <p className="text-gray-600 mt-1">Kelola data budaya Banten</p>
        </div>

        <button
          onClick={openAdd}
          className="px-4 py-2 bg-red-800 text-white rounded-lg hover:bg-red-700 shadow-md transition-all flex items-center"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 mr-2"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 6v6m0 0v6m0-6h6m-6 0H6"
            />
          </svg>
          Tambah Data
        </button>
      </div>

      {/* TABLE */}
      <div className="mt-8 bg-white rounded-xl shadow border border-red-100 overflow-x-auto">
        <table className="min-w-full">
          <thead>
            <tr className="border-b border-red-100 bg-red-50">
              {[
                "ID",
                "Nama",
                "Kategori",
                "Lokasi",
                "Status",
                "Foto",
                "Audio",
                "Terakhir Diperbarui",
                "Aksi",
              ].map((h) => (
                <th
                  key={h}
                  className="px-6 py-3 text-left text-xs font-semibold text-red-800 uppercase tracking-wider"
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>

          <tbody className="divide-y divide-red-100">
            {data.map((item) => {
              const photoUrl = isValidUrl(item.photo)
                ? getFullUrl(item.photo)
                : PLACEHOLDER;
              const audioUrl = isValidUrl(item.audio)
                ? getFullUrl(item.audio)
                : null;

              return (
                <tr
                  key={item.id}
                  className="hover:bg-red-50/30 transition-colors"
                >
                  <td className="px-6 py-4 text-sm text-gray-600">{item.id}</td>
                  <td className="px-6 py-4 font-medium text-gray-900">
                    {item.name}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">
                    {item.category}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">
                    {item.location}
                  </td>
                  <td className="px-6 py-4">
                    <span className="px-2 py-1 text-xs rounded-full bg-red-100 text-red-800">
                      {item.status}
                    </span>
                  </td>

                  <td className="px-6 py-4">
                    <img
                      src={photoUrl}
                      alt={item.name}
                      className="w-12 h-12 object-cover rounded-lg border border-red-200"
                    />
                  </td>

                  <td className="px-6 py-4">
                    {audioUrl ? (
                      <audio controls src={audioUrl} className="h-8 w-40" />
                    ) : (
                      <span className="text-gray-400 text-sm">Tidak ada</span>
                    )}
                  </td>

                  <td className="px-6 py-4 text-sm text-gray-600">
                    {new Date(item.updated_at).toLocaleDateString("id-ID")}
                  </td>

                  <td className="px-6 py-4 text-right space-x-2">
                    <button
                      onClick={() => openEdit(item)}
                      className="text-red-700 hover:text-red-900"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                        />
                      </svg>
                    </button>
                    <button
                      onClick={() => handleDelete(item.id)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                        />
                      </svg>
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* ADD MODAL */}
      {isAddModalOpen && (
        <Modal title="Tambah Data Budaya" onClose={closeAdd}>
          <form
            encType="multipart/form-data"
            onSubmit={async (e) => {
              e.preventDefault();
              const formData = new FormData(e.currentTarget);

              await createEnsiklopedia(formData); // langsung ke service
              closeAdd();
            }}
          >
            <FormFields />
            <ModalFooter onClose={closeAdd} />
          </form>
        </Modal>
      )}

      {/* EDIT MODAL */}
      {isEditModalOpen && selectedItem && (
        <Modal title="Edit Data Budaya" onClose={closeEdit}>
          <form
            encType="multipart/form-data"
            onSubmit={async (e) => {
              e.preventDefault();
              const formData = new FormData(e.currentTarget);

              await updateEnsiklopedia(selectedItem.id, formData);
              closeEdit();
            }}
          >
            <FormFields item={selectedItem} />
            <ModalFooter onClose={closeEdit} saveLabel="Simpan Perubahan" />
          </form>
        </Modal>
      )}
    </div>
  );
}

/* ===================================================
   MODAL COMPONENT
=================================================== */
function Modal({
  title,
  onClose,
  children,
}: {
  title: string;
  onClose: () => void;
  children: React.ReactNode;
}) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* BACKDROP */}
      <div
        onClick={onClose}
        className="absolute inset-0 bg-black/40 backdrop-blur-sm animate-fadeIn"
      />

      {/* BOX */}
      <div className="relative z-50 w-full max-w-2xl p-8 bg-white rounded-xl shadow-2xl animate-slideUp border border-red-100">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold text-red-800">{title}</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-red-800"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
        <div className="mt-6">{children}</div>
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(25px) scale(0.95);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.2s ease-out forwards;
        }
        .animate-slideUp {
          animation: slideUp 0.25s ease-out forwards;
        }
      `}</style>
    </div>
  );
}

/* ===================================================
   FORM FIELDS
=================================================== */
function FormFields({ item }: { item?: Ensiklopedia }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* Nama */}
      <div className="md:col-span-2">
        <label className="block text-sm font-medium text-red-800">Nama</label>
        <input
          type="text"
          name="name"
          defaultValue={item?.name}
          required
          className="w-full px-4 py-2 mt-1 border border-red-200 rounded-lg focus:ring-red-500 focus:border-red-500 text-gray-900"
        />
      </div>

      {/* Kategori */}
      <div>
        <label className="block text-sm font-medium text-red-800">
          Kategori
        </label>
        <input
          type="text"
          name="category"
          defaultValue={item?.category}
          required
          className="w-full px-4 py-2 mt-1 border border-red-200 rounded-lg focus:ring-red-500 focus:border-red-500 text-gray-900"
        />
      </div>

      {/* Lokasi */}
      <div>
        <label className="block text-sm font-medium text-red-800">Lokasi</label>
        <input
          type="text"
          name="location"
          defaultValue={item?.location}
          required
          className="w-full px-4 py-2 mt-1 border border-red-200 rounded-lg focus:ring-red-500 focus:border-red-500 text-gray-900"
        />
      </div>

      {/* Status */}
      <div>
        <label className="block text-sm font-medium text-red-800">Status</label>
        <input
          type="text"
          name="status"
          defaultValue={item?.status}
          required
          className="w-full px-4 py-2 mt-1 border border-red-200 rounded-lg focus:ring-red-500 focus:border-red-500 text-gray-900"
        />
      </div>

      {/* Deskripsi */}
      <div className="md:col-span-2">
        <label className="block text-sm font-medium text-red-800">
          Deskripsi
        </label>
        <textarea
          name="description"
          rows={4}
          defaultValue={item?.description}
          className="w-full px-4 py-2 mt-1 border border-red-200 rounded-lg focus:ring-red-500 focus:border-red-500 text-gray-900"
          required
        />
      </div>

      {/* Foto */}
      <div>
        <label className="block text-sm font-medium text-red-800">Foto</label>
        {item?.photo && (
          <p className="text-xs text-red-600 mt-1 truncate">
            Current: {item.photo}
          </p>
        )}
        <input
          type="file"
          name="photo"
          className="w-full px-4 py-2 mt-1 border border-red-200 rounded-lg focus:ring-red-500 focus:border-red-500 text-gray-900"
        />
      </div>

      {/* Audio */}
      <div>
        <label className="block text-sm font-medium text-red-800">Audio</label>
        {item?.audio && (
          <p className="text-xs text-red-600 mt-1 truncate">
            Current: {item.audio}
          </p>
        )}
        <input
          type="file"
          name="audio"
          className="w-full px-4 py-2 mt-1 border border-red-200 rounded-lg focus:ring-red-500 focus:border-red-500 text-gray-900"
        />
      </div>
    </div>
  );
}

/* ===================================================
   MODAL FOOTER
=================================================== */
function ModalFooter({
  onClose,
  saveLabel = "Simpan",
}: {
  onClose: () => void;
  saveLabel?: string;
}) {
  return (
    <div className="flex justify-end space-x-4 mt-8">
      <button
        type="button"
        onClick={onClose}
        className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition-colors"
      >
        Batal
      </button>
      <button
        type="submit"
        className="px-4 py-2 bg-red-800 text-white rounded-lg hover:bg-red-700 shadow-md transition-colors flex items-center"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5 mr-2"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M5 13l4 4L19 7"
          />
        </svg>
        {saveLabel}
      </button>
    </div>
  );
}
