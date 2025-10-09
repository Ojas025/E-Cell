import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";

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
        src={person.image}
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
  // Coordinators
  const coordinators = [
    { id: 1, name: "Pratham Amritkar", role: "Overall Coordinator", image: "team/pratham.png", email: "pratham@ecell.com", linkedin: "https://linkedin.com/in/pratham" },
    { id: 2, name: "Sanket Lohakare", role: "Overall Coordinator", image: "team/sanket.png", email: "sanket@ecell.com", linkedin: "https://linkedin.com/in/sanket" },
  ];

  // Teams
  const teamMembersByRole = [
    {
      role: "Corporate Relations",
      members: [
        { id: 3, name: "Harshalee Malu", image: "team/harshalee.jpg", email: "harshaleemalu03@gmail.com", linkedin: "https://www.linkedin.com/in/harshalee-malu" },
        { id: 4, name: "Triveni Jadhav", image: "team/triveni.jpg", email: "tj8726@gmail.com", linkedin: "https://www.linkedin.com/in/triveni-jadhav-566725293" },
        { id: 5, name: "Bhakti Ghadage", image: "team/bhakti.jpg", email: "bhaktighadage8@gmail.com", linkedin: "https://www.linkedin.com/in/bhakti-ghadage-099279306" },
      ],
    },
    {
      role: "Design & Branding",
      members: [
        { id: 6, name: "Piyush Bodele", image: "team/piyush.png", email: "piyush@ecell.com", linkedin: "https://linkedin.com/in/piyush" },
        { id: 7, name: "Swaraj Ambawade", image: "team/swaraj.png", email: "swaraj@ecell.com", linkedin: "https://linkedin.com/in/swaraj" },
        { id: 8, name: "Maheshwari Gaikwad", image: "team/maheshwari.jpg", email: "maheshwari@ecell.com", linkedin: "https://linkedin.com/in/maheshwari" },
      ],
    },
    {
      role: "Events & PR",
      members: [
        { id: 9, name: "Roshani Jadhav", image: "team/roshani.jpg", email: "roshanij209@gmail.com", linkedin: "https://www.linkedin.com/in/roshani-jadhav-879a8a317 " },
        { id: 10, name: "Srushti Holkar", image: "team/srushti.jpg", email: "holkarsrushti1@gmail.com", linkedin: "https://www.linkedin.com/in/srushti-holkar-1884602b3 " },
        { id: 11, name: "Neel Doshi", image: "team/neel_doshi.png", email: "neel@ecell.com", linkedin: "https://linkedin.com/in/neel" },
        { id: 12, name: "Indranil Jadhav", image: "team/indranil_jadhav.png", email: "indranil@ecell.com", linkedin: "https://linkedin.com/in/indranil" },
      ],
    },
    {
      role: "Hospitality & PR",
      members: [
        { id: 13, name: "Yash Bhati", image: "team/yash_bhati.png", email: "yash@ecell.com", linkedin: "https://linkedin.com/in/yash" },
        { id: 14, name: "Megh Gaidhani", image: "team/megh.png", email: "megh@ecell.com", linkedin: "https://linkedin.com/in/megh" },
      ],
    },
    {
      role: "Media & Marketing",
      members: [
        { id: 15, name: "Ajay Bodkhe", image: "team/ajay.png", email: "ajay@ecell.com", linkedin: "" },
        { id: 16, name: "Balaji Alli", image: "team/balaji.png", email: "balaji@ecell.com", linkedin: "https://linkedin.com/in/balaji" },
      ],
    },
    {
      role: "Research & Analysis",
      members: [
        { id: 17, name: "Yash Bhalodiya", image: "team/yash_bhalodiya.png", email: "yashb@ecell.com", linkedin: "https://linkedin.com/in/yashb" },
        { id: 18, name: "Farhan Ansari", image: "team/farhan.png", email: "farhan@ecell.com", linkedin: "https://linkedin.com/in/farhan" },
      ],
    },
    {
      role: "Web & Tech",
      members: [
        { id: 19, name: "Ojas Deshpande", image: "team/ojas.png", email: "ojasd025@gmail.com", linkedin: "https://www.linkedin.com/in/deshpande-ojas/" },
        { id: 20, name: "Samidha Dhawale", image: "team/samidha.jpg", email: "samidhadd21@gmail.com", linkedin: "https://www.linkedin.com/in/samidha-dhawale-4713b9286/" },
        { id: 21, name: "Sahil Agarwal", image: "team/sahil.png", email: "sahil@ecell.com", linkedin: "https://linkedin.com/in/sahil" },
      ],
    },
  ];

  const allPeople = [
    ...coordinators,
    ...teamMembersByRole.flatMap((group) =>
      group.members.map((m) => ({ ...m, role: group.role }))
    ),
  ];

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

        <Swiper
          modules={[Autoplay]}
          slidesPerView={1.2}
          spaceBetween={15}
          loop={true}
          centeredSlides={true}
          autoplay={{ delay: 2500, disableOnInteraction: false }}
          breakpoints={{
            480: { 
              slidesPerView: 1,
              spaceBetween: 15,
              centeredSlides: true
            },
            640: { 
              slidesPerView: 2,
              spaceBetween: 20,
              centeredSlides: false
            },
            768: { 
              slidesPerView: 3,
              spaceBetween: 20,
              centeredSlides: false
            }, 
            1024: { 
              slidesPerView: 4,
              spaceBetween: 20,
              centeredSlides: false
            },
          }}
          className="mx-auto max-w-6xl !px-4 sm:!px-0"
        >
          {allPeople.map((p) => (
            <SwiperSlide key={p.id} className="flex justify-center !h-auto">
              <TeamCard person={p} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default Team;