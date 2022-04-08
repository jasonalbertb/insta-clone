import React, {useEffect, useState} from 'react'
import { Link, useNavigate, useParams} from "react-router-dom";
import {useGlobalContext} from "../../context/globalContext";
//constants
import {ROUTES} from "../../constants/routes";
//components
import {FooterNav} from "../../components/footers/footerNav";
import {UserHeader} from "../../components/headers/UserHeader";
import {PhotoTabs} from "../../components/PhotoTabs";
import { OptionSidebar} from "../../components/OptionSidebar";
import {FollowBtn} from "./FollowBtn";
//context
import {ProfileContext} from "../../context/ProfileContext";

import {getAuth} from "firebase/auth";
import {ReactLoader2} from "../../components/ReactLoader2";
//services
import {getUserDataByUserId, getPostIdsByUserId} from "../../services/firebase";

const Profile = () => {
  const navigate = useNavigate();
  const {setError} = useGlobalContext();
  const {userId} = useParams();
  const [postIds, setPostIds] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [userData, setUserData] = useState(null);

  const [isOptionOpen, setIsOptionOpen] = useState(false);
  const handleOptionButton = (action)=>{
    setIsOptionOpen(action === "open");
  }
 
  useEffect (()=>{
    (async()=>{
      try {
        const data = await getUserDataByUserId(userId);
        if (!data) {
          throw new Error("User does not exist");
        }  
        const pIds = await getPostIdsByUserId(userId);
        setUserData(data);
        setPostIds(pIds);
        setIsLoading(false);
      } catch (error) {
        setError(error);
        navigate(ROUTES.ERROR);
      }
    })()
  }, [userId, setError, navigate]);

  if (isLoading) {
    return <ReactLoader2 />
  }

  const overflow = isOptionOpen
  return (
    <ProfileContext.Provider
      value={{
        isOptionOpen, handleOptionButton,
        userData
      }}
    >
      <> 
        <OptionSidebar />
        <div className={`w-screen h-screen bg-white ${overflow && "overflow-hidden"}`}>
          <UserHeader />
          <div className='border-b border-gray-300 p-4'>
            <div className='flex w-[350px]'>
              <img 
                className='h-20 w-20 rounded-full object-center object-cover block mr-4'
                src={userData.profilePic} alt={userData.username}
              />
              <div className='p-2 pb-4 flex-1'>
                <p className='text-2xl font-light mb-2'>{userData.username}</p>
                {(getAuth().currentUser.uid === userId?
                  <Link 
                    to={ROUTES.ACC_EDIT}
                    className='block text-center border py-1 text-sm font-semibold rounded w-4/5 '>
                      Edit Profile
                  </Link>:
                  <div className='flex'>
                    <Link 
                      to={ROUTES.MSG_CONVO(userId)}
                      className='rounded-md block text-center flex-1 mx-2 text-sm font-semibold border py-1 border-gray-300'>
                      Message
                    </Link>
                    <FollowBtn id={userId}/>
                  </div>

                )}
                
              </div>
            </div>
            <p className=' text-sm font-semibold'>
              {userData.fullname}
            </p>
          </div>     
          <div className='border-b border-gray-300 flex justify-around py-2'>
            <span className='flex flex-col justify-center items-center text-sm'>
              <span className='font-semibold'>{postIds.length}</span>
              <span className='text-gray-500'>post</span>
            </span>
            <Link to={ROUTES.FOLLOWER_PAGE(userId)}>
              <span className='flex flex-col justify-center items-center text-sm'>
                <span className='font-semibold'>{userData.followers.length}</span>
                <span className='text-gray-500'>{userData.followers.length > 1? "followers": "follower"}</span>
              </span>
            </Link>
            <Link to={ROUTES.FOLLOWING_PAGE(userId)}>
              <span className='flex flex-col justify-center items-center text-sm'>
                <span className='font-semibold'>{userData.following.length}</span>
                <span className='text-gray-500'>following</span>
              </span>
            </Link>
          </div>
          <PhotoTabs postIds={postIds}/>
          <FooterNav />
        </div>
      </>  
    </ProfileContext.Provider>
    
  )
}

export default Profile
