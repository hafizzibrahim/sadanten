// Fungsi helper untuk menambahkan cache buster ke URL file
export const addCacheBusterToUrl = (url: string): string => {
  if (!url) return url;
  
  // Jika URL sudah memiliki parameter query, tambahkan dengan &
  // Jika tidak, tambahkan dengan ?
  const separator = url.includes('?') ? '&' : '?';
  const cacheBuster = `cb=${Date.now()}`;
  
  return `${url}${separator}${cacheBuster}`;
};

// Fungsi helper untuk menambahkan cache buster ke URL dengan versi
export const addVersionedCacheBusterToUrl = (url: string, version: string): string => {
  if (!url) return url;
  
  const separator = url.includes('?') ? '&' : '?';
  const cacheBuster = `v=${version}`;
  
  return `${url}${separator}${cacheBuster}`;
};