import React, { useContext, useEffect, useState } from 'react'
import {useNavigate} from "react-router-dom";
import {FiChevronLeft} from "react-icons/fi";
import {useGlobalContext} from "../../context/globalContext";
import {RiShareForward2Line} from "react-icons/ri";
import {PostCommentContext} from "../../context/PostCommentContext";
import {getAuth} from "firebase/auth";
//constants
import {ROUTES} from "../../constants/routes";
//services
import {addCommentToPost} from "../../services/firebase";

export const CommentHeader = ({title, header_height}) => {
  const user = getAuth().currentUser;
  const {setError} = useGlobalContext();
  const {postId} = useContext(PostCommentContext);
  const [comment, setComment] = useState("");
  const [isSubmitDisabled, setIsSubmitDisabled] = useState(true);
  const navigate = useNavigate();
  const handleBackButton = ()=>{
    navigate(-1);
  }
  const handleSubmit = async(e)=>{
    try {
      e.preventDefault();
      const userId = getAuth().currentUser.uid;
      await addCommentToPost({postId, comment, commentBy: userId, likes: []});
      setComment("");
    } catch (error) {
      console.log(error);
      setError(error);
      navigate(ROUTES.ERROR);
    }   
  }

  useEffect(()=>{
    setIsSubmitDisabled(comment==="");
  }, [comment])

  return (
    <div className={`fixed w-full h-${header_height} top-0 left-0 bg-white`}>
      <div className='flex items-center justify-between px-4'>
        <button onClick={handleBackButton}><FiChevronLeft className=' w-8 h-8'/></button>
        <p className='font-semibold py-2'>{title}</p>
        <button><RiShareForward2Line className=' w-6 h-6'/></button>
      </div>
      <div className='bg-gray-100 border-y border-gray-200 flex px-4 py-2 items-center'>
        <img 
          className='h-8 w-8 rounded-full object-center object-cover mr-4'
          src={user.photoURL} alt={user.displayName}
        />
        <form className='flex-1 relative' onSubmit={addCommentToPost}>
          <input
            className='w-full h-full px-4 py-3 rounded-full border border-gray-300 text-sm focus:outline-none'
            type="text" placeholder="Add a comment..."
            value={comment}
            onChange={e=>setComment(e.target.value)}
          />
          <button 
            className={`cursor-pointer absolute right-4 top-3 text-sm font-semibold ${isSubmitDisabled? "text-gray-400": "text-sky-300" }`}
            onClick={handleSubmit}
            type='submit' 
            disabled={isSubmitDisabled}
          >
            Post
          </button>
        </form>
      </div>
    </div>
  )
}
