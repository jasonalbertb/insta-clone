import React,{useState, useEffect} from 'react'
import {MdOutlineAddCircle} from "react-icons/md";
import {DPCircle} from "../../components/DPCircle";
import {getAuth} from "firebase/auth";
import {getUserDataByUserId} from "../../services/firebase";
export const MyDayComponent = () => {
    const user = getAuth().currentUser;
    const [isLoading, setIsLoading] = useState(true);
    const [following,setFollowing] = useState([]);
    useEffect(()=>{
      (async()=>{
        const data = await getUserDataByUserId(getAuth().currentUser.uid);
        if (data) {
          setFollowing(data.following);
          setIsLoading(false);
        }
      })()
    }, []);
    return (
      <div className='p-4 bg-gray-50 border-b border-gray-300 flex items-center'>
          <div className='w-16 h-16 relative mr-4'>
              <img
                  className='block w-full border h-full object-cover object-center rounded-full'
                  src={user.photoURL} alt={user.displayName}
              />
              <div className='absolute bottom-0 right-0 bg-white w-5 h-5 rounded-full'>
                  <MdOutlineAddCircle className='w-full h-full text-sky-500'/>
              </div>
          </div>
          {!isLoading &&
            following.slice(0, 3).map((profileId, id)=>{
              return(
                <div className='mr-2' key={id}><DPCircle profileId={profileId}/></div>
              ) 
            })
          }
      </div>
  )
}
