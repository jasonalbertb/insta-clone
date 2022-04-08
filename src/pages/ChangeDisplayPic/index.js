import React, {useState, useEffect} from 'react'
import {useNavigate} from "react-router-dom";
import {HiOutlineChevronLeft} from "react-icons/hi";
import {ROUTES} from "../../constants/routes";
import {updateProfilePic, createPost} from "../../services/firebase"
import {Spinner} from "./Spinner";
import {Modal} from "./Modal";
import {PICS} from "../../constants/pics";
import { getAuth } from 'firebase/auth';
import {useGlobalContext} from "../../context/globalContext";
const ChangeDisplayPic = () => {
    const {setError} = useGlobalContext();
    const navigate = useNavigate();
    const [imgUrl, setImgUrl] = useState("");
    const [isSubmitDisabled, setIsSubmitDisabled] = useState(false);
    const [isSubmitLoading, setIsSubmitLoading] = useState(false);
    const [captionInput, setCaptionInput] = useState("");
    const [modalMessage, setModalMessage] = useState("");
    const handleBack = ()=>{
        navigate(-1);
    }
    const closeModal = ()=>{
        setModalMessage("");
    }
    const handleSubmit = async (e)=>{
        try {
            e.preventDefault();
            setIsSubmitDisabled(true);
            setIsSubmitLoading(true);
            await updateProfilePic(imgUrl);
            await createPost({
                content : [imgUrl],
                caption : captionInput,
                postedBy : getAuth().currentUser.uid
            })
            navigate(ROUTES.DASHBOARD);
        } catch (error) {
            console.log(error);
            setError(error);
            navigate(ROUTES.ERROR);
            setIsSubmitDisabled(false);
            setIsSubmitLoading(false);
        }
    }
    useEffect(()=>{
        setIsSubmitDisabled(imgUrl === "");
    }, [imgUrl])
    return (
        <>
            <div className='h-12 fixed top-0 left-0 w-full border-b-2 font-semibold  border-gray-300 grid place-items-center'>
                <p>Upload Display Picture</p>
                <button onClick={handleBack} className='absolute top-2 left-2'>
                    <HiOutlineChevronLeft className='w-8 h-8'/>
                </button>
            </div>
            <div className='mt-12 bg-gray-50'>  
                <form onSubmit={handleSubmit} className={`py-4 ${modalMessage && "pt-0"}` }>
                    <Modal modalMessage={modalMessage} closeModal={closeModal}/> 
                    <div className='mx-2'>
                        <input
                            value={imgUrl} onChange={e=>setImgUrl(e.target.value)}
                            type="text" placeholder="Paste image url here..."
                            className='= w-full border focus:outline-none flex-1 h-8  px-2 text-sm mb-4'
                        />
                    </div>
                    <div className='bg-white border-y border-gray-300 flex mb-2'>
                        <textarea 
                            className='flex-1 focus:outline-none p-2'
                            type="text" value={captionInput} 
                            onChange={(e)=>setCaptionInput(e.target.value)}
                            placeholder="Write a caption"
                        ></textarea>
                        <img src={imgUrl || PICS.defaultPic} 
                              alt="Upload_Pic" 
                              className='block w-16 h-16 object-cover object-center border m-2'
                        />   
                    </div>   
                    <div className='bg-white p-2 border-y border-gray-300'>
                        <button 
                            disabled={isSubmitDisabled}
                            className={`border bg-sky-500 text-white font-semibold px-2 py-0.5 rounded-sm cursor-pointer 
                                        disabled:bg-sky-200 inline-flex items-center`}
                            type='submit'>
                            {isSubmitLoading && <Spinner />} Upload
                        </button>
                    </div>       
                </form>
            </div>
        </>
    )
}

export default ChangeDisplayPic