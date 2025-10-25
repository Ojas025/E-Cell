import React, { useState } from "react";
import { UserAuth } from "../context/AuthContext";
import { NavLink, useNavigate } from "react-router";
import AdminTabs from "../components/AdminTabs";
import EventsManager from "../components/EventsManager";
import GalleryManager from "../components/GalleryManager";
import TeamManager from "../components/TeamManager";

const AdminDashboard = () => {
  const { session, logOut } = UserAuth();
  const navigate = useNavigate();
  const [active, setActive] = useState("Events");

  // console.log(session);

  const handleLogOut = async (e) => {
    e.preventDefault();
    try {
      await logOut();
      navigate("/admin/login");
    } catch (error) {
      console.error("Error occured", error);
    }
  };

  if (!session) {
    navigate("/");
    return;
  }

  const tabs = ["Events", "Gallery", "Team"];

  return (
    <div className="p-6 min-h-screen bg-white text-black">
      <header className="flex justify-between items-center mb-6 border-b border-black pb-3">
        <div>
          <h1 className="text-3xl font-semibold">Admin Dashboard</h1>
          <p className="text-sm font-semibold text-gray-700">
            Welcome, {session?.user?.email || "Admin"}
          </p>
        </div>
        <div className="flex gap-3">
          <NavLink
            to={'/'}
            className="bg-slate-900 hover:bg-slate-800 duration-150 rounded-sm text-sky-300 text-sm px-4 py-1 font-semibold"
          >
            Home
          </NavLink>
          <button
            onClick={handleLogOut}
            className="bg-red-700 cursor-pointer hover:bg-red-800 duration-150 rounded-sm text-white text-sm px-4 py-1 font-semibold"
          >
            Log out
          </button>
        </div>
      </header>

      <div className="border border-black rounded-sm p-4">
        <AdminTabs tabs={tabs} active={active} setActive={setActive} />

        <div className="mt-6">
          {active === "Events" && <EventsManager />}
          {active === "Gallery" && <GalleryManager />}
          {active === "Team" && <TeamManager />}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
