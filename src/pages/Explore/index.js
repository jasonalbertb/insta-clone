import React, { useEffect, useState } from 'react'
import {ReactLoader2} from "../../components/ReactLoader2";
import {CgChevronLeft} from "react-icons/cg"
import {Link} from "react-router-dom";
import {SuggestedFollow} from "../../components/SuggestedFollow";

import {getAuth} from "firebase/auth";
import {getSuggestedFollowers} from "../../services/firebase";
import { getFirestore, doc, getDoc , onSnapshot} from 'firebase/firestore';

const Explore = () => {
    const [userFollowing, setUserFollowing] = useState([]);
    const [suggestedFollowers, setSuggestedFollowers] = useState(null);
    const [isLoading ,setIsLoading] = useState(true);

    useEffect(()=>{
        (async()=>{
            const userId = getAuth().currentUser.uid;
            const db = getFirestore();
            const docRef = doc(db, "profiles", userId);
            const docSnap = await getDoc(docRef);
            const data = await getSuggestedFollowers([userId,...docSnap.data().following]);
            setSuggestedFollowers(data);
            setIsLoading(false);
        })();
    }, []);
    
    useEffect(()=>{
        const userId = getAuth().currentUser.uid;
        const db = getFirestore();
        const docRef = doc(db, "profiles", userId);
        const unsub = onSnapshot(docRef, (doc) => {
            setUserFollowing(doc.data().following)
        });
        return ()=>{
            unsub();
        }
    }, [])

    if (isLoading) {
        return <ReactLoader2 />;
    }

    return (
        <>
            <nav className='relative border-b border-gray-300 text-center'>
                <span className='absolute top-1 left-2'>
                    <Link to="/"><CgChevronLeft className='w-8 h-8'/></Link>
                </span>
                <p className='font-semibold py-2'>Discover People</p>
            </nav>
            <div className='container max-w-xl mx-auto '>
                <div className='pl-4 md:pl-0 capitlize pt-4 pb-2 font-semibold text-gray-700'>
                    Suggested
                </div>
                <div className='bg-white border-gray-200 py-2 px-4'>
                    {suggestedFollowers.map((id, i)=>{
                        return  <SuggestedFollow key={i} userFollowing={userFollowing} profileId={id}/>
                    })}
                </div>
            </div>
        </> 
    )
}

export default Explore;
