import React, { useEffect, useState } from 'react'
import {FooterNav} from "../../components/footers/footerNav";
import {useParams} from "react-router-dom";

import { doc , getFirestore, query, collection, where, onSnapshot,getDoc,  orderBy} from "firebase/firestore";

import {CommentHeader} from "../../components/headers/CommentHeader";
//loading
import "react-loading-skeleton/dist/skeleton.css";

//services 
import {getUserDataByUserId} from "../../services/firebase";

//comment
import {CommentTemplate} from "../../components/CommentTemplate";
import {PostCommentLoadingPage} from "../../components/loading/PostCommentLoadingPage";
//context 
import {PostCommentContext} from "../../context/PostCommentContext";

const PostComment = () => {
    
    const {postId} =  useParams();
    const [commentIds, setCommentIds] = useState([]);

    const [postData, setPostData] = useState(null); 
    const [postedbyData, setPostedbyData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const header_height = "26";

    useEffect(()=>{
        const db = getFirestore();
        const q = query(collection(db, "comments"),
            where("postId", "==", postId),
            orderBy("createdAt")
        );
        const unsubscribe = onSnapshot(q, (querySnapshot) => {
            const data = [];
            querySnapshot.forEach((doc) => {
                data.push(doc.id);
            });
            setCommentIds(data);
        });
        return ()=>{
            unsubscribe();
        }
    }, [postId])

    useEffect(()=>{
        (async()=>{
            if (postId) {
                const db = getFirestore();
                const docRef =doc (db, "posts", postId);
                const docSnap = await getDoc(docRef);
                if (docSnap.exists()) {
                    setPostData(docSnap.data());
                }
            }
        })()
    }, [postId]);

    useEffect(()=>{
        if (postData) {
            (async()=>{
                const data =  await getUserDataByUserId(postData.postedBy);
                if (data) {
                    setPostedbyData(data); 
                    setIsLoading(false);
                }
            })();
        }
    }, [postData])

    return (  
        <PostCommentContext.Provider 
            value={{
                header_height,
                postId
            }}
        >
            <div>Test</div>
            {isLoading? 
                <PostCommentLoadingPage header_height={header_height}/>:
                <>
                    <CommentHeader title={"Comments"} header_height={header_height}/>
                    <div className={`w-full pt-${header_height} px-5`}>
                        <div className=' flex border-b py-5'>
                            <img
                                className='block w-8 h-8 mr-5 rounded-full object-cover object-center'
                                src={postedbyData.profilePic} alt={postedbyData.usernname}
                            />
                            <div className='text-sm'>
                                <span className='font-semibold'>{postedbyData.username}</span> {postData.caption}
                            </div>
                        </div>
                        <div className='py-4'>
                            {commentIds.map((commentId)=>{
                                return (<CommentTemplate key={commentId} commentId={commentId}/>)
                            })}
                        </div>
                    </div> 
                    <FooterNav />
                </>
            }
           
        </PostCommentContext.Provider>     
    )
}
export default PostComment;
