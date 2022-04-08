import React from 'react'
import Skeleton from 'react-loading-skeleton'
export const GridLoading = () => {
  return (
    <div className='grid grid-cols-3 gap-1'>
      {[...new Array(9)].map((_, i)=>{
        return <div key={i} className="w-auto h-32">
          <Skeleton width={"100%"} height={"100%"}/>
        </div>
      })}
    </div>
  )
}
