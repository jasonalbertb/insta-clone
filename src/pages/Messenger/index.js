import React, {useState, useEffect} from 'react'
import {useNavigate} from "react-router-dom";
import {HiOutlineChevronLeft, HiOutlinePencilAlt} from "react-icons/hi";
import {ROUTES} from "../../constants/routes";
import {useGlobalContext} from "../../context/globalContext";
import {ProfilesLoading} from "./ProfilesLoading";
import {getUserDataByUserId, getAllChatTo} from "../../services/firebase";

const Messenger = () => {
    const [chatUserdata, setChatUserdata] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const {setError} = useGlobalContext();
    const navigate = useNavigate();
    const handleBack = ()=>{
        navigate(-1);
    }

    const handleClickLinks = (id)=>{
        navigate(ROUTES.MSG_CONVO(id))
    }

    useEffect(()=>{
        try {
           (async()=>{
               const chatUserIds = await getAllChatTo();
               if (chatUserIds) {
                    const data = [];
                    await Promise.all(chatUserIds.map(async (id) => {
                        const d = await getUserDataByUserId(id);
                        const {username, profilePic} = d;
                        data.push({id, username, profilePic});
                        return
                    }));
                    setChatUserdata(data);
                    setIsLoading(false);
               }
           })()

        } catch (error) {
            setError(error);
            navigate(ROUTES.ERROR);
        }
    }, [setError, navigate])
    return (
        <>
            <div className='z-10 bg-white fixed top-0 left-0 h-12 border-b border-gray-300 w-full grid place-items-center'>
                <button 
                    onClick={handleBack}
                    className='absolute top-2 left-2'
                >
                    <HiOutlineChevronLeft className='w-8 h-8'/>
                </button>
                <p className='font-lg font-semibold'>Chats</p>
                <button className='absolute top-2 right-2'>
                    <HiOutlinePencilAlt className='w-8 h-8'/>
                </button>
            </div>
            <div className='mt-12'>
                {(isLoading? 
                    <ProfilesLoading />:
                    <ul className='p-4'>
                        {chatUserdata.map(user=>{
                            return (
                                <li 
                                    key={user.id}
                                    onClick={()=>handleClickLinks(user.id)}
                                    className='flex cursor-pointer items-center mb-2 font-medium' 
                                >
                                    <img 
                                        className='w-16 h-16 rounded-full object-cover object-center mr-4'
                                        src={user.profilePic} alt={user.username}
                                    />
                                    <p>{user.username}</p>
                                </li>
                            )
                        })}
                    </ul>
                )}
            </div>
            
        </>
    )
}

export default Messenger