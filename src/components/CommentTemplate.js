import React, { useEffect, useState } from 'react'
import Skeleton from 'react-loading-skeleton';
import {getUserDataByUserId,updateCommentLikes } from "../services/firebase";
import {AiOutlineHeart, AiFillHeart} from "react-icons/ai";
import { doc, getFirestore, onSnapshot } from "firebase/firestore";
import {getAuth} from "firebase/auth";
export const CommentTemplate = ({commentId}) => {   
    const [isLoading, setIsLoading] = useState(true);
    const [commentData, setCommentData] = useState(null);
    const [commentByData, setCommentByData] = useState(null);
    const handleCommentLike = async()=>{
        try {
            const userId = getAuth().currentUser.uid;
            await updateCommentLikes({commentId, userId})
        } catch (error) {
            console.log(error);
        }
    }
    useEffect(()=>{
        const db =getFirestore();
        const unsub = onSnapshot(doc(db, "comments", commentId), (doc) => {
            setCommentData(doc.data());
        });
        return ()=>{
            unsub();
        }
    }, [commentId]);
    useEffect(()=>{
        if (commentData) {
           (async()=>{
                const data = await getUserDataByUserId(commentData.commentBy);
                if (data) {
                    setCommentByData(data);
                    setIsLoading(false);
                }
           })()
        }
    }, [commentData])

    if (isLoading) {
        return (
            <div className=' flex py-5'>
                <Skeleton circle={true} width={32} height={32}/>
                <div className='flex-1 px-5'>
                    <p className="block pb-2">
                        <Skeleton width={"100%"} height={50} />
                    </p>
                    <p><Skeleton /></p>
                </div>
            </div>
        )
    }

    return (
        <div className=' flex py-2'>
            <img
                className='block w-8 h-8 mr-5 rounded-full object-cover object-center'
                src={commentByData.profilePic} alt={commentByData.usernname}
            />
            <div className='text-sm flex justify-between flex-1'>
                <p>
                    <span className='font-semibold'>{commentByData.username}</span> {commentData.comment}
                </p>
                <button onClick={handleCommentLike} className= 'inline-flex items-center'>
                    {commentData.likes.length > 0 && <span className='text-xs text-gray-500 pr-0.5'>{commentData.likes.length}</span>}
                    
                    {(
                        commentData.likes.includes(getAuth().currentUser.uid)? 
                            <AiFillHeart className='w-4 h-4 text-red-500'/>:
                            <AiOutlineHeart className='w-4 h-4'/>
                    )}
                </button>
            </div>
        </div>
    )
}
