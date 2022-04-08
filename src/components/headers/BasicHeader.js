import React from 'react'
import {HiOutlineChevronLeft} from "react-icons/hi";
import {useNavigate } from "react-router-dom";
export const BasicHeader = ({title}) => {
    const navigate = useNavigate();
    return (
        <div 
            onClick={()=>navigate(-1)}
            className={`fixed top-0 w-full h-12 border-b border-gray-300
                grid place-items-center font-semibold`
        }>
            <HiOutlineChevronLeft className='absolute h-8 w-8 top-2 left-2'/>
            <h2>{title}</h2>
        </div>
    )
}
