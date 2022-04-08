import  { useEffect } from 'react'
import {useGlobalContext} from "../context/globalContext";
import {getAuth, onAuthStateChanged,updateProfile} from "firebase/auth";
import {getUserDataByUserId} from "../services/firebase";

export const useAuthChanged = () => {
    const {isFirebaseInitialized, setUserEmail, setIsLoading} = useGlobalContext();

    return (
        useEffect(()=>{
           (async()=>{
                try {
                    if (isFirebaseInitialized) { 
                        const auth = getAuth();
                        const unsub = onAuthStateChanged(auth, async(user)=>{
                            setIsLoading(true);
                            if (user) {    
                                if (!user.displayName || !user.photoURL) {
                                    const userData =  await getUserDataByUserId(user.uid);
                                    await updateProfile(auth.currentUser, {
                                        displayName: userData.username,
                                        photoURL: userData.profilePic
                                    })
                                }
                                setUserEmail(user.email);
                            }else{
                                setUserEmail(null);
                            }
                            setIsLoading(false);
                        })
                        return ()=> {
                            unsub()
                        }; 
                    } 
                } catch (error) {
                    console.log(error);
                }
           })();
        }, [isFirebaseInitialized, setIsLoading, setUserEmail])
    );
}
