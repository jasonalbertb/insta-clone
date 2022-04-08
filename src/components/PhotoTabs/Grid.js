import React, { useEffect, useState } from 'react'
import {
  getFirestore, query, collection, documentId, FieldPath, where, getDocs
} from "firebase/firestore";
import {GridLoading} from "./GridLoading";
export const Grid = ({postIds}) => {
  const [postData, setPostData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(()=>{
    (async()=>{
      if (postIds.length > 0){
        const db = getFirestore();
        const q = query(collection(db, "posts"), where(documentId(FieldPath), "in",  postIds));
        const querySnapshot = await getDocs(q);
        const data = [];
        querySnapshot.forEach((doc) => {
          data.push({id: doc.id, ...doc.data()});
        });
        setPostData(data);
        setIsLoading(false);
      }
    })()
  }, [postIds]);

  if (isLoading) {
    return <GridLoading />
  }
  return (
    <div className='grid grid-cols-3 gap-1 pb-16'>
      {postData.map((data, i)=>{
        return(
          <img
            className='block w-full h-full object-cover object-center' 
            key={data.id} src={data.content} alt={data.caption}
          />)
      })}
    </div>
  )
}
