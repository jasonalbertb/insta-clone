import React from 'react'
import {BsInstagram} from "react-icons/bs";
import {Link} from "react-router-dom";
import { ROUTES } from '../../constants/routes';
export const LogoHeader = () => {
  return (
    <div className='fixed top-0 left-0 h-12 w-full z-50 border-b border-gray-300 flex items-center px-4'>
        <Link to={ROUTES.DASHBOARD} className="flex items-center">
            <BsInstagram className='w-8 h-8 mr-2'/>
            <img src='/img/logo.png' alt="logo" className='h-8 translate-y-1 pl-2'/>
        </Link>
    </div>
  )
}
