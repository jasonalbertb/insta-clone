
import React, { useEffect, useState } from 'react';
import {Link} from "react-router-dom";
import "react-loading-skeleton/dist/skeleton.css";

import {useNavigate} from "react-router-dom";

//icons
import {AiOutlineHeart, AiFillHeart} from "react-icons/ai"; 
import {RiChat1Line, RiBookmarkLine, RiShareBoxLine} from "react-icons/ri";
//slider
import {PhotoSlider} from "./PhotoSlider";
import {getAuth} from "firebase/auth";
//services
import {updateLikePost} from "../../services/firebase";
//component 
import {CommentItem} from "./CommentItem";
import {PostOptionBtn} from "../PostOptionBtn";
//constants 
import {ROUTES} from "../../constants/routes";
import {
     getFirestore,  doc, onSnapshot , getDoc
 } from 'firebase/firestore';

 import {PostLoading} from "./PostLoading";
export const PostTemplate = ({postId, lastPostRef}) => {
    const [postData, setPostData] = useState(null);
    const [postedByData, setPostedByData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const userId = getAuth().currentUser.uid;
    const likeBtnHandler = async ()=>{
       try {
        //    console.log("postData.id", postData.id, "userId", userId);
            await updateLikePost(postData.id, userId);
       } catch (error) {
            console.log(error);
       }
    }
    const navigate = useNavigate();
    const commentBtnhandler = ()=>{
        navigate(ROUTES.COMMENT_POSTS(postData.id));
    }

    useEffect(()=>{
        let unsub = null;
        if (postId) {
            const db = getFirestore();
            unsub = onSnapshot(doc(db, "posts", postId), (docData) => {
                (async()=>{
                    const db = getFirestore();
                    if (docData.data()) {
                        const docRef = doc(db, "profiles", docData.data().postedBy);
                        const docSnap = await getDoc(docRef);
                        if (docSnap.exists()) {
                            setPostedByData(docSnap.data());
                            setPostData({id: docData.id, ...docData.data()});
                            setIsLoading(false);
                        } 
                    }
                })();
            });
        }
        return ()=>{
            unsub && unsub();
        } 
    }, [postId]);

    if (isLoading) {
        return  <PostLoading />;
    }
    return (
        <div ref={lastPostRef} id={postId}>
            <div className='flex justify-between p-4'>
                <div className='flex items-center'>
                    <img 
                        className='w-8 h-8 mr-2 rounded-full object-cover object-center'
                        src={postedByData.profilePic} alt={postedByData.username}
                    />
                    <p className='text-sm font-semibold'> 
                        <Link to={ROUTES.PROFILE(postData.postedBy)}>
                            {postedByData.username}
                        </Link>
                    </p>
                </div>
                <PostOptionBtn className="block" postId={postId} postedBy={postData.postedBy}/>
            </div>
            {/* <img 
                className='block'
                src={content[0]} alt={caption}
            /> */}
            < PhotoSlider content={postData.content}/>
            <div className=' border-b border-gray-300 p-2'>
                <div className='flex justify-between '>
                    <div>
                        <button className='px-2' onClick={likeBtnHandler}>
                            {postData.likes.includes(userId)? 
                                <AiFillHeart className='w-6 h-6 text-red-500'/>:
                                <AiOutlineHeart className='w-6 h-6'/>
                            }
                        </button>
                        <button className='px-2' onClick={commentBtnhandler}>
                            <RiChat1Line className='w-6 h-6'/>
                        </button>
                        <button className='px-2'>
                            < RiShareBoxLine className='w-6 h-6'/>
                        </button>
                    </div>
                    <button className='block px-2'><RiBookmarkLine className='w-6 h-6'/></button>
                </div>
                <div className='p-2'>
                    <p className=' text-sm font-semibold py-1'>{postData.likes.length } likes</p>
                    <p className='text-sm text-gray-800 py-1'>
                        <span className='font-semibold'>{postedByData.user}</span> {postData.caption}
                    </p>

                    <ul className='text-sm text-gray-800 '>
                        <button onClick={commentBtnhandler}>
                            <li className='text-gray-500 pb-1 text-md'>View all comments</li>
                        </button>
                        {postData.comments.slice(0, 3).map((comment, i)=>{
                            return <CommentItem key={i}  comment={comment}/>
                        })}
                    </ul>
                </div>
            </div>
        </div>
    )
}
