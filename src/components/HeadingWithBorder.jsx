import React from 'react'

const HeadingWithBorder = ({heading}) => {
  return (
    <div className='w-full h-[40vh] border border-red-400 py-2 flex items-center px-8'>
        <h2 className='relative md:text-6xl sm:text-5xl text-3xl text-white font-bold'>
          {heading}
          <span className='heading absolute bottom-[-0.5rem] left-0 h-1.5 w-2/3 bg-white'></span>
        </h2>
    </div>
  )
}

export default HeadingWithBorder