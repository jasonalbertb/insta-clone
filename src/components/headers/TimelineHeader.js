import React from 'react'
import {RiMessengerLine} from "react-icons/ri";
import {FiCamera} from "react-icons/fi";
import {Link} from "react-router-dom";
import {ROUTES} from "../../constants/routes";
export const TimeLineHeader = () => {
  return (
    <div className={`h-12 fixed top-0 box-border bg-white border-b border-gray-200 w-screen flex items-center justify-between px-4 z-10`}>
      <Link to="/"><FiCamera className='block h-6 w-6'/></Link>
      <Link to="/"> <img className='h-7' src='/img/logo.png' alt='logo.png'/></Link>
      <Link to={ROUTES.MESSENGER}><RiMessengerLine className='block h-6 w-6'/></Link>
    </div>
  )
}
