import React from 'react'
import Skeleton from 'react-loading-skeleton'
export const PostLoading = () => {
  return (
    <div>
        <div className='flex items-center my-2'>
            <div className='border-2 w-12 h-12 leading-none rounded-full overflow-hidden'>
                <Skeleton width={"100%"} height={"100%"}/>
            </div>
            <div className='ml-2'><Skeleton width={150}/></div>
        </div>
        <div className='w-full h-64 leading-none'>
            <Skeleton width={"100%"} height={"100%"}/>
        </div>
    </div>
  )
}
