import React from 'react'
import {useGetUserById} from "../../hooks/useGetUserById";
import Skeleton from "react-loading-skeleton";
export const CommentItem = ({comment}) => {
   
    const {dataLoading, userProfile} = useGetUserById(comment.commentBy);

    if (dataLoading) {
        return <Skeleton height={16}/>
    }
    return (
        <li className=' pb-1'>
            <span className='text-sm font-semibold'>{userProfile.username} </span> {comment.comment}
        </li>
    )
}
