import React from 'react';
import { Link } from 'react-router-dom';
import {LogoHeader} from "../components/headers/LogoHeader";
import {ROUTES} from "../constants/routes";
const NotFound = () => {

  return (
    <>
      <LogoHeader />
      <div className='mt-40 text-center grid place-items-center'>
         <div className='max-w-sm w-full px-4'>
            <h2 className='text-lg font-bold'>Sorry, this page isn't available</h2>
            <p className='mb-4'>The link you followed may be broken, or the page may have been removed</p>
            <Link to={ROUTES.DASHBOARD} className='text-blue-700 text-sm'>Go back to Instagram</Link>
         </div>
      </div>
    </>
  )
}

export default NotFound