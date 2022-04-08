import React from 'react'
import {Link} from "react-router-dom";
import { FaHome} from "react-icons/fa";

import {BiSearch} from "react-icons/bi"
import {FiPlusSquare} from "react-icons/fi"
import { AiOutlineHeart} from "react-icons/ai";
import {getAuth} from "firebase/auth";
import {ROUTES} from "../../constants/routes";
import {useGlobalContext} from "../../context/globalContext";
export const FooterNav = () => {
  const {user} = useGlobalContext();
  const {uid} = getAuth().currentUser;
  return (
    <div className='fixed bottom-0 box-border bg-white border-b border-gray-200 w-screen z-10'>
        <div className='flex  items-center justify-between py-2 max-w-5xl mx-auto px-5'>
            <Link to="/"><FaHome className='block h-6 w-6'/></Link>
            <Link to="/"><BiSearch className='block h-6 w-6'/></Link>
            <Link to={ROUTES.CREATE_STYLE}><FiPlusSquare className='block h-6 w-6'/></Link>
            <Link to="/"><AiOutlineHeart className='block h-6 w-6'/></Link>
            <Link to={ROUTES.PROFILE(uid)}><img src={user.profilePic} alt={user.username} className='block h-6 w-6 object-cover object-center rounded-full'/></Link>
        </div>
    </div>
  )
}
