import React, { useContext, useEffect, useRef, useState } from "react";
import { AdminDataContext } from "../context/AdminDataContext";

// TimelineItem Component
const TimelineItem = ({ item, index }) => {
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`relative flex flex-col sm:flex-row items-start sm:items-center justify-between mb-16 sm:mb-12 transition-all duration-700 ${
        index % 2 === 0 ? "sm:flex-row-reverse" : ""
      } ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
    >
      {/* Mobile: Numbered dot */}
      <div className="flex sm:hidden items-start w-full mb-4">
        <div className="w-8 h-8 bg-purple-800 rounded-full border-2 border-white shadow-lg flex items-center justify-center flex-shrink-0 mt-1">
          <span className="text-white text-xs font-bold font-enriqueta">
            {item.id}
          </span>
        </div>
        <div className="ml-4 flex-1">
          <div className="p-4 bg-white/10 backdrop-blur-md rounded-lg border border-white/10 transition-transform duration-300 hover:scale-105 hover:shadow-[0_0_25px_rgba(168,85,247,0.3)]">
            <div className="flex items-center mb-3">
              <img src={item.secure_url || item.icon} alt="icon" className="w-12 h-12 mr-3 p-0 object-contain" />
              <h3 className="text-lg font-semibold text-white font-enriqueta">{item.title}</h3>
            </div>
            <p className="text-sm text-purple-200 font-medium mb-3 font-enriqueta">{item.date}</p>
            <button className="bg-white cursor-pointer text-purple-700 px-4 py-2 rounded-lg font-semibold hover:bg-purple-100 transition-colors font-enriqueta">
              <a href={`/event/${item.id}`}>Learn More</a>
            </button>
          </div>
        </div>
      </div>

      {/* Desktop: Event Card */}
      <div className={`hidden sm:block w-5/12 ${index % 2 === 0 ? "sm:text-right" : "sm:text-left"}`}>
        <div className="relative">
          <div className="p-6 bg-white/10 backdrop-blur-md rounded-lg border border-white/10 relative z-10 transition-transform duration-300 hover:scale-105 hover:shadow-[0_0_25px_rgba(168,85,247,0.3)]">
            <div className="flex items-center mb-3">
              <img src={item.secure_url || item.icon} alt="icon" className="w-15 h-15 mr-3 p-0 object-contain" />
              <h3 className="text-xl font-semibold text-white font-enriqueta text-left">{item.title}</h3>
            </div>
            <p className="text-sm text-purple-200 font-medium mb-3 font-enriqueta text-left">{item.date}</p>
            <div className={`${index % 2 === 0 ? "sm:text-right" : "sm:text-left"}`}>
              <button className="bg-white text-purple-700 px-4 py-2 rounded-lg font-semibold hover:bg-purple-100 cursor-pointer transition-colors font-enriqueta text-base inline-block">
                <a href={`/event/${item.id}`}>Learn More</a>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Desktop: Spacer */}
      <div className="hidden sm:block w-5/12"></div>
    </div>
  );
};

// EventModal Component
const EventModal = ({ event, onClose }) => {
  const statusColors = {
    upcoming: "bg-yellow-500 text-black",
    ongoing: "bg-green-500 text-white",
    completed: "bg-gray-500 text-white",
  };

  return (
    <div className="fixed inset-0 bg-black/75 flex items-center justify-center z-50 p-4">
      <div className="bg-[#02020E] border-2 border-purple-500 rounded-xl max-w-md w-full p-4 sm:p-6 relative mx-2">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 sm:top-4 sm:right-4 text-white hover:text-purple-300 text-lg sm:text-xl"
        >
          ✕
        </button>
        <h3 className="text-xl sm:text-2xl font-bold text-white mb-3 sm:mb-4 font-enriqueta">{event.title}</h3>
        <div className="space-y-2 sm:space-y-3 text-purple-200 font-enriqueta text-sm sm:text-base">
          <p><span className="font-semibold">Date:</span> {event.date}</p>
          <p><span className="font-semibold">Time:</span> {event.time}</p>
          <p><span className="font-semibold">Venue:</span> {event.venue}</p>
          <p><span className="font-semibold">Description:</span> {event.description}</p>
          <p className="flex items-center">
            <span className="font-semibold">Status:</span>
            <span className={`ml-2 px-2 py-1 rounded-full text-xs ${statusColors[event.status]}`}>
              {event.status.charAt(0).toUpperCase() + event.status.slice(1)}
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

// Main Timeline Component
const Timeline = () => {
  const { events, fetchAll, loading } = useContext(AdminDataContext);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [timelineData, setTimelineData] = useState([]);

  // Fetch events on mount
  useEffect(() => {
    fetchAll();
  }, []);

  // Update local timelineData whenever context events change
  useEffect(() => {
    if (events?.length) {
      // Optional: sort by status or date
      const sortedEvents = [...events].sort((a, b) => {
        const order = { upcoming: 1, ongoing: 2, completed: 3 };
        return (order[a.status] || 3) - (order[b.status] || 3);
      });
      setTimelineData(sortedEvents);
    }
  }, [events]);

  return (
    <section id="timeline" className="min-h-screen py-8 sm:py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto relative z-10">
        <h1 className="text-2xl sm:text-3xl font-bold text-center text-white mb-2 font-enriqueta">
          Event Schedule & Timeline
        </h1>
        <p className="text-base sm:text-lg text-center text-purple-200 mb-8 sm:mb-12 font-enriqueta px-4">
          Follow our journey from establishment to innovation
        </p>

        {loading ? (
          <p className="text-center text-white">Loading events...</p>
        ) : (
          <div className="relative">
            {/* Desktop: Center vertical line */}
            <div className="hidden sm:block absolute left-1/2 transform -translate-x-1/2 w-1 bg-white opacity-60 h-full"></div>
            {/* Mobile: Left vertical line */}
            <div className="sm:hidden absolute left-4 w-0.5 bg-white opacity-60 h-full"></div>

            {timelineData.map((item, i) => (
              <TimelineItem key={item.id} item={item} index={i} />
            ))}
          </div>
        )}
      </div>

      {selectedEvent && (
        <EventModal event={selectedEvent} onClose={() => setSelectedEvent(null)} />
      )}
    </section>
  );
};

export default Timeline;
