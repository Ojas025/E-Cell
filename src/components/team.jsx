import React, { useContext, useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import { AdminDataContext } from "../context/AdminDataContext";

// SocialLinks Component
const SocialLinks = ({ email, linkedin, size = "w-5 h-5" }) => (
  <div className="absolute inset-0 bg-[#02020E]/90 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center space-x-3">
    <a
      href={`mailto:${email}`}
      className="text-white p-2 bg-purple-600 rounded-full hover:bg-purple-700"
    >
      <svg className={size} fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 12.713l-11.985-9.713h23.97l-11.985 9.713zm0 2.574l-12-9.725v15.438h24v-15.438l-12 9.725z" />
      </svg>
    </a>
    {linkedin && (
      <a
        href={linkedin}
        target="_blank"
        rel="noopener noreferrer"
        className="text-white p-2 bg-purple-600 rounded-full hover:bg-purple-700"
      >
        <svg className={size} fill="currentColor" viewBox="0 0 24 24">
          <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
        </svg>
      </a>
    )}
  </div>
);

// TeamCard Component
const TeamCard = ({ person }) => (
  <div className="text-center flex flex-col items-center w-full">
    <div className="w-44 h-44 sm:w-52 sm:h-52 lg:w-60 lg:h-60 mb-3 sm:mb-4 overflow-hidden rounded-2xl relative group bg-[#02020E] shadow-lg mx-auto">
      <img
        src={person.secure_url || person.image} // use uploaded image if exists
        alt={person.name}
        className="w-full h-full object-cover scale-105 transition-transform duration-300 group-hover:scale-110"
      />
      <SocialLinks email={person.email} linkedin={person.linkedin} />
    </div>
    <h4 className="text-base sm:text-lg font-semibold text-white font-enriqueta px-2">
      {person.name}
    </h4>
    <p className="mt-1 text-purple-300 font-enriqueta text-xs sm:text-sm px-2">
      {person.role}
    </p>
  </div>
);

// Main Team Component
const Team = () => {
  const { team, loading, fetchAll } = useContext(AdminDataContext);
  const [teamData, setTeamData] = useState([]);

  // Fetch team on mount
  useEffect(() => {
    fetchAll(); // make sure context data is loaded
  }, []);

  // Update local state when context team changes
  useEffect(() => {
  if (team?.length) {
    // Sort by role alphabetically or based on custom priority
    const sorted = [...team].sort((a, b) => {
      const rolePriority = {
        "Overall Coordinator": 1,
        "Corporate Relations": 2,
        "Design & Branding": 3,
        "Events & PR": 4,
        "Hospitality & PR": 5,
        "Media & Marketing": 6,
        "Research & Analysis": 7,
        "Web & Tech": 8,
      };
      // fallback to alphabetical if role not found
      return (rolePriority[a.role] || 99) - (rolePriority[b.role] || 99);
    });

    setTeamData(sorted);
  }
}, [team]);

  return (
    <section className="py-12 sm:py-16 px-4 sm:px-6 lg:px-8 relative overflow-hidden" id="team">
      <div className="max-w-6xl mx-auto relative z-10">
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-3 sm:mb-4 font-enriqueta">
            Our Team
          </h2>
          <p className="text-base sm:text-xl text-purple-200 max-w-3xl mx-auto mb-6 sm:mb-8 font-enriqueta px-4">
            Contact us for any queries or ideas.
          </p>
        </div>

        {loading ? (
          <p className="text-center text-white">Loading team...</p>
        ) : (
          <Swiper
            modules={[Autoplay]}
            slidesPerView={1.2}
            spaceBetween={15}
            loop={true}
            centeredSlides={true}
            autoplay={{ delay: 2500, disableOnInteraction: false }}
            breakpoints={{
              480: { slidesPerView: 1, spaceBetween: 15, centeredSlides: true },
              640: { slidesPerView: 2, spaceBetween: 20, centeredSlides: false },
              768: { slidesPerView: 3, spaceBetween: 20, centeredSlides: false },
              1024: { slidesPerView: 4, spaceBetween: 20, centeredSlides: false },
            }}
            className="mx-auto max-w-6xl !px-4 sm:!px-0"
          >
            {teamData.map((person) => (
              <SwiperSlide key={person.id} className="flex justify-center !h-auto">
                <TeamCard person={person} />
              </SwiperSlide>
            ))}
          </Swiper>
        )}
      </div>
    </section>
  );
};

export default Team;
