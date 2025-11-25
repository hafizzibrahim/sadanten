export interface Location {
  id: string;
  name: string;
  type: 'kabupaten' | 'kota'; // kabupaten atau kota
  abbreviations?: string[]; // alternatif nama atau singkatan
}

export const BANTEN_LOCATIONS: Location[] = [
  { id: 'lebak', name: 'Kabupaten Lebak', type: 'kabupaten', abbreviations: ['lebak'] },
  { id: 'pandeglang', name: 'Kabupaten Pandeglang', type: 'kabupaten', abbreviations: ['pandeglang'] },
  { id: 'serang_kab', name: 'Kabupaten Serang', type: 'kabupaten', abbreviations: ['serang'] },
  { id: 'tangerang_kab', name: 'Kabupaten Tangerang', type: 'kabupaten' }, // Tidak ada abbreviations agar tidak memungkinkan 'tangerang' saja
  { id: 'serang_kota', name: 'Kota Serang', type: 'kota', abbreviations: ['serang'] },
  { id: 'cilegon', name: 'Kota Cilegon', type: 'kota', abbreviations: ['cilegon'] },
  { id: 'tangerang_kota', name: 'Kota Tangerang', type: 'kota' }, // Tidak ada abbreviations agar tidak memungkinkan 'tangerang' saja
  { id: 'tangsel', name: 'Kota Tangerang Selatan', type: 'kota', abbreviations: ['tangsel', 'tangerang selatan'] },
];

// Fungsi untuk mendapatkan nama kota/kabupaten dari string lokasi
export const getLocationByName = (locationName: string): Location | undefined => {
  return BANTEN_LOCATIONS.find(
    loc =>
      loc.name.toLowerCase().includes(locationName.toLowerCase()) ||
      locationName.toLowerCase().includes(loc.name.toLowerCase()) ||
      (loc.abbreviations && loc.abbreviations.some(abbr =>
        abbr.toLowerCase().includes(locationName.toLowerCase()) ||
        locationName.toLowerCase().includes(abbr.toLowerCase())
      ))
  );
};

// Fungsi untuk mencari semua lokasi yang cocok dalam string lokasi
export const getLocationsFromText = (locationText: string): Location[] => {
  // Coba cocokkan dengan semua lokasi di Banten
  const foundLocations: Location[] = [];

  for (const location of BANTEN_LOCATIONS) {
    // Cocokkan nama lengkap secara case-insensitive
    let isMatch = locationText.toLowerCase().includes(location.name.toLowerCase());

    // Jika belum cocok, coba cocokkan dengan singkatan
    if (!isMatch && location.abbreviations) {
      isMatch = location.abbreviations.some(abbr =>
        locationText.toLowerCase().includes(abbr.toLowerCase())
      );
    }

    if (isMatch) {
      // Pastikan tidak ada duplikat
      if (!foundLocations.some(loc => loc.id === location.id)) {
        foundLocations.push(location);
      }
    }
  }

  return foundLocations;
};

// Array hanya nama-nama lokasi untuk pencocokan
export const LOCATION_NAMES = BANTEN_LOCATIONS.map(loc => loc.name.toLowerCase());