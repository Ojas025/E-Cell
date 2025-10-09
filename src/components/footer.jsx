import React from "react";

const Footer = () => {
  return (
    <footer
      className="relative z-50 bg-[#02020E] border-t border-purple-900/30 py-8 px-4"
      id="contact"
    >
      <div className="container mx-auto max-w-5xl">
        {/* Top Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand */}
          <div>
            <h3 className="text-white text-xl font-bold mb-2">
              E-Cell AISSMS COE
            </h3>
            <p className="text-purple-200 text-sm">
              Igniting the entrepreneurial spark in every student
            </p>
          </div>

          {/* Contact Us */}
          <div>
            <h4 className="text-white font-semibold mb-3">Contact Us</h4>
            <ul className="space-y-2 text-sm text-purple-300">
              <li>
                <a
                  href="https://www.instagram.com/edcell_aissmscoe/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors"
                >
                  Instagram
                </a>
              </li>
              <li>Email: ecell@aissmscoe.com</li>
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
