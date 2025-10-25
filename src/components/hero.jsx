import React from "react";

const Hero = () => {
  const imageUrl = "/images/hero-section.png";

  return (
    <section
      id="home"
      className="min-h-screen flex items-center relative overflow-hidden px-6 sm:px-10 lg:px-20 font-['Enriqueta'] scroll-mt-20 pt-15"
    >
      <div className="container mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        {/* Left text */}
        <div className="relative z-10 text-center lg:text-left">
          <div className="space-y-6">
            <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold text-white leading-tight">
              Ignite Your
              <br />
              <span className="text-purple-400">Entrepreneurial</span>
              <br />
              Journey
            </h1>

            <p className="text-base sm:text-lg text-gray-300 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
              The Entrepreneurship Cell (E-Cell) at AISSMS College of
              Engineering is dedicated to fostering innovation and nurturing the
              entrepreneurial spirit among students. Igniting Sparks!
            </p>

            <div className="flex justify-center lg:justify-start pt-4">
              <a
                href="#about"
                className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-3 rounded-full font-medium transition-colors"
              >
                Know More
              </a>
            </div>
          </div>
        </div>

        {/* Right image */}
        <div className="relative z-10 flex justify-center lg:justify-end">
          <div className="relative w-64 sm:w-80 md:w-96 lg:w-[28rem]">
            <div className="absolute inset-0 rounded-2xl border-4 sm:border-6 border-white animate-pulse"></div>
            <div className="aspect-square bg-gradient-to-br from-purple-600/20 to-blue-600/20 rounded-2xl border border-purple-500/30 backdrop-blur-sm flex items-center justify-center overflow-hidden">
              <img
                src={imageUrl}
                alt="Entrepreneurial Journey Illustration"
                className="w-full h-full object-cover"
              />
            </div>

            {/* Glow effects */}
            <div className="absolute -top-6 -right-6 w-24 sm:w-32 h-24 sm:h-32 bg-purple-600/10 rounded-full blur-2xl"></div>
            <div className="absolute -bottom-6 -left-6 w-20 sm:w-28 h-20 sm:h-28 bg-blue-600/10 rounded-full blur-2xl"></div>
          </div>
        </div>
      </div>

      {/* Background gradients */}
      <div className="absolute right-0 top-1/2 transform -translate-y-1/2 w-64 sm:w-96 h-64 sm:h-96 bg-purple-900/5 rounded-full blur-3xl"></div>
      <div className="absolute left-0 bottom-0 w-64 sm:w-96 h-64 sm:h-96 bg-blue-900/5 rounded-full blur-3xl"></div>
    </section>
  );
};

export default Hero;
