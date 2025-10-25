import React from 'react'

const PopUpButton = ({ text }) => {
  return (
    <div className='relative w-max text-xl text-white'>
        <div className='w-full h-full border-r-8 border-b-8 border-[#6b0098] absolute top-[8px] left-2 pointer-events-none'></div>
    <div className='w-max px-6 py-3 bg-[#6b0098]  font-semibold font-mono transition-transform hover:translate-x-2 duration-150 hover:translate-y-2 cursor-pointer'>
        {text}
    </div>
    </div>  
  )
}

export default PopUpButton;
