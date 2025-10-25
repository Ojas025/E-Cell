import React from "react";
import { Link } from "react-router";

const Footer = () => {
  return (
    <footer
      className="relative flex z-50 bg-[#02020E] border-t border-purple-900/30 py-8 px-4"
      id="contact"
    >
      <div className="container mx-auto max-w-5xl">
        {/* Top Section */}
        <div className="flex justify-around gap-8">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-3">
            <img src="/icons/logo.png" className="w-12" alt="" />
            <h3 className="text-white text-xl font-bold mb-2">
              E-Cell AISSMS COE
            </h3>
            </div>
            <p className="text-purple-200 text-sm">
              Igniting the entrepreneurial spark in every student
            </p>
          </div>

          {/* Important Links */}
          {/* <div>
            <h4 className="text-white font-semibold mb-3">Important Links</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a
                  href="#home"
                  className="text-purple-300 hover:text-white transition-colors"
                >
                  Home
                </a>
              </li>
              <li>
                <a
                  href="#about"
                  className="text-purple-300 hover:text-white transition-colors"
                >
                  About
                </a>
              </li>
              <li>
                <a
                  href="#timeline"
                  className="text-purple-300 hover:text-white transition-colors"
                >
                  Events
                </a>
              </li>
              <li>
                <a
                  href="#team"
                  className="text-purple-300 hover:text-white transition-colors"
                >
                  Team
                </a>
              </li>
            </ul>
          </div> */}

          {/* Contact Us */}
          <div>
            <h4 className="text-white font-semibold mb-3">Contact Us</h4>
            <ul className="space-y-2 text-sm text-purple-300">
              <li className="flex items-center gap-2">
                <img className="w-4 h-4" src="/icons/instagram.png" />
                <a
                  href="https://www.instagram.com/edcell_aissmscoe/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors"
                >
                  @edcell_aissmscoe
                </a>
              </li>
              <li>Email: ecell@aissmscoe.com</li>
              <li className="font-semibold text-black px-4 py-1 w-max cursor-pointer bg-pink-300">
                <Link to={'/admin/login'}>
                Admin Login
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-purple-800 mt-8 pt-6 text-center text-purple-400 text-sm">
          <p>
            © {new Date().getFullYear()} E-Cell AISSMS COE. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
