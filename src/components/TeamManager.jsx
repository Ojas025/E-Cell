import React, { useState, useEffect } from "react";
import { useAdminData } from "../context/AdminDataContext";

const empty = {
  name: "",
  file: null, // store file here temporarily
  email: "",
  linkedin: "",
  role: "",
  bio: "",
  github: "",
};

const TeamManager = () => {
  const { team, addMember, editMember, deleteMember } = useAdminData();
  const [form, setForm] = useState(empty);
  const [editingId, setEditingId] = useState(null);
  const [preview, setPreview] = useState(null);

  useEffect(() => {
    if (editingId) {
      const member = team.find((m) => m.id === editingId);
      setForm(member ? { ...member, file: null } : empty);
      setPreview(member?.secure_url || null); // use secure_url
    } else {
      setForm(empty);
      setPreview(null);
    }
  }, [editingId, team]);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setForm((s) => ({ ...s, file }));
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        await editMember(editingId, form, form.file); // pass file separately
        setEditingId(null);
      } else {
        if (!form.file) throw new Error("Please select an image file");
        await addMember(form, form.file);
      }
      setForm(empty);
      setPreview(null);
    } catch (error) {
      console.error("Error saving member:", error);
      alert("Failed to save member. See console for details.");
    }
  };

  const handleDelete = (id) => {
    if (confirm("Delete this member?")) deleteMember(id);
  };

  return (
    <div className="p-4 bg-white text-black border border-black rounded-sm">
      <div className="flex justify-between items-center mb-4 border-b border-black pb-2">
        <h2 className="text-2xl font-semibold">Team Members</h2>
      </div>

      <form onSubmit={handleSubmit} className="mb-6 grid grid-cols-1 md:grid-cols-3 gap-3">
        <input
          required
          placeholder="Name"
          value={form.name}
          onChange={(e) => setForm((s) => ({ ...s, name: e.target.value }))}
          className="p-2 border border-black rounded-sm col-span-1"
        />
        <input
          placeholder="Role"
          value={form.role}
          onChange={(e) => setForm((s) => ({ ...s, role: e.target.value }))}
          className="p-2 border border-black rounded-sm col-span-1"
        />
        <div className="col-span-1 flex flex-col">
          <input type="file" accept="image/*" onChange={handleFileChange} className="p-2 border border-black rounded-sm" />
          {preview && <img src={preview} alt="Preview" className="mt-2 w-24 h-24 rounded-full object-cover" />}
        </div>
        <input
          placeholder="Email"
          value={form.email}
          onChange={(e) => setForm((s) => ({ ...s, email: e.target.value }))}
          className="p-2 border border-black rounded-sm"
        />
        <input
          placeholder="LinkedIn"
          value={form.linkedin}
          onChange={(e) => setForm((s) => ({ ...s, linkedin: e.target.value }))}
          className="p-2 border border-black rounded-sm"
        />
        <input
          placeholder="GitHub"
          value={form.github}
          onChange={(e) => setForm((s) => ({ ...s, github: e.target.value }))}
          className="p-2 border border-black rounded-sm"
        />
        <textarea
          placeholder="Bio"
          value={form.bio}
          onChange={(e) => setForm((s) => ({ ...s, bio: e.target.value }))}
          className="p-2 border border-black rounded-sm col-span-1 md:col-span-3"
        />
        <div className="col-span-1 md:col-span-3 flex gap-2">
          <button
            type="submit"
            className="px-3 py-1 bg-green-700 hover:bg-green-800 duration-150 rounded-sm text-white font-semibold"
          >
            {editingId ? "Save" : "Add Member"}
          </button>
          {editingId && (
            <button
              type="button"
              onClick={() => { setEditingId(null); setForm(empty); setPreview(null); }}
              className="px-3 py-1 bg-gray-300 hover:bg-gray-400 duration-150 rounded-sm text-black font-semibold"
            >
              Cancel
            </button>
          )}
        </div>
      </form>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {team.length === 0 && <p className="text-gray-600">No team members yet.</p>}
        {team.map((m) => (
          <div key={m.id} className="border border-black rounded-sm p-3 flex flex-col items-center text-center">
            <img
              src={m.secure_url || "https://via.placeholder.com/120"} // use secure_url
              alt={m.name}
              className="w-24 h-24 rounded-full object-cover"
            />
            <h3 className="mt-2 font-semibold">{m.name}</h3>
            <p className="text-sm text-gray-700">{m.role}</p>
            <p className="text-sm text-gray-600 mt-2">{m.bio}</p>
            <div className="mt-3 flex gap-2">
              <button
                onClick={() => setEditingId(m.id)}
                className="px-2 py-1 bg-green-700 hover:bg-green-800 duration-150 rounded-sm text-white text-sm font-semibold"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(m.id)}
                className="px-2 py-1 bg-red-700 hover:bg-red-800 duration-150 rounded-sm text-white text-sm font-semibold"
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

export default TeamManager;
