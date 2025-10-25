import "yet-another-react-lightbox/styles.css";
import "yet-another-react-lightbox/plugins/captions.css";
import GalleryHero from "./GalleryHero";
import ImageGrid from "./ImageGrid";
import { useState, useContext } from "react";
import { Captions, Fullscreen } from "yet-another-react-lightbox/plugins";
import Lightbox from "yet-another-react-lightbox";
import { AdminDataContext } from "../context/AdminDataContext";

const Gallery = () => {
  const { gallery } = useContext(AdminDataContext);
  const [index, setIndex] = useState(-1);

  const slides = gallery.map((img) => ({
    src: img.secure_url,
    title: img.title,
    description: img.description,
  }));

  return (
    <div className="scroll-smooth relative font-enriqueta" id="gallery">
      <div className="absolute right-[16%] w-10 sm:w-14 md:w-18 top-1/2 -translate-y-1/2 h-[80%] flex justify-between">
        <div className="h-full w-1/4 bg-[#ecbfff]"></div>
        <div className="h-full w-2/4 bg-[#ecbfff]"></div>
      </div>

      <GalleryHero />
      <ImageGrid onClick={(currentIndex) => setIndex(currentIndex)} />

      <Lightbox
        slides={slides}
        captions={{
          descriptionTextAlign: "center",
        }}
        plugins={[Captions, Fullscreen]}
        index={index}
        open={index >= 0}
        close={() => setIndex(-1)}
      />
    </div>
  );
};

export default Gallery;
