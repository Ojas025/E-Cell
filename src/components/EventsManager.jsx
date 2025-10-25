import { useState, useEffect } from "react";
import { useAdminData } from "../context/AdminDataContext";

const emptyForm = {
  title: "",
  date: "",
  time: "",
  venue: "",
  description: "",
  icon: "",
  status: "upcoming",
  formEmbed: "",
  file: null, // temporary file for upload
};

const EventsManager = () => {
  const { events, addEvent, editEvent, deleteEvent } = useAdminData();
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState(emptyForm);
  const [filter, setFilter] = useState("all");
  const [preview, setPreview] = useState(null);

  useEffect(() => {
    if (editingId) {
      const e = events.find((ev) => ev.id === editingId);
      if (e) {
        setForm({ ...e, file: null });
        setPreview(e.secure_url || null);
      }
    } else {
      setForm(emptyForm);
      setPreview(null);
    }
  }, [editingId, events]);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setForm((s) => ({ ...s, file }));
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = { ...form };
    delete payload.file; // file handled separately

    try {
      if (editingId) {
        await editEvent(editingId, payload, form.file);
        setEditingId(null);
      } else {
        await addEvent(payload, form.file);
      }
      setForm(emptyForm);
      setPreview(null);
    } catch (error) {
      console.error("Error saving event:", error.message);
      alert("Failed to save event. See console for details.");
    }
  };

  const handleEdit = (id) => setEditingId(id);
  const handleDelete = (id) => {
    if (confirm("Delete this event?")) deleteEvent(id);
  };

  const visible = events.filter((ev) => (filter === "all" ? true : ev.status === filter));

  return (
    <div className="p-4 bg-white text-black">
      <div className="flex justify-between items-center mb-6 border-b border-black pb-2">
        <h2 className="text-2xl font-semibold">Events</h2>
        <div>
          <label htmlFor="filter" className="mr-2 text-sm font-semibold">Filter:</label>
          <select
            id="filter"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="border border-black px-2 py-1 text-black font-semibold"
          >
            <option value="all">All</option>
            <option value="upcoming">Upcoming</option>
            <option value="past">Past</option>
            <option value="cancelled">Cancelled</option>
          </select>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="mb-8 grid grid-cols-1 md:grid-cols-2 gap-4">
        <input
          required
          placeholder="Title"
          value={form.title}
          onChange={(e) => setForm((s) => ({ ...s, title: e.target.value }))}
          className="border border-black px-3 py-2 font-semibold"
        />
        <input
          type="date"
          value={form.date}
          onChange={(e) => setForm((s) => ({ ...s, date: e.target.value }))}
          className="border border-black px-3 py-2 font-semibold"
        />
        <input
          placeholder="Time (e.g., 2:00 PM - 5:00 PM)"
          value={form.time}
          onChange={(e) => setForm((s) => ({ ...s, time: e.target.value }))}
          className="border border-black px-3 py-2 font-semibold"
        />
        <input
          placeholder="Venue"
          value={form.venue}
          onChange={(e) => setForm((s) => ({ ...s, venue: e.target.value }))}
          className="border border-black px-3 py-2 font-semibold"
        />
        <select
          value={form.status}
          onChange={(e) => setForm((s) => ({ ...s, status: e.target.value }))}
          className="border border-black px-3 py-2 font-semibold"
        >
          <option value="upcoming">upcoming</option>
          <option value="past">past</option>
          <option value="cancelled">cancelled</option>
        </select>

        <div className="col-span-1 md:col-span-2 flex flex-col">
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="border border-black px-3 py-2 font-semibold"
          />
          {preview && (
            <img
              src={preview}
              alt="Preview"
              className="mt-2 max-h-48 object-cover"
            />
          )}
        </div>

        <textarea
          placeholder="Description"
          value={form.description}
          onChange={(e) => setForm((s) => ({ ...s, description: e.target.value }))}
          className="border border-black px-3 py-2 font-semibold col-span-1 md:col-span-2 resize-none"
          rows={3}
        />
        <input
          placeholder="Google form embed URL (optional)"
          value={form.formEmbed}
          onChange={(e) => setForm((s) => ({ ...s, formEmbed: e.target.value }))}
          className="border border-black px-3 py-2 font-semibold col-span-1 md:col-span-2"
        />
        <div className="col-span-1 md:col-span-2 flex gap-4">
          <button
            type="submit"
            className="px-4 py-2 bg-green-700 text-white font-semibold hover:bg-green-800"
          >
            {editingId ? "Save changes" : "Add event"}
          </button>
          {editingId && (
            <button
              type="button"
              onClick={() => {
                setEditingId(null);
                setForm(emptyForm);
                setPreview(null);
              }}
              className="px-4 py-2 bg-red-700 text-white font-semibold hover:bg-red-800"
            >
              Cancel
            </button>
          )}
        </div>
      </form>

      <div className="space-y-4">
        {visible.length === 0 && <p className="text-gray-700 font-semibold">No events yet.</p>}
        {visible.map((ev) => (
          <div
            key={ev.id}
            className="p-4 border border-black grid grid-cols-1 md:grid-cols-2 gap-4"
          >
            <div>
              <h3 className="font-semibold text-lg">{ev.title}</h3>
              <p className="text-sm">{ev.date} • {ev.time}</p>
              <p className="text-sm">Venue: {ev.venue}</p>
              {ev.secure_url && ( // use secure_url instead of image_url
                <img src={ev.secure_url} alt={ev.title} className="mt-2 max-h-48 object-cover" />
              )}
              <p className="mt-2 text-sm">{ev.description}</p>
            </div>
            <div className="flex flex-col items-start gap-2 md:items-end">
              <button
                onClick={() => handleEdit(ev.id)}
                className="px-3 py-1 bg-green-700 text-white font-semibold hover:bg-green-800"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(ev.id)}
                className="px-3 py-1 bg-red-700 text-white font-semibold hover:bg-red-800"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EventsManager;
