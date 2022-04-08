import {useEffect, useState} from 'react'
import {getFirestore, getDoc, doc} from "firebase/firestore";
export const useGetUserById = (id) => {
    const [dataLoading, setdataLoading] = useState(true);
    const [userProfile, setUserProfile] = useState(null);

    useEffect(()=>{
        (async()=>{
            const db = getFirestore();
            const docRef = doc(db, "profiles", id);
            const docSnap = await getDoc(docRef);
            if (docSnap.exists()) {
                setUserProfile(docSnap.data());
                setdataLoading(false);
            }else{
                console.log("not exists");
            }
        })();
    }, [id]);

    return({ dataLoading, userProfile}) ;
}
