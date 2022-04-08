import React, { useEffect, useState } from 'react'
import Skeleton from "react-loading-skeleton";
import {getUserDataByUserId} from "../services/firebase";
export const DPCircle = ({profileId}) => {
    const [isLoading, setIsLoading] = useState(true);
    const [profileData, setProfileData] = useState(null);
    useEffect(()=>{
        (async()=>{
            try {
                const data = await getUserDataByUserId(profileId);
                if (data) {
                    setProfileData(data);
                    setIsLoading(false);
                }
            } catch (error) {
                console.log(error);
            }
        })()
    }, [profileId])
    if (isLoading) {
        return(
            <div className='border w-16 h-16 leading-none rounded-full overflow-hidden mr-4'>
                <Skeleton width={"100%"} height={"100%"}/>
            </div>
        ) 
    }
    return (
        <div className={`flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500`}>
            <button className='w-[60px] h-[60px] bg-white rounded-full border-2 border-white'>
                <img 
                    className='object-cover object-center rounded-full'
                    src={profileData.profilePic || ""}
                    alt={profileData.username || ""}
                />
            </button>
        </div>
        
    )
}
