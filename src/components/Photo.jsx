const Photo = ({ src, caption, angle }) => {

  return (
    <div className="relative mx-auto h-max border-2 border-black shadow-md shadow-black bg-black/40">
      <img
        src={src}
        alt={caption}
        style={{ transform: `rotate(${angle}deg)` }}
        className="w-full h-auto border-[10px] border-white cursor-pointer hover:scale-103 duration-300"
      />
      <p className="bg-yellow-200/90 w-full mt-2 p-1 font-semibold flex justify-center items-center text-xs sm:text-sm md:text-base absolute top-full left-0">
        {caption}
      </p>
    </div>
  );
};

export default Photo;
