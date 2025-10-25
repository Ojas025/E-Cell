const AdminTabs = ({ tabs, active, setActive }) => {
  return (
    <div className="flex gap-2 items-center border-b border-gray-700 pb-2">
      {tabs.map((t) => (
        <button
          key={t}
          onClick={() => setActive(t)}
          className={`px-3 py-1 rounded-t-md font-medium ${
            active === t ? "bg-white text-black" : "text-gray-400 hover:text-gray-900"
          }`}
        >
          {t}
        </button>
      ))}
    </div>
  );
};

export default AdminTabs;