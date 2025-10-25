// pages/Home.jsx
import Navbar from "../components/navbar";
import Hero from "../components/hero";
import AboutUs from "../components/aboutUs";
import Timeline from "../components/timeline";
import Team from "../components/team";
import Footer from "../components/footer";
import Gallery from "../components/Gallery";
import { UserAuth } from "../context/AuthContext";

const Home = () => {
  return (
    <div className="relative min-h-screen bg-[#02020E] overflow-hidden">

      {/* Background blobs */}
      <div className="absolute inset-0 -z-10">
        {/* Purple blobs */}
        <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-purple-600 rounded-full blur-[180px] opacity-40 animate-float-slow"></div>
        <div className="absolute bottom-[15%] right-[5%] w-[400px] h-[400px] bg-purple-500 rounded-full blur-[160px] opacity-35 animate-float"></div>

        {/* Blue blobs */}
        <div className="absolute top-[20%] left-[30%] w-[450px] h-[450px] bg-blue-500 rounded-full blur-[180px] opacity-40 animate-float-slow"></div>
        <div className="absolute bottom-[5%] left-[10%] w-[350px] h-[350px] bg-blue-400 rounded-full blur-[160px] opacity-40 animate-float"></div>

        {/* Pink blobs */}
        <div className="absolute top-[40%] right-[-5%] w-[500px] h-[500px] bg-pink-500 rounded-full blur-[200px] opacity-40 animate-float-slow"></div>
        <div className="absolute bottom-[20%] right-[25%] w-[300px] h-[300px] bg-pink-400 rounded-full blur-[140px] opacity-35 animate-float"></div>

        {/* Violet / Fuchsia accents */}
        <div className="absolute top-[5%] right-[35%] w-[400px] h-[400px] bg-violet-600 rounded-full blur-[160px] opacity-35 animate-float"></div>
        <div className="absolute bottom-[35%] left-[35%] w-[300px] h-[300px] bg-fuchsia-500 rounded-full blur-[140px] opacity-30 animate-float-slow"></div>
      </div>

      {/* Font import */}
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Enriqueta:wght@400;500;600;700&display=swap');
        .font-enriqueta {
          font-family: 'Enriqueta', serif;
        }
        
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
        
        @keyframes float-slow {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        
        .animate-float {
          animation: float 8s ease-in-out infinite;
        }
        
        .animate-float-slow {
          animation: float-slow 12s ease-in-out infinite;
        }
      `}</style>

      {/* All sections */}
      <Navbar />
      <Hero />
      <AboutUs />
      <Timeline />
      <Gallery />
      <Team />
      <Footer />
    </div>
  );
};

export default Home;