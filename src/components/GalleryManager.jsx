import React, { useState, useEffect } from "react";
import { useAdminData } from "../context/AdminDataContext";

const empty = { title: "", description: "", file: null };

const GalleryManager = () => {
  const { gallery, addImage, editImage, deleteImage } = useAdminData();
  const [form, setForm] = useState(empty);
  const [editingId, setEditingId] = useState(null);

  // Load data into form when editing
  useEffect(() => {
    if (editingId) {
      const g = gallery.find((x) => x.id === editingId);
      setForm(g ? { ...g, file: null } : empty);
    } else setForm(empty);
  }, [editingId, gallery]);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (editingId) {
        // Editing: file is optional
        await editImage(
          editingId,
          {
            title: form.title,
            description: form.description,
          },
          form.file || null
        );
        setEditingId(null);
      } else {
        // Adding new image requires a file
        if (!form.file) throw new Error("Please select a file to upload");

        await addImage({
          title: form.title,
          description: form.description,
          file: form.file,
        });
      }

      setForm(empty);
    } catch (error) {
      console.error("Error uploading image:", error?.message || error);
      alert("Failed to upload image. See console for details.");
    }
  };

  const handleDelete = (id) => {
    if (confirm("Delete this image?")) deleteImage(id);
  };

  return (
    <div className="p-4 bg-white text-black border border-black rounded-sm">
      <div className="flex justify-between items-center mb-4 border-b border-black pb-2">
        <h2 className="text-2xl font-semibold">Gallery</h2>
      </div>

      <form
        onSubmit={handleSubmit}
        className="mb-6 grid grid-cols-1 md:grid-cols-2 gap-3"
      >
        <input
          placeholder="Title (optional)"
          value={form.title}
          onChange={(e) => setForm((s) => ({ ...s, title: e.target.value }))}
          className="p-2 border border-black rounded-sm"
        />
        <input
          type="file"
          accept="image/*"
          required={!editingId} // required only when adding
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (!file) {
              console.warn("No file selected");
              setForm((s) => ({ ...s, file: null }));
              return;
            }
            console.log("File selected:", file.name, file.size, file.type);
            setForm((s) => ({ ...s, file }));
          }}
          className="p-2 border border-black rounded-sm col-span-1 md:col-span-2"
        />
        <textarea
          placeholder="Description"
          value={form.description}
          onChange={(e) =>
            setForm((s) => ({ ...s, description: e.target.value }))
          }
          className="p-2 border border-black rounded-sm col-span-1 md:col-span-2"
        />
        <div className="col-span-1 md:col-span-2 flex gap-2">
          <button
            type="submit"
            className="px-3 py-1 bg-green-700 hover:bg-green-800 duration-150 rounded-sm text-white font-semibold"
          >
            {editingId ? "Save" : "Add Image"}
          </button>
          {editingId && (
            <button
              type="button"
              onClick={() => {
                setEditingId(null);
                setForm(empty);
              }}
              className="px-3 py-1 bg-gray-300 hover:bg-gray-400 duration-150 rounded-sm text-black font-semibold"
            >
              Cancel
            </button>
          )}
        </div>
      </form>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {gallery.length === 0 && (
          <p className="text-gray-600">No gallery images yet.</p>
        )}
        {gallery.map((g) => (
          <div
            key={g.id}
            className="border border-black rounded-sm overflow-hidden"
          >
            <img
              src={g.secure_url}
              alt={g.title || "gallery"}
              className="w-full h-44 object-cover"
            />
            <div className="p-3">
              <h3 className="font-semibold">{g.title || "Untitled"}</h3>
              <p className="text-sm text-gray-700">{g.description}</p>
              <div className="mt-2 flex gap-2">
                <button
                  onClick={() => setEditingId(g.id)}
                  className="px-2 py-1 bg-green-700 hover:bg-green-800 duration-150 rounded-sm text-white text-sm font-semibold"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(g.id)}
                  className="px-2 py-1 bg-red-700 hover:bg-red-800 duration-150 rounded-sm text-white text-sm font-semibold"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GalleryManager;
