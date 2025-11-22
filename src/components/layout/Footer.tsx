// Komponen Footer
const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-red-900 text-white py-6 mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <p className="text-sm">
          © {currentYear} SADANTENpedia — Ensiklopedia Warisan Budaya Banten. Semua hak cipta dilindungi.
        </p>
      </div>
    </footer>
  );
};

export default Footer;