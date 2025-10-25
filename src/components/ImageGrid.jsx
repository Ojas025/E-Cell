import { useContext } from "react";
import Photo from "./Photo";
import { AdminDataContext } from "../context/AdminDataContext";

const ImageGrid = ({ onClick }) => {
  const { gallery, loading } = useContext(AdminDataContext);

  const angles = [-3, 2, -1, 1, -3, -2];

  return (
    <div
      id="images"
      className="font-enriqueta w-full min-h-screen bg-gradient-to-b from-[#34004a] to-black grid grid-cols-1 sm:grid-cols-2 gap-24 p-6 pb-12"
    >
      {loading ? (
        <p className="text-white text-center col-span-full">Loading images...</p>
      ) : (
        gallery?.map((img, index) => (
          <div
            key={img.id}
            onClick={() => onClick(index)}
            className="cursor-pointer"
          >
            <Photo
              src={img.secure_url}
              caption={img.title || img.description || ""}
              angle={angles[index % angles.length]}
            />
          </div>
        ))
      )}
    </div>
  );
};

export default ImageGrid;
