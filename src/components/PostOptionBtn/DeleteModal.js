import React, {useContext, useState} from 'react'
import {PostOptBtnContext} from "../../context/PostOptBtnContext";
import {deletePost} from "../../services/firebase";
import {useGlobalContext} from "../../context/globalContext";
import {useNavigate} from "react-router-dom";
import {ROUTES} from "../../constants/routes";
export const DeleteModal = () => {
    const navigate = useNavigate();
    const {setError} = useGlobalContext();
    const {setIsDelModalOpen, postId} = useContext(PostOptBtnContext);
    const [isDelBtnDisabled, setIsDelBtnDisabled] = useState();
    const handleCancel = ()=>{
        setIsDelModalOpen(false)
    }
    const handleClickOutside = (e)=>{
        if (e.currentTarget === e.target) {
            setIsDelModalOpen(false);
        }
    }
    const handleDelBtn = async()=>{
        try {
            setIsDelBtnDisabled(true);
            await deletePost(postId);
            navigate(ROUTES.DASHBOARD);
        } catch (error) {
            setError(error);
            navigate(ROUTES.ERROR);
        }
    }
    return (
        <div 
            onClick={handleClickOutside}
            className='fixed top-0 left-0 z-[100] w-screen h-screen bg-black-rgba grid place-items-center'
        >
            <div className='w-9/12 bg-white rounded-lg text-center'>
                <div className='py-4 w-full border-b border-gray-300'>
                   <div className='w-[80%] mx-auto'>
                        <h4 className='font-semibold text-lg'>Delete Post?</h4>
                        <p className='text-sm text-gray-500'>
                            Are you sure you want to delete this post?
                        </p>
                   </div>
                </div>
                <ul>
                    <li className='w-full border-b border-gray-300 py-3'>
                        <button 
                            disabled={isDelBtnDisabled}
                            className='text-red-500 text-sm font-bold'
                            onClick={handleDelBtn}
                        >Delete</button>
                    </li>
                    <li className='w-full text-sm py-3'>
                        <button onClick={handleCancel}>Cancel</button>
                    </li>
                </ul>
            </div>
        </div>
    )
}
