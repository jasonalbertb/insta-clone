import React, { useState } from 'react'

import {ROUTES} from "../constants/routes";
import {Link, useNavigate} from "react-router-dom";
import {getAuth, signOut} from "firebase/auth";
import {BiUserCircle} from "react-icons/bi"
import {PICS} from "../constants/pics";
//services
import {getCurrentUserData} from "../services/firebase";


export const ProfilePopup = ({profilePic}) => {
  
  const [showPopup, setShowPopup] = useState(false);
  const showPopupHandler = ()=>{
    setShowPopup(!showPopup);
  }

  const navigate = useNavigate();
  const handleProfileLink = async()=>{
    try {
      const uid = getAuth().currentUser.uid;
      const data = await getCurrentUserData({uid});
      console.log(data);
      if (data) {
        navigate(`/p/${data.username}`)
      }else{
        navigate(ROUTES.NOT_FOUND);
      }
    } catch (error) {
      console.log(error);
    }
  }

  const handleLogout = async()=>{
    try {
      const auth = getAuth();
      const cred = await signOut(auth);
    } catch (error) {
      console.log(error.message);
    } 
  }

  return (
    <div className="relative inline-block text-left">
    <div>
        <button 
          type="button"
          onClick={showPopupHandler}
          className="inline-flex justify-center  rounded-full border border-gray-300 shadow-sm mx-2 bg-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-indigo-500" id="menu-button" aria-expanded="true" aria-haspopup="true">
            <img className='w-8 h-8 object-center object-cover rounded-full' src={(profilePic) || PICS.defaultUser} alt='profile'/>
        </button>
    </div>

    <div 
      className={`${!showPopup && "hidden"} origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none`}
      role="menu" aria-orientation="vertical"
      aria-labelledby="menu-button" 
      tabIndex="-1"
    >
        <div className="py-1" role="none">
          <button 
            onClick={handleProfileLink} 
            type="button"
            className="inline-flex items-center hover:bg-gray-50 text-gray-700 w-full text-left px-4 py-2 text-sm"
            role="menuitem" tabIndex="-1" id="menu-item-3"
          >
            <BiUserCircle className='w-4 h-4 mr-1'/>Profile
          </button>
          <button 
            onClick={handleLogout} type="button"
            className="border-t border-gray-200 hover:bg-gray-50 text-gray-700 w-full text-left px-4 py-2 text-sm"
            role="menuitem" tabIndex="-1" id="menu-item-3"
          >
            Log out
          </button>
        </div>
    </div>
    </div>
  )
}

