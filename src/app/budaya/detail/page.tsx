import Link from 'next/link';
import BackgroundDecorations from '../../../components/home/BackgroundDecorations';
import Navbar from '../../../components/layout/Navbar';
import Footer from '../../../components/layout/Footer';

export default function BudayaDetailPage() {
  return (
    <div className="min-h-screen bg-gray-50 relative">
      <BackgroundDecorations />
      
      <div className="relative z-10">
        <Navbar />
        {/* MAIN CONTENT */}
        {/* ↓↓↓ JARAK ATAS DIKURANGI DARI pt-28 → pt-20 */}
        <div className="max-w-6xl mx-auto pt-20 px-4 pb-20 grid grid-cols-1 lg:grid-cols-3 gap-5">

          {/* LEFT CONTENT */}
          <div className="lg:col-span-2 bg-white p-6 rounded-2xl shadow-lg space-y-4">

            <img
              src="https://via.placeholder.com/600x400"
              alt="detail"
              className="w-full h-64 object-cover rounded-xl"
            />

            <h2 className="text-red-800 font-semibold text-2xl">
              Debus: Seni Bela Diri Tradisional Banten
            </h2>

            <p className="text-gray-700 text-sm leading-relaxed">
              Atraksi bela diri-spiritual menampilkan kekebalan terhadap senjata/bara api,
              tumbuh sejak masa Sultan Maulana Hasanuddin dan Ageng Tirtayasa, erat dengan
              dakwah Islam. Hidup kuat di Banten, kerap tampil pada acara besar.
            </p>

            <h3 className="text-red-800 font-semibold text-lg">Keunikan Debus</h3>
            <ul className="list-disc list-inside text-gray-700 text-sm space-y-1">
              <li>Membelah badan dengan pedang atau golok tanpa luka</li>
              <li>Berjalan di atas bara api</li>
              <li>Menggigit besi atau kaca tanpa cedera</li>
              <li>Menggunakan mantra dan doa dalam setiap pertunjukan</li>
            </ul>

            <h3 className="text-red-800 font-semibold text-lg">Pelestarian</h3>
            <p className="text-gray-700 text-sm leading-relaxed">
              Saat ini, Debus mulai jarang ditemui karena generasi muda kurang tertarik.
              Namun, beberapa komunitas di Banten masih aktif melestarikan Debus melalui
              pelatihan dan pertunjukan rutin.
            </p>

            <Link href="/">
              <button className="mt-4 px-6 py-2 bg-red-800 text-white rounded-lg hover:bg-red-700 transition-colors">
                ← Kembali
              </button>
            </Link>
          </div>

          {/* RIGHT SIDEBAR */}
          <div className="w-full lg:w-[340px] space-y-6">

            <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-200 space-y-4">
              <h2 className="text-red-800 text-lg font-bold">Info Singkat</h2>
              <div className="h-px bg-gray-200" />

              {/* Info Items */}
              <div className="space-y-4">
                <div className="bg-gray-50 border border-gray-200 rounded-xl p-5">
                  <p className="text-red-800 text-sm font-semibold">Lokasi</p>
                  <p className="text-gray-700 text-sm mt-1 leading-relaxed">
                    Banten — Serang, Cilegon, <br /> Pandeglang
                  </p>
                </div>

                <div className="bg-gray-50 border border-gray-200 rounded-xl p-5">
                  <p className="text-red-800 text-sm font-semibold">Kategori</p>
                  <p className="text-gray-700 text-sm mt-1 leading-relaxed">
                    Seni Bela Diri & Ritual Spiritual
                  </p>
                </div>

                <div className="bg-gray-50 border border-gray-200 rounded-xl p-5">
                  <p className="text-red-800 text-sm font-semibold">Status</p>
                  <p className="text-700 text-sm mt-1 leading-relaxed">
                    Masih dilestarikan oleh komunitas lokal
                  </p>
                </div>
              </div>
            </div>

          </div>
        </div>
        <Footer />
      </div>
    </div>
  );
}
