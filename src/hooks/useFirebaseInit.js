import {useEffect} from "react";
import { initializeApp } from "firebase/app";
import {useGlobalContext} from "../context/globalContext";
export const useFirebaseInit = ()=>{

  const {setIsFirebaseInitialized} = useGlobalContext();
  
  return useEffect( ()=>{
    setIsFirebaseInitialized(false);
    try {
      const firebaseConfig = {
        apiKey: process.env.REACT_APP_apiKey,
        authDomain: process.env.REACT_APP_authDomain,
        projectId: process.env.REACT_APP_projectId,
        storageBucket: process.env.REACT_APP_storageBucket,
        messagingSenderId:process.env.REACT_APP_messagingSenderId,
        appId: process.env.REACT_APP_appId
      };
      initializeApp(firebaseConfig);
      setIsFirebaseInitialized(true);
    } catch (error) {
      console.log(error);
      setIsFirebaseInitialized(false);
    }
  }, [setIsFirebaseInitialized])
}

