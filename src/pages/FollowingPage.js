import React, {useEffect, useState} from 'react'
import {useParams, useNavigate} from "react-router-dom";
import {BasicHeader} from "../components/headers/BasicHeader";
import {FooterNav} from "../components/footers/footerNav";
import {ReactLoader2} from "../components/ReactLoader2";
import {useGlobalContext} from "../context/globalContext";
import {ROUTES} from "../constants/routes";
import { getUserDataByUserId } from '../services/firebase';
import {SuggestedFollow} from "../components/SuggestedFollow";
import {getAuth} from "firebase/auth";
import { doc, getFirestore, onSnapshot } from "firebase/firestore";
const FollowerPage = () => {
  const navigate = useNavigate();
  const {profileId} = useParams();
  const {setError} = useGlobalContext();
  const [profileFollowing, setProfileFollowing] = useState([]);
  const [userFollowing, setUserFollowing] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoading2, setIsLoading2] = useState(true);
  useEffect(()=>{
    const {uid} = getAuth().currentUser;
    const db = getFirestore();
    const unsub = onSnapshot(doc(db, "profiles",uid ), (doc) => {
      if (doc.data() && doc.data().following) {
        setUserFollowing(doc.data().following);
        setIsLoading(false);
      }
    });
    return ()=>{
      unsub();
    }
  }, []);

  useEffect(()=>{
    if (profileId) {
      (async()=>{
        try {
          const {uid} = getAuth().currentUser;
          const data = await getUserDataByUserId(profileId);
          if (data && data.following) {
            const filtered = data.following.filter(el=> el !== uid.toString());
            setProfileFollowing(filtered);
            setIsLoading2(false);
          }
        } catch (error) {
          setError(error);
          navigate(ROUTES.ERROR);
        }
      })();
    }
  }, [profileId, navigate, setError]);

  if (isLoading || isLoading2) {
    return <ReactLoader2 />
  }
  return (
    <>
      <BasicHeader title="Following"/>
      <div className='mt-12'>
          {profileFollowing.map(follower=>{
            return <SuggestedFollow profileId={follower} userFollowing={userFollowing}/>
          })}
      </div>
      <FooterNav />
    </>
  )
}

export default FollowerPage