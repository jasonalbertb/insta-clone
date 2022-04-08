import React, { useState, useEffect } from 'react'
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { doc, getDoc, getFirestore } from "firebase/firestore";
import {ROUTES} from "../constants/routes";
import {Link} from "react-router-dom";
import {updateFollow} from "../services/firebase";
export const SuggestedFollow = ({profileId, userFollowing}) => {
    const [profileData, setProfileData] = useState(null); 

    const [isFollowDisabled, setIsFollowDisabled] = useState(false);
    const handleClick = (follow)=>{
        return async()=>{
            setIsFollowDisabled(true);
            await updateFollow(profileId, follow);
            setIsFollowDisabled(false);
        }
    }
    useEffect(()=>{
        (async()=>{
            if (profileId) {
                const db = getFirestore();
                const docRef = doc(db, "profiles", profileId);
                const docSnap = await getDoc(docRef);
                if (docSnap.exists()) {
                    setProfileData({...docSnap.data()});
                } 
            }
        })();
    }, [profileId]);

    if (!profileData) {
        return (          
            <div className='flex'>
                <div className='leading-none w-12 h-12 rounded-full overflow-hidden mr-2'>
                    <Skeleton width={"100%"} height={"100%"}/>
                </div>
                <div>
                    <p><Skeleton width={200}/></p>
                    <p><Skeleton width={200}/></p>
                </div>
            </div>
        )
    }
    return (
        <div className='flex justify-between items-center p-2'>
            <div className='flex items-center'>
                <div>
                    <img
                    className='w-12 h-12 rounded-full object-cover object-center mx-4'
                    src={profileData.profilePic} 
                    alt='username'
                    />
                </div>
                <div>
                    <p className='text-sm font-semibold text-gray-700'>
                        <Link to={ROUTES.PROFILE(profileId)}>{profileData.username}</Link>
                    </p>
                    <p className='text-sm text-gray-500'>{profileData.fullname}</p>
                    <p className='text-xs text-gray-500'>Suggested for you</p>
                </div>
            </div>
            <div>
                {
                   userFollowing.includes(profileId)?
                        <button
                            disabled={isFollowDisabled}
                            onClick={handleClick("unfollow")}
                            className='bg-gray-300 text-white text-sm font-semibold px-2 py-1 rounded'>Unfollow</button>:
                        <button
                            disabled={isFollowDisabled}
                            onClick={handleClick("follow")}
                            className='bg-sky-500 text-white text-sm font-semibold px-2 py-1 rounded'>Follow</button>
                }
            </div>
        </div>
    )
}
