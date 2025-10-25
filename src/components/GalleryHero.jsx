import PopUpButton from "./PopUpButton"

const GalleryHero = () => {
  return (
    <div className="font-enriqueta bg-gradient-to-t from-[#34004a] to-black min-h-screen text-white flex items-center">
      {/* Heading Section */}
      <div className="w-full h-full px-6 sm:px-12 md:px-24 flex flex-col justify-between">
        {/* Heading + Sub-heading */}
        <div className="w-full flex-grow flex flex-col items-start justify-center gap-2">
          <h2 className="text-start relative font-bold text-4xl sm:text-6xl md:text-7xl  text-white w-max uppercase">
            Photo Gallery
            <span className="absolute left-2 bottom-[-4px] h-1 w-2/3 bg-white"></span>
          </h2>

          <p className="text-gray-100/80 text-sm sm:text-2xl">
            Visualizing Innovation.
          </p>
        </div>

        {/* Button */}
        <div className="mt-16 px-8 flex justify-center py-2 sm:justify-start">
            <a href="#images">
            <PopUpButton text={"Explore"} />
            </a>
        </div>
      </div>
    </div>
  )
}

export default GalleryHero