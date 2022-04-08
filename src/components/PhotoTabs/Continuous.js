import React from 'react'
import {PostTemplate} from "../PostTemplate";

 
export const Continuous = ({postIds}) => {  

  return (
    <div className='pb-16'>
      {postIds.map(postId=>{
        return (
          <PostTemplate key={postId} postId={postId}/>
        )
      })}
    </div>
  )
}
