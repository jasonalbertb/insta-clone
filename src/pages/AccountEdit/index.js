import React, {useState, useEffect} from 'react';
import {useNavigate} from "react-router-dom";
import {getAuth} from "firebase/auth";
import {getUserDataByUserId} from "../../services/firebase";
import {useGlobalContext} from "../../context/globalContext";
//constants
import {ROUTES} from "../../constants/routes";
//components
import {BasicHeader} from "../../components/headers/BasicHeader";
import {ReactLoader2} from "../../components/ReactLoader2";
import {ChangeProfileBtn} from "./ChangeProfileBtn";
const AccountEdit = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [userData, setUserData] = useState(null);
  const {setError} = useGlobalContext();
  useEffect(()=>{
    (async()=>{
      try {
        const uid = getAuth().currentUser.uid;
        const data = await getUserDataByUserId(uid);
        if (data) {
          setUserData(data);
          setIsLoading(false);
        }
      } catch (error) {
        setError(error);
        navigate(ROUTES.ERROR);
      }
    })()
  }, [navigate, setError])

  if (isLoading) {
    return <ReactLoader2 />
  }
  return (
    <>
      <BasicHeader title="Edit Profile"/>    
      <div className='pt-12 m-6'>
        <div className='flex'>
          <img 
            className='w-12 h-12 rounded-full object-cover object-center mr-6 mb-6'
            src={userData.profilePic} alt={userData.username}
          />
          <div className='text-lg font-medium leading-5 grid place-items-center'>
           <p> {userData.fullname} <br />
              <ChangeProfileBtn />
           </p>
          </div>
        </div>
        <div>
          <h4 className='text-base font-medium'>Name</h4>
          <p className='border px-4 py-1'>{userData.username}</p>
        </div>
      </div>
    </>
  )
}

export default AccountEdit