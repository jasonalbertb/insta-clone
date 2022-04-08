import React from 'react'
import Skeleton from "react-loading-skeleton";
export const ProfilesLoading = () => {
  return (
    <div>
        {[...new Array(5)].map((_, i)=>{
            return (
                <div className='flex items-center p-2'>
                    <div className='w-16 h-16 rounded-full mr-2 leading-none overflow-hidden'>
                        <Skeleton width={"100%"} height={"100%"}/>
                    </div>
                    <div className='flex-1'>
                        <div className='w-32 h-4 mb-1 leading-none overflow-hidden'>
                            <Skeleton width={"100%"} height={"100%"}/>
                        </div>
                        <div className='w-16 h-4 leading-none overflow-hidden'>
                            <Skeleton width={"100%"} height={"100%"}/>
                        </div>
                    </div>
                </div>
            )
        })}
    </div>
  )
}
