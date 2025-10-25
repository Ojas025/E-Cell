// components/AboutSection.jsx
import React from "react";

const AboutSection = () => {
  return (
    <section id="about" className="py-16 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      <style jsx>{`
        .wiggle:hover {
          animation: wiggle 0.5s ease-in-out;
        }
        @keyframes wiggle {
          0%, 100% { transform: translate(0, 0) rotate(0deg); }
          25% { transform: translate(-2px, -1px) rotate(-1deg); }
          75% { transform: translate(2px, 1px) rotate(1deg); }
        }
      `}</style>
      
      <div className="max-w-6xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-white mb-8 font-enriqueta text-shadow">About Us</h2>
        </div>

        <div className="wiggle bg-black/50 backdrop-blur-md rounded-2xl p-8 border border-white/10 mb-12 transition-all duration-300 hover:border-purple-400/30">
          <p className="text-lg text-purple-200 mb-6 text-center font-enriqueta">
            At Entrepreneurship Cell, AISSMS COE Pune we believe that entrepreneurship is the key to India's development..
          </p>
          
          <div className="text-purple-200 mb-6 font-enriqueta">
            <p className="mb-4">• We foster great ideas that deserve the right ecosystem to flourish. That's why we connect budding innovators with mentors, incubators, seed funding, and networking opportunities — turning classroom concepts into real-world solutions.</p>
            
            <p className="mb-4">• Throughout the year, we organize startup pitching competitions and inspiring speaker sessions that challenge students to think bigger, act bolder, and build better.</p>
            
            <p className="mb-4">• E-Cell is not just a committee — it's a movement. We are here to nurture dreamers, empower problem-solvers, and create a launchpad for the next generation of changemakers.</p>
          </div>
          
          <p className="text-lg text-purple-300 text-center font-semibold font-enriqueta">
            Your idea is the next big thing — let's make it happen!
          </p>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;