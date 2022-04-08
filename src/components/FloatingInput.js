import React from 'react'

export const FloatingInput = ({value, onChange, type, classname="", label}) => {
  return (
    <div className={`floatingInput ${classname} border border-gray-300 relative`}>
        <input 
            className='w-full focus:outline-none pb-1 text-sm pt-4 px-2 appearance-none '
            value={value} onChange={onChange} type={type} placeholder=" " 
        />
        <label className='transition duration-200 ease-in-out absolute block transform top-2 left-2 pointer-events-none text-gray-400 origin-[0%]'>{label}</label>
    </div>
  )
}
