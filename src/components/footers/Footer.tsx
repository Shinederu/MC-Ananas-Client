

const Footer = () => {
  return (
    <footer className="text-center py-5 bg-[#1a1a1a] mt-8 text-gray-400 text-sm mx">
      <div>
        Version : {import.meta.env.VITE_SHINEDERU_VERSION}
      </div>
      <p>
        &copy; 2025 <a href="https://shinederu.lol" target="_blank" rel="noopener noreferrer" className="hover:underline">Play.Shinederu.lol & Silversat</a> - Tous droits réservés
      </p>
    </footer>
  );
};

export default Footer;
