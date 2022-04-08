import React, {useEffect, useState} from 'react'
import {onSnapshot, getFirestore, doc} from "firebase/firestore";
import {updateFollow} from "../../services/firebase";
import {getAuth} from "firebase/auth";
import {FaUserCheck} from "react-icons/fa";
export const FollowBtn = ({id}) => {
    const [isFollowing, setIsFollowing] = useState(false);
    const [btnDisabled, setBtnDisabled] = useState(false);
    useEffect(()=>{
        const {uid} = getAuth().currentUser; 
        const db = getFirestore();
        const unsub = onSnapshot(doc(db, "profiles", uid), (doc) => {
            setIsFollowing(doc.data().following.includes(id));
        });
        return ()=>{
            unsub();
        }
    }, [id]);
    const handleBtn = (follow)=>{
        (async()=>{
            setBtnDisabled(true);
            await updateFollow(id, follow);
            setBtnDisabled(false);
        })()
    }
    return (
        (isFollowing? 
            <button 
                onClick={()=>handleBtn("unfollow")}
                disabled={btnDisabled}
                className='inline-flex items-center rounded-md border border-gray-300 px-4 py-1'
            >
                <FaUserCheck className='w-4 h-4'/>
            </button>: 
            <button 
                onClick={()=>handleBtn("follow")}
                disabled={btnDisabled}
                className={`inline-flex items-center relative text-sm font-semibold text-white rounded-md px-3 ${btnDisabled ? "bg-sky-300" : "bg-sky-500 "}`}
            >Follow </button>
        )
    )

}
