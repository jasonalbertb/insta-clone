import "react-loading-skeleton/dist/skeleton.css";
import React, { useCallback, useEffect, useRef, useState } from 'react'

//firestore
import {
  getFirestore,collection, query, where, getDocs,getDoc,
  startAfter, limit, orderBy, doc
} from "firebase/firestore";
//components
import {TimeLineHeader} from "../../components/headers/TimelineHeader";
import {FooterNav} from "../../components/footers/footerNav";
import {ReactLoader2} from "../../components/ReactLoader2";
import {PostTemplate} from "../../components/PostTemplate";
import { MyDayComponent } from "./MyDayComponent";
//context
import {useGlobalContext} from "../../context/globalContext";
import { getAuth } from "firebase/auth";
//services
import {getUserDataByUserId} from "../../services/firebase";
const Dashboard = () => {
  //pagination
  const [btmPost, setBtmPost] = useState(null);
  const [hasMore, setHasMore] = useState(false); 
  
  const {isLoading} = useGlobalContext();
  const [postIds, setPostIds] = useState([]);
  useEffect(()=>{ 
    (async()=>{
        const db = getFirestore(); 
        const uid = getAuth().currentUser.uid;
        const {following} = await getUserDataByUserId(uid);
        let q = null;
        if (btmPost) {
          const lastVisible = await getDoc(doc(db,"posts", btmPost));
          q = query(
            collection(db, "posts"),
            where("postedBy", "in", [uid, ...following]),
            orderBy("createdAt",  "desc"),
            startAfter(lastVisible),
            limit(5)
          );
        }else{
          q = query(
            collection(db, "posts"),
            where("postedBy", "in", [uid, ...following]),
            orderBy("createdAt",  "desc"),
            limit(5)
          );
        }
        
        const querySnapshot = await getDocs(q);
        const data = []
        querySnapshot.forEach((doc) => {
          data.push(doc.id);
        });
        setHasMore(data.length > 0);      
        setPostIds(prev=>{
          return [...new Set([...prev, ...data ])]
        })
    })()
  }, [btmPost])

  const observer = useRef();
  const lastPostRef = useCallback(node=>{
    if (isLoading) return;
    if (observer.current) observer.current.disconnect();
    observer.current = new IntersectionObserver(entries=>{
      if (entries[0].isIntersecting && hasMore) {
        setBtmPost(node.id)
      } 
    });
    if (node) observer.current.observe(node)
  }, [isLoading, hasMore]);

  if (isLoading) {
    return <ReactLoader2 />
  }
  return (
    <>
        <TimeLineHeader/>
        <div className="pt-12">
          <MyDayComponent />
          <div >
            {postIds.map((postId, index)=>{
              if (postIds.length -1 === index) {
                return <PostTemplate lastPostRef={lastPostRef} key={postId} postId={postId}/>
              }else{
                return <PostTemplate key={postId} postId={postId}/>
              }
              
            })}
          </div>
        </div>
        <FooterNav />
    </>

  )
} 

export default Dashboard



