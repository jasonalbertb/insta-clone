import React, {useContext} from 'react'
import {GrClose} from "react-icons/gr";
import {Link} from "react-router-dom";
import {signOut , getAuth} from "firebase/auth";
import {BiChevronRight} from "react-icons/bi";
import {ProfileContext} from "../context/ProfileContext";
import {ROUTES} from "../constants/routes";
export const OptionSidebar = () => {
    const {isOptionOpen, handleOptionButton} = useContext(ProfileContext);
    const handleLogout = ()=>{
        const auth = getAuth();
        signOut(auth); 
    }

    return (
        <div className={`fixed top-0 left-0 bg-gray-50 w-screen h-screen z-10 ${isOptionOpen? "translate-x-0" : "translate-x-[-100%]"} transition-all ease-in`}>
            <div className='relative text-center bg-white py-3'>
                <button 
                    onClick={()=>handleOptionButton("close")}
                    className='absolute top-3 left-3'
                >
                    <GrClose className='w-6 h-6'/>
                </button>
                <span className='font-semibold'>Options</span>
            </div>
            <div 
                className='bg-gray-50 border-b border-gray-300 text-gray-500 uppercase text-sm font-semibold pl-4 pt-4 pb-2'
            >
                Account
            </div>
            <ul className='p-0 m-0 mb-4 bg-white'>
                <li className='px-4 py-2 border-b border-gray-300 inline-flex justify-between w-full items-center'>
                    <Link to={ROUTES.ACC_EDIT}>Edit Profile</Link>
                    <BiChevronRight className='text-gray-400 w-6 h-6'/>
                </li>
                <li className='px-4 py-2 border-b border-gray-300 inline-flex justify-between w-full items-center'>
                    <Link to="/">Nametag</Link>
                    <BiChevronRight className='text-gray-400 w-6 h-6'/>
                </li>
                <li className='px-4 py-2 border-b border-gray-300 inline-flex justify-between w-full items-center'>
                    <Link to="/">Change Password</Link>
                    <BiChevronRight className='text-gray-400 w-6 h-6'/>
                </li>
                <li className='px-4 py-2 border-b border-gray-300 inline-flex justify-between w-full items-center'>
                    <Link to="/">Privacy and Security</Link>
                    <BiChevronRight className='text-gray-400 w-6 h-6'/>
                </li>
                <li className='px-4 py-2 border-b border-gray-300 inline-flex justify-between w-full items-center'>
                    <Link to="/">Login Activity</Link>
                    <BiChevronRight className='text-gray-400 w-6 h-6'/>
                </li>
                <li className='px-4 py-2 border-b border-gray-300 inline-flex justify-between w-full items-center'>
                    <Link to="/">Emails from Instagram</Link>
                    <BiChevronRight className='text-gray-400 w-6 h-6'/>
                </li>
            </ul>

            <button onClick={handleLogout}  className='bg-white px-4 py-2 border-y border-gray-300 inline-flex justify-between w-full items-center'>
                <span>Logout</span>
                <BiChevronRight className='text-gray-400 w-6 h-6'/>
            </button>
        </div>
    )
}
