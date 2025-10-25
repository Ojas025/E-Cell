import { useEffect, useState } from "react";
import { AdminDataContext } from "./AdminDataContext";
import { supabase } from "../utils/supabase";

export const AdminDataProvider = ({ children }) => {
  const [events, setEvents] = useState([]);
  const [gallery, setGallery] = useState([]);
  const [team, setTeam] = useState([]);
  const [loading, setLoading] = useState(false);

  // ---------- FETCH ALL ----------
  useEffect(() => {
    fetchAll();
  }, []);

  const fetchAll = async () => {
    setLoading(true);
    try {
      const [eventsRes, galleryRes, teamRes] = await Promise.all([
        supabase.from("Events").select("*").order("id", { ascending: false }),
        supabase.from("Images").select("*").order("id", { ascending: false }),
        supabase.from("Members").select("*").order("id", { ascending: false }),
      ]);

      if (eventsRes.error) throw eventsRes.error;
      if (galleryRes.error) throw galleryRes.error;
      if (teamRes.error) throw teamRes.error;

      setEvents(eventsRes.data);
      setGallery(galleryRes.data);
      setTeam(teamRes.data);
    } catch (error) {
      console.error("Error fetching data:", error.message);
    } finally {
      setLoading(false);
    }
  };

  // ---------- UPLOAD FILE HELPER ----------
  const uploadFile = async (file, folder) => {
  if (!file) {
    console.error("No file provided to uploadFile");
    return null;
  }

  // Ensure it's a proper File or Blob
  if (!(file instanceof File || file instanceof Blob)) {
    console.error("Invalid file type:", file);
    throw new Error("Invalid file type. Must be a File or Blob.");
  }

  // Clean filename
  const safeName = file.name.replace(/[^a-zA-Z0-9_.\-]/g, "_");
  const public_id = `${folder}/${Date.now()}_${safeName}`;

  console.log("Uploading file:", file.name, "as", public_id);

  const { data, error } = await supabase.storage
    .from("ecell-assets")
    .upload(public_id, file, {
      cacheControl: "3600",
      upsert: true, // allow overwrite for testing
      contentType: file.type || "application/octet-stream",
    });

  if (error) {
    console.error("Supabase storage upload error:", error);
    throw error;
  }

  const baseUrl = import.meta.env.VITE_SUPABASE_URL;
  const secure_url = `${baseUrl}/storage/v1/object/public/ecell-assets/${public_id}`;

  console.log("File uploaded successfully:", secure_url);

  return { public_id, secure_url };
};


  // ---------- EVENTS CRUD ----------
  const addEvent = async (event, file) => {
    try {
      let uploadData = { public_id: null, secure_url: null };
      if (file) uploadData = await uploadFile(file, "events");

      const { data, error } = await supabase
        .from("Events")
        .insert([{ ...event, ...uploadData }])
        .select()
        .single();

      if (error) throw error;

      setEvents((prev) => [data, ...prev]);
      return data;
    } catch (error) {
      console.error("Error adding event:", error.message);
    }
  };

  const editEvent = async (id, updated, newFile) => {
    try {
      let { public_id, secure_url } = updated;

      if (newFile) {
        const oldEvent = events.find((e) => e.id === id);
        if (oldEvent?.public_id) await supabase.storage.from("ecell-assets").remove([oldEvent.public_id]);

        const upload = await uploadFile(newFile, "events");
        public_id = upload.public_id;
        secure_url = upload.secure_url;
      }

      const { data, error } = await supabase
        .from("Events")
        .update({ ...updated, public_id, secure_url })
        .eq("id", id)
        .select()
        .single();

      if (error) throw error;

      setEvents((prev) => prev.map((e) => (e.id === id ? data : e)));
      return data;
    } catch (error) {
      console.error("Error updating event:", error.message);
    }
  };

  const deleteEvent = async (id) => {
    try {
      const event = events.find((e) => e.id === id);
      if (event?.public_id) await supabase.storage.from("ecell-assets").remove([event.public_id]);

      const { error } = await supabase.from("Events").delete().eq("id", id);
      if (error) throw error;

      setEvents((prev) => prev.filter((e) => e.id !== id));
    } catch (error) {
      console.error("Error deleting event:", error.message);
    }
  };

  // ---------- GALLERY CRUD ----------
  const addImage = async ({ title, description, file }) => {
    try {
      if (!file) throw new Error("No file provided");

      const { public_id, secure_url } = await uploadFile(file, "gallery");

      const { data, error } = await supabase
        .from("Images")
        .insert([{ title, description, public_id, secure_url }])
        .select()
        .single();

        console.log(data);
      if (error) throw error;

      setGallery((prev) => [data, ...prev]);
      return data;
    } catch (error) {
      console.error("Error adding image:", error.message);
    }
  };

  const editImage = async (id, updated, newFile) => {
    try {
      let { public_id, secure_url } = updated;

      if (newFile) {
        const oldImage = gallery.find((g) => g.id === id);
        if (oldImage?.public_id) await supabase.storage.from("ecell-assets").remove([oldImage.public_id]);

        const upload = await uploadFile(newFile, "gallery");
        public_id = upload.public_id;
        secure_url = upload.secure_url;
      }

      const { data, error } = await supabase
        .from("Images")
        .update({ ...updated, public_id, secure_url })
        .eq("id", id)
        .select()
        .single();

      if (error) throw error;

      setGallery((prev) => prev.map((g) => (g.id === id ? data : g)));
      return data;
    } catch (error) {
      console.error("Error updating image:", error.message);
    }
  };

  const deleteImage = async (id) => {
    try {
      const image = gallery.find((g) => g.id === id);
      if (image?.public_id) await supabase.storage.from("ecell-assets").remove([image.public_id]);

      const { error } = await supabase.from("Images").delete().eq("id", id);
      if (error) throw error;

      setGallery((prev) => prev.filter((g) => g.id !== id));
    } catch (error) {
      console.error("Error deleting image:", error.message);
    }
  };

  // ---------- TEAM CRUD ----------
  const addMember = async (member, file) => {
  try {
    let uploadData = { public_id: null, secure_url: null };
    if (file) uploadData = await uploadFile(file, "team");

    // Exclude 'file' property before inserting
    const { file: _ignored, ...memberData } = member;

    const { data, error } = await supabase
      .from("Members")
      .insert([{ ...memberData, ...uploadData }])
      .select()
      .single();

    if (error) throw error;

    setTeam((prev) => [data, ...prev]);
    return data;
  } catch (error) {
    console.error("Error adding member:", error.message);
  }
};

  const editMember = async (id, updated, newFile) => {
  try {
    let { public_id, secure_url, file: _ignored } = updated; // ignore file

    if (newFile) {
      const oldMember = team.find((m) => m.id === id);
      if (oldMember?.public_id)
        await supabase.storage.from("ecell-assets").remove([oldMember.public_id]);

      const upload = await uploadFile(newFile, "team");
      public_id = upload.public_id;
      secure_url = upload.secure_url;
    }

    const { file: __, ...dbUpdate } = updated; // remove 'file'
    const { data, error } = await supabase
      .from("Members")
      .update({ ...dbUpdate, public_id, secure_url })
      .eq("id", id)
      .select()
      .single();

    if (error) throw error;

    setTeam((prev) => prev.map((m) => (m.id === id ? data : m)));
    return data;
  } catch (error) {
    console.error("Error updating member:", error.message);
  }
};

  const deleteMember = async (id) => {
    try {
      const member = team.find((m) => m.id === id);
      if (member?.public_id) await supabase.storage.from("ecell-assets").remove([member.public_id]);

      const { error } = await supabase.from("Members").delete().eq("id", id);
      if (error) throw error;

      setTeam((prev) => prev.filter((m) => m.id !== id));
    } catch (error) {
      console.error("Error deleting member:", error.message);
    }
  };

  // ---------- CONTEXT VALUE ----------
  const value = {
    loading,
    events,
    addEvent,
    editEvent,
    deleteEvent,
    gallery,
    addImage,
    editImage,
    deleteImage,
    team,
    addMember,
    editMember,
    deleteMember,
    fetchAll,
  };

  return (
    <AdminDataContext.Provider value={value}>
      {children}
    </AdminDataContext.Provider>
  );
};
