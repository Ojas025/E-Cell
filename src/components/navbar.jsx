import { useEffect, useState } from "react";
import { UserAuth } from "../context/AuthContext";
import { NavLink } from "react-router";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isAdminWindowOpen, setIsAdminWindowOpen] = useState(true);
  const {session} = UserAuth();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLinkClick = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <div>
      {session && isAdminWindowOpen && (
  <div className="w-full flex flex-col sm:flex-row items-center sm:items-center gap-2 sm:gap-0 px-4 py-2 bg-slate-700 text-sky-300 font-semibold">
    <p className="text-center font-sans w-full sm:w-auto">
      You have Admin Access
    </p>
    <NavLink
      to={"/admin/dashboard"}
      className="sm:ml-auto bg-slate-900 px-3 py-1 rounded-sm cursor-pointer text-sm sm:text-base hover:bg-slate-800 transition-colors w-full sm:w-auto text-center"
    >
      Admin Dashboard
    </NavLink>
    <div onClick={() => setIsAdminWindowOpen(false)} className="ml-4 text-xl my-auto cursor-pointer select-none">x</div>
  </div>
)}


    <nav
      className={`w-full z-[9999] transition-all duration-300 ${
        isScrolled
          ? "bg-[#02020E]/90 backdrop-blur-md py-2 shadow-lg"
          : "bg-transparent py-4"
      }`}
    >
      <div className="container mx-auto px-4 flex justify-between items-center">
        <div className="flex items-center space-x-3">
          <img
            src="/icons/logo.png"
            alt="E-Cell Logo"
            className="h-10 w-10 object-contain"
          />
          <span className="text-white text-2xl font-bold font-enriqueta">
            E-Cell AISSMS COE
          </span>
        </div>

        {/* Links */}
        <div className="hidden md:flex space-x-8">
          <a href="#home" className="text-white hover:text-purple-300 transition-colors font-enriqueta">Home</a>
          <a href="#about" className="text-white hover:text-purple-300 transition-colors font-enriqueta">About</a>
          <a href="#timeline" className="text-white hover:text-purple-300 transition-colors font-enriqueta">Events</a>
          <a href="#gallery" className="text-white hover:text-purple-300 transition-colors font-enriqueta">Gallery</a>
          <a href="#team" className="text-white hover:text-purple-300 transition-colors font-enriqueta">Team</a>
          <a href="#contact" className="text-white hover:text-purple-300 transition-colors font-enriqueta">Contact Us</a>
        </div>

        <div className="md:hidden">
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="flex flex-col justify-center items-center w-10 h-10 relative focus:outline-none group"
            aria-label="Toggle menu"
          >
            <span className={`block w-6 h-0.5 bg-white transition-all duration-300 ${
              isMobileMenuOpen ? 'rotate-45 translate-y-1' : '-translate-y-1'
            }`}></span>
            <span className={`block w-6 h-0.5 bg-white transition-all duration-300 mt-1.5 ${
              isMobileMenuOpen ? 'opacity-0' : 'opacity-100'
            }`}></span>
            <span className={`block w-6 h-0.5 bg-white transition-all duration-300 mt-1.5 ${
              isMobileMenuOpen ? '-rotate-45 -translate-y-2' : 'translate-y-1'
            }`}></span>
            
            <div className="absolute inset-0 bg-purple-500/10 rounded-full scale-0 group-hover:scale-100 transition-transform duration-300"></div>
          </button>
        </div>
      </div>

      <div
        className={`md:hidden fixed top-0 left-0 w-full h-screen bg-gradient-to-br from-[#02020E] to-purple-900/20 backdrop-blur-lg z-40 flex flex-col justify-center items-center space-y-8 py-20 px-6 transition-all duration-500 ${
          isMobileMenuOpen 
            ? "opacity-100 visible translate-x-0" 
            : "opacity-0 invisible -translate-x-full pointer-events-none z-0"
        }`}
      >
        <button
          onClick={() => setIsMobileMenuOpen(false)}
          className="absolute top-6 right-6 text-white text-2xl p-2 hover:text-purple-300 transition-colors"
          aria-label="Close menu"
        >
          ✕
        </button>

        <a 
          href="#home" 
          className="text-white text-2xl font-enriqueta py-4 px-8 hover:text-purple-300 hover:bg-white/5 rounded-xl transition-all duration-300 transform hover:scale-105 w-full text-center"
          onClick={handleLinkClick}
        >
          Home
        </a>
        <a 
          href="#about" 
          className="text-white text-2xl font-enriqueta py-4 px-8 hover:text-purple-300 hover:bg-white/5 rounded-xl transition-all duration-300 transform hover:scale-105 w-full text-center"
          onClick={handleLinkClick}
        >
          About
        </a>
        <a 
          href="#timeline" 
          className="text-white text-2xl font-enriqueta py-4 px-8 hover:text-purple-300 hover:bg-white/5 rounded-xl transition-all duration-300 transform hover:scale-105 w-full text-center"
          onClick={handleLinkClick}
        >
          Events
        </a>
        <a 
          href="#team" 
          className="text-white text-2xl font-enriqueta py-4 px-8 hover:text-purple-300 hover:bg-white/5 rounded-xl transition-all duration-300 transform hover:scale-105 w-full text-center"
          onClick={handleLinkClick}
        >
          Team
        </a>
        <a 
          href="#contact" 
          className="text-white text-2xl font-enriqueta py-4 px-8 hover:text-purple-300 hover:bg-white/5 rounded-xl transition-all duration-300 transform hover:scale-105 w-full text-center"
          onClick={handleLinkClick}
        >
          Contact Us
        </a>

        <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 text-purple-300 text-sm">
          E-Cell AISSMS COE
        </div>
      </div>

      {isMobileMenuOpen && (
        <div 
          className="md:hidden fixed inset-0 bg-black/60 backdrop-blur-sm z-30"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}
    </nav>
    </div>
  );
};

export default Navbar;