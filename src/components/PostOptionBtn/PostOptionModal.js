import React, {useContext} from 'react'
import {getAuth} from "firebase/auth";
import { PostOptBtnContext } from "../../context/PostOptBtnContext";
import {updateFollow} from "../../services/firebase";
export const PostOptionModal = () => {
    const { postedBy, setIsOptModalOpen, setIsDelModalOpen } = useContext(PostOptBtnContext);

    const handleCancel = ()=>{
        setIsOptModalOpen(false);
    }
    const handleClickOutside = (e)=>{
        if (e.target === e.currentTarget ) {
            setIsOptModalOpen(false);
        }
    }
    const handleOpenDelModal = ()=>{
        setIsOptModalOpen(false);
        setIsDelModalOpen(true);
    }
    return (
        <div 
            onClick={handleClickOutside}
            className='fixed top-0 left-0 w-screen h-screen z-10 bg-black-rgba grid place-items-center'
            >
            <ul className='bg-white w-4/5 rounded-xl text-center'>
                {(postedBy === getAuth().currentUser.uid?
                    <li className='border-b border-gray-300 py-3'>
                        <button 
                            onClick={(handleOpenDelModal)}
                            className='text-sm font-bold text-red-600'
                        >Delete</button>
                    </li>:
                    <>
                    <li className='border-b border-gray-300 text-sm py-3 text-red-600 font-bold'>
                        Report
                    </li>
                    </>
                )}
                <li className='border-b border-gray-300 text-sm py-3 text-gray-600'>Go to Post</li>
                <li className='border-b border-gray-300 text-sm py-3 text-gray-600'>Share to...</li>
                <li className='border-b border-gray-300 text-sm py-3 text-gray-600'>Copy Link</li>
                <li className='border-b border-gray-300 text-sm py-3 text-gray-600'>Embed</li>
                <li className='text-sm py-3 text-gray-600'>
                    <button onClick={handleCancel}>
                    Cancel
                    </button>
                </li>
            </ul>
            </div>
    )
}
