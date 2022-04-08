import React, { useContext } from 'react'
import {AiOutlineSetting} from "react-icons/ai"
import {BiUserPlus} from "react-icons/bi"
//context
import {ProfileContext} from "../../context/ProfileContext";
import {useNavigate} from "react-router-dom";
import {ROUTES} from "../../constants/routes";
export const UserHeader = () => {
  const {handleOptionButton, userData} = useContext(ProfileContext);
  const navigate = useNavigate();

  return (
    <div className='flex justify-between border-b border-gray-200 py-3 px-4'>
      <AiOutlineSetting 
        className='h-6 w-6' 
        onClick={()=>handleOptionButton("open")}
      />
      <p className='text-base font-semibold text-gray-800'>{userData.username || " "}</p>
      <BiUserPlus className='h-6 w-6' onClick={()=>{
        navigate(ROUTES.EXPLORE);
      }}/>
    </div>
  )
}
