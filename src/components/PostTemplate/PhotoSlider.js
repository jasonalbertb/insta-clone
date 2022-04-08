import React, {useState} from 'react'
import {FaChevronCircleLeft, FaChevronCircleRight} from "react-icons/fa";

export const PhotoSlider = ({content=[]}) => {
  let [index, setIndex] = useState(0);

  const disableLeft = index <= 0;
  const disableRight = index >= content.length -1;
  const handleNext = ()=>{
    if (index < content.length-1) {
      setIndex(index+ 1)
    }else{
      setIndex(content.length-1);
    }
  }
  
  const handlePrev = ()=>{
    if (index <= 0) {
      setIndex(0)
    } else {
      setIndex(index-1);
    }
  }

  return (
    <div className='relative w-full h-80'>
      <FaChevronCircleLeft
        onClick={handlePrev}
        className={`${disableLeft? "hidden" : "block"} cursor-pointer absolute top-1/2 translate-y-[-50%] left-2 h-6 w-6 block text-white opacity-70 z-1`}
      />
      <img
        src={content[index]} alt="image_viewer"
        className='absolute top-0 left-0 w-full h-full object-cover object-center transition-all ease-linear'
      />

      {/* bug */}
      {/* {content.map((item, i)=>{
        return <img key={i}
          src={item} alt={"test"} 
          className={`absolute top-0 left-0 w-full h-full object-cover object-center transition-all ease-linear ${index === i? "translate-x-0" : index > i? "translate-x-[-100%]" : "translate-x-[100%]"}` }/>
      })} */}
      
      <FaChevronCircleRight  
        onClick={handleNext}
        className={`${disableRight? "hidden" : "block"} cursor-pointer absolute top-1/2 translate-y-[-50%] right-2 h-6 w-6 block text-white opacity-70 z-1`}
      />
    </div>
  )
}
