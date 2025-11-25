import { Ensiklopedia } from "../../models/Ensiklopedia";
import CultureCard from "../common/CultureCard";

interface LocationSectionProps {
  locationName: string;
  locationType: string; // 'kabupaten' atau 'kota'
  cultures: Ensiklopedia[];
}

const LocationSection = ({ locationName, locationType, cultures }: LocationSectionProps) => {
  return (
    <section className="mb-16">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">
            Budaya {locationType === 'kabupaten' ? 'Kabupaten' : 'Kota'} {locationName.replace(/Kabupaten |Kota /g, '')}
          </h2>
          <div className="w-20 h-1 bg-red-800 mt-2 rounded"></div>
        </div>
        
        {/* Jika ingin menambahkan link "Lihat Semua" di masa depan */}
        {/* <Link href={`/search?location=${encodeURIComponent(locationName)}`} className="text-red-800 hover:text-red-700 font-medium">
          Lihat Semua →
        </Link> */}
      </div>

      {cultures.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {cultures.map((culture) => (
            <CultureCard key={culture.id} culture={culture} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">Belum ada data budaya untuk {locationType} ini.</p>
        </div>
      )}
    </section>
  );
};

export default LocationSection;