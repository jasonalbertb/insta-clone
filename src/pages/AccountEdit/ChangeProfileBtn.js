import React, {useState} from 'react'
import ReactDOM from "react-dom";
import {Link, useNavigate} from "react-router-dom";
import {ROUTES} from "../../constants/routes";
import {PICS} from "../../constants/pics";
import {updateProfilePic} from "../../services/firebase";
export const ChangeProfileBtn = () => {
    const navigate = useNavigate();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isRemoveDisabled, setIsRemoveDisabled] = useState(false);
    const btnHandler = ()=>{
        setIsModalOpen(true)
    }

    const removePhotoBtnHandler = async()=>{
        try {
            setIsRemoveDisabled(true);
            await updateProfilePic(PICS.defaultUser);
            navigate(ROUTES.DASHBOARD)
        } catch (error) {
            setIsRemoveDisabled(false);
        }
    }
    const cancelBtnHandler = ()=>{
        setIsModalOpen(false)
    }

    const containerDivHandler = (e)=>{
        if (e.target === e.currentTarget) {
            setIsModalOpen(false)
        }
    }
    return (
        <>
            <button onClick={btnHandler}
                 className="text-sky-500 text-sm font-semibold inline">
                Change Profile Photo
            </button>
            {(isModalOpen && ReactDOM.createPortal(
                <div 
                    onClick={containerDivHandler}
                    className=" fixed top-0 left-0 w-screen h-screen bg-black-rgba grid place-items-center"
                >
                    <div className='w-10/12 bg-white rounded-xl text-center'>
                        <h2 className='border-b border-gray-300 text-lg font-semibold py-6'>Change Profile Photo</h2>
                        <ul>
                            <li >
                                <Link
                                    to={ROUTES.UPLOAD_DP}
                                    className='block w-full h-full border-b border-gray-300 text-sm font-semibold py-3 text-sky-500 active:bg-blue-50'>
                                    Upload Photo
                                </Link>
                            </li>
                            <li >
                                <button 
                                    disabled={isRemoveDisabled}
                                    onClick={removePhotoBtnHandler}
                                    className='w-full h-full border-b border-gray-300 text-sm font-semibold py-3 text-red-500 active:bg-blue-50'>
                                    Remove Current Photo
                                </button>
                            </li>
                            <li >
                                <button 
                                    onClick={cancelBtnHandler}
                                    className='w-full h-full border-gray-300 text-sm  py-3 active:bg-blue-50'>
                                        Cancel
                                </button>
                            </li>
                        </ul>
                    </div>
                </div>,
                document.body
            ))}
        </>
    )
}
