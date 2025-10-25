import { useParams, useNavigate } from "react-router";
import { useAdminData } from "../context/AdminDataContext";

const Event = () => {
  const { id } = useParams();
const navigate = useNavigate();
  const events = useAdminData().events;

  console.log(events);
  const event = events.find((e) => e.id === parseInt(id));

  if (!event) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-[#12001b] to-[#1c0026] text-pink-200">
        <p className="text-2xl font-semibold mb-4">Event not found</p>
        <button
          onClick={() => navigate(-1)}
          className="px-4 py-2 bg-pink-600 hover:bg-pink-700 rounded-lg text-white transition"
        >
          Go Back
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#12001b] via-[#180020] to-[#1c0026] text-pink-100 p-6">
      <div className="max-w-4xl mx-auto bg-[#1a0022]/70 backdrop-blur-lg p-8 rounded-2xl shadow-lg border border-pink-500/30">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            {event.icon && (
              <img
                src={event.icon}
                alt="icon"
                className="w-14 h-14 object-cover rounded-full border-2 border-pink-400"
              />
            )}
            <div>
              <h1 className="text-3xl font-bold text-pink-300">{event.title}</h1>
              <p className="text-sm text-pink-400">{event.status}</p>
            </div>
          </div>
          <button
            onClick={() => navigate(-1)}
            className="px-3 py-1.5 bg-pink-600 hover:bg-pink-700 text-white rounded-lg text-sm transition"
          >
            Back
          </button>
        </div>

        {/* Details */}
        <div className="space-y-2 mb-6 text-pink-200">
          <p>
            <span className="font-semibold text-pink-300">📅 Date:</span>{" "}
            {event.date}
          </p>
          <p>
            <span className="font-semibold text-pink-300">⏰ Time:</span>{" "}
            {event.time}
          </p>
          <p>
            <span className="font-semibold text-pink-300">📍 Venue:</span>{" "}
            {event.venue}
          </p>
          <p className="mt-4 leading-relaxed">
            <span className="font-semibold text-pink-300">About:</span> <br />
            {event.description}
          </p>
        </div>

        {/* Embedded Form */}
        {event.formEmbedLink && (
          <div className="mt-8">
            <h2 className="text-2xl font-semibold text-pink-300 mb-3">
              Register for this Event
            </h2>
            <iframe
              src={event.formEmbedLink}
              title="Registration Form"
              className="w-full h-[600px] rounded-xl border-2 border-pink-400/40"
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default Event;
