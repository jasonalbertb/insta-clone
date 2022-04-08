import  { useEffect } from 'react'
import {useGlobalContext} from "../context/globalContext";
import {getAuth, onAuthStateChanged} from "firebase/auth";
import {getUserDataByUserId} from "../services/firebase";

export const useAuthChanged = () => {
    const {isFirebaseInitialized, setUser, setIsLoading} = useGlobalContext();

    return (
        useEffect(()=>{
           (async()=>{
                try {
                    if (isFirebaseInitialized) { 
                        const auth = getAuth();
                        const unsub = onAuthStateChanged(auth, async(user)=>{
                            setIsLoading(true);
                            if (user) {    
                                const userData =  await getUserDataByUserId(user.uid);  
                                const {username, profilePic} = userData;
                                setUser({username, profilePic});
                            }else{
                                setUser(null);
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
        }, [isFirebaseInitialized, setIsLoading, setUser])
    );
}
