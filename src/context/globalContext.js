import React, { useContext, useState } from "react";

export const AppContext = React.createContext();

export const AppProvider = ({children})=>{
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(false);
    const [isFirebaseInitialized, setIsFirebaseInitialized] = useState(false);
    const [user, setUser] = useState(null); 
    return( 
        <AppContext.Provider value={{
            isLoading, setIsLoading,
            isFirebaseInitialized, setIsFirebaseInitialized,
            user, setUser,
            error, setError
        }}>{children}
        </AppContext.Provider>
    ) 
}

export const useGlobalContext = ()=>{
   return useContext(AppContext);
}
