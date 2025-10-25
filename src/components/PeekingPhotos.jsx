import { useEffect, useState } from 'react'
import { getRandomIntegers } from '../utils/math';

const PeekingPhotos = ({ data, onClick }) => {
    const [displayImages, setDisplayImages] = useState([]);
    const [rotations, setRotations] = useState([]);
    
    const imageCount = 3;

    useEffect(() => {
        if (!data || data.length < imageCount) return;

        const selectedImages = getDisplayImages();
        const selectedRotations = getRandomRotations();

        setRotations(selectedRotations);
        setDisplayImages(selectedImages);
    }, []);

    const handleClickImage = () => {
        onClick();
    }

    const getDisplayImages = () => {
        const numbers = getRandomIntegers(0, data.length - 1, imageCount);
        const temp = [];
        
        for (let i = 0; i < imageCount; i++){
            temp.push(data[numbers[i]]);
        }

        return temp;
    }

    const getRandomRotations = () => {
        const numbers = getRandomIntegers(0, 7, imageCount);
        return numbers;
    }  

  return (
    <div className='sm:hidden max-w-[90%] h-80 border border-red-400 mt-8  relative' onClick={handleClickImage}>
        {
            displayImages.map((image, index) => {
                return (
                    <div className='absolute' key={index}>
                        <img
                         className='w-full h-full' 
                         src={image.src} 
                         alt={image.description} 
                         style={{ transform: `rotate(${rotations[index]}deg)` }}                            
                        />
                    </div>
                )
            })
        }
    </div>
  )
}

export default PeekingPhotos