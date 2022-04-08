import React, {useEffect, useState} from 'react';
import ReactDom from "react-dom";
import {useNavigate} from "react-router-dom";
import {useParams} from "react-router-dom";
import {ReactLoader2} from "../../components/ReactLoader2";
import {useGlobalContext} from "../../context/globalContext";
import {HiOutlineInformationCircle,HiOutlineChevronLeft, HiOutlineHeart} from "react-icons/hi";
import {MdPhotoCameraBack} from "react-icons/md";
import { ROUTES } from '../../constants/routes';
import {getUserDataByUserId, sendMessageTo} from "../../services/firebase";
import {Modal} from "./Modal";
import {MsgBody} from "./MsgBody";
const MsgrConvo = () => {
  const navigate = useNavigate();
  const {setError} = useGlobalContext();
  const {id} = useParams();
  const [chatUserdata, setChatUserdata] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [msgInput, setMsgInput] = useState("");
  const [isMsgBtnDisabled, setIsMsgBtnDisabled] = useState(false);
  const [modalMsg, setModalMsg] = useState("");

  const closeModal = ()=>{
    setModalMsg("");
  }
  const handleBack = ()=>{
    navigate(-1);
  }

  const handleMsgSubmit = (e)=>{
    e.preventDefault();
    (async()=>{
     try {
      if (msgInput) {
        setIsMsgBtnDisabled(true);
        await sendMessageTo(id, msgInput);
      }
     } catch (error) {
      setModalMsg("We're sorry, but something went wrong. Please try again.")
     }
     setIsMsgBtnDisabled(false);
     setMsgInput("");
    })()
  }

  useEffect(()=>{
    (async()=>{
      try { 
        const data = await getUserDataByUserId(id);
        if (!data) {
          throw new Error("Resource not found");
        }
        const {username, profilePic} = data;
        setChatUserdata({username, profilePic});
        setIsLoading(false);
      } catch (error) {
        setError(error);
        navigate(ROUTES.ERROR);
      }
    })()
  }, [setError, navigate, id]);

  if (isLoading) {
    return <ReactLoader2 />
  }

  return (
    <>
      <div className='py-2 px-4 fixed flex justify-between items-center top-0 left-0 w-full h-12 border-b border-gray-300 z-50 bg-white'>
        <div className='flex items-center'>
          <button 
            onClick={handleBack}
            className='inline-flex items-center'>
            <HiOutlineChevronLeft className='w-8 h-8'/>
          </button>
          <img 
            src={chatUserdata.profilePic}
            className='w-6 h-6 mr-2 rounded-full'  alt={chatUserdata.username}
          />
          <p className='font-semibold'>{chatUserdata.username}</p>
        </div>

        <div>
          <button><HiOutlineInformationCircle className='w-8 h-8'/></button>
        </div>
      </div>
      <MsgBody chatToId={id}/>
      <div className='fixed bottom-0 w-full z-50 bg-white'>
        <form
          className='relative px-4 py-2 chat-form' 
          onSubmit={handleMsgSubmit}
        >
          <input
            value={msgInput} onChange={e=>setMsgInput(e.target.value)}
            className='border border-gray-300 px-6 py-3 w-full rounded-full text-sm focus:outline-none'
            type="text" placeholder="Message..."
          />
          <button
            disabled={isMsgBtnDisabled} 
            className='text-sm font-semibold text-sky-500 absolute right-8 top-1/2 translate-y-[-50%]'  
            type='submit' >Send</button>
           <div className='absolute right-8 top-1/2 translate-y-[-50%] flex items-center'>
              <MdPhotoCameraBack className='w-6 h-6 mx-2'/>
              <HiOutlineHeart className='w-6 h-6'/>
           </div>
        </form>
      </div>
      {modalMsg && ReactDom.createPortal(
        <Modal content={modalMsg} closeModal={closeModal}/>,
        document.body
      )}
    </>
  )
}

export default MsgrConvo