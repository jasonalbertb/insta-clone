import React from 'react'
import Skeleton from "react-loading-skeleton";
import {CommentHeader} from "../../components/headers/CommentHeader";
export const PostCommentLoadingPage = ({header_height}) => {
  return (
    <>
                <CommentHeader title={"Comments"} header_height={header_height}/>
                <div className={`pt-26 p-5`}>
                    <div className=' flex border-b py-5'>
                        <Skeleton circle={true} width={32} height={32}/>
                        <div className='flex-1 px-5'>
                            <p className="block pb-2">
                                <Skeleton width={"100%"} height={50} />
                            </p>
                            <p><Skeleton /></p>
                        </div>
                    </div>
                    {[...new Array(2)].map((item, i)=>{
                        return (
                            <div key={i} className=' flex py-5'>
                                <Skeleton circle={true} width={32} height={32}/>
                                <div className='flex-1 px-5'>
                                    <p className="block pb-2">
                                        <Skeleton width={"100%"} height={50} />
                                    </p>
                                    <p><Skeleton /></p>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </>
  )
}
