import React, {useState} from 'react';
import ReactDOM from "react-dom";
import {BsThreeDots} from "react-icons/bs";
//components
import {PostOptionModal} from "./PostOptionModal";
import {DeleteModal} from "./DeleteModal";
//context
import {PostOptBtnContext} from "../../context/PostOptBtnContext";
export const PostOptionBtn = ({postedBy, className, postId}) => {
  const [isOptModalOpen, setIsOptModalOpen] = useState(false);
  const [isDelModalOpen, setIsDelModalOpen] = useState(false);

  return (
    <PostOptBtnContext.Provider
      value={{
        postedBy, postId,
        setIsOptModalOpen, setIsDelModalOpen
      }}
    >
      <button 
        onClick={()=>setIsOptModalOpen(true)}
        className={`${className}`}>
        <BsThreeDots />
      </button>
      {(ReactDOM.createPortal(
        <>
          {isOptModalOpen && <PostOptionModal />}
          {isDelModalOpen && <DeleteModal />}
        </>,
        document.body
      ))}
    </PostOptBtnContext.Provider>
   
  )
}
 