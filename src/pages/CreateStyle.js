import React, { useEffect, useState } from 'react'
import {GrClose} from "react-icons/gr";
import {BiChevronRight} from "react-icons/bi";
import {useNavigate} from "react-router-dom";
import {ROUTES} from "../constants/routes";
import {createPost} from "../services/firebase";
import {getAuth} from "firebase/auth";
import {useGlobalContext} from "../context/globalContext";
 const CreateStyle = () => {
    const {setError} = useGlobalContext()
    const [imgUrl, setImgUrl] = useState("");
    const [inputCaption, setInputCaption] = useState("");
    const [isNextDisabled, setIsNextDisabled] = useState(true);
    const user = getAuth().currentUser;
    const navigate = useNavigate();
    const handleClose = ()=>{
        navigate(-1);
    }
    useEffect(()=>{
        setIsNextDisabled(imgUrl === "");
    }, [imgUrl])
    const handleNext = async()=>{
        try {
            const postedBy = getAuth().currentUser.uid;

            await createPost({
                postedBy, 
                content : [imgUrl],
                caption : inputCaption
            });
            navigate(ROUTES.DASHBOARD);
        } catch (error) {
            setError(error);
            navigate(ROUTES.ERROR);
        }
    }
    return (
        <>
            <div className='fixed top-0 w-full h-12 flex px-4 justify-between py-2 items-center border-b border-gray-300'>
                <button 
                    onClick={handleClose}
                >
                    <GrClose className='w-6 h-6'/>
                </button>
                <p className='font-semibold'>New Post</p>
                <button
                 onClick={handleNext} className='font-semibold text-sky-500 disabled:text-gray-500'
                 disabled={isNextDisabled} 
                >
                     Next
                </button>
            </div>
            <div className='pt-12'>
                <form className='border py-2 px-4'>
                    <input 
                        className='block w-full border border-gray-300 px-4 py-1 text-sm focus:outline-none '
                        type="text" placeholder="Paste url here"
                        value={imgUrl}
                        onChange={e=>setImgUrl(e.target.value)}
                    />
                    <div className='py-2 px-4 py flex'>
                        <div className='flex flex-1'>
                            <img
                                className='w-8 h-8 rounded-full object-cover object-center mr-2'
                                src={user.photoURL} alt={user.displayName}
                            />
                            <textarea
                                className='flex-1 focus:outline-none'
                                type="text" placeholder='Write a caption...'
                                value={inputCaption}
                                onChange={e=>setInputCaption(e.target.value)}
                             />
                        </div> 
                        <img src={imgUrl} alt="postImg" className="w-12 h-12 border" />
                    </div>
                </form>
            </div>
            <div className='bg-gray-50 pt-3'>
                <div className=' mb-3 border-y border-gray-300 bg-white flex justify-between px-4 py-2'>
                    <p>Add Location</p>
                    <button><BiChevronRight className='w-6 h-6'/></button>
                </div>
                <div className='mb-3 border-y border-gray-300 bg-white flex justify-between px-4 py-2'>
                    <p>Tag People</p>
                    <button><BiChevronRight className='w-6 h-6'/></button>
                </div>
                <p className='text-xs text-gray-500 px-4'>Advance Settings</p>
            </div>
            
        </> 
    )
}

export default CreateStyle