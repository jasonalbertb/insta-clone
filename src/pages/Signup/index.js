import React, { useEffect, useState } from 'react'
import {Link} from "react-router-dom";
import {FaFacebook} from "react-icons/fa";
import {Modal} from "./Modal";
import {ROUTES} from "../../constants/routes";
import {Spinner} from "../../components/Spinner";
import {FloatingInput} from "../../components/FloatingInput";
import {createUser} from "../../services/firebase";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [fullname, setFullName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [submitDisabled, setSubmitDisabled] = useState(false);
  const [modalMsg, setModalMsg] = useState(null);

  const [submitLoading, setSubmitLoading] = useState(false);
  useEffect(()=>{
    setSubmitDisabled(!(email && fullname && username && password))
  }, [email, fullname, username, password]) 

  const onChangeHandler = (f)=>{
    return (e)=>{
      f(e.target.value);
    }
  }

  const closeModal = ()=> setModalMsg(null);

  const submitHandler = async(e)=>{
    e.preventDefault();
    try {
      setSubmitLoading(true);
      setSubmitDisabled(true);
      await createUser({ email, password, fullname, username});
    } catch (error) {
      setModalMsg(error);
      setSubmitLoading(false);
    }
  }

  return (
    <div className='h-screen w-screen bg-gray-50'>
      <div className='container max-w-screen-md mx-auto py-5'>
        <form 
          onSubmit={submitHandler}
          className='w-full sm:w-96 md:w-1/2 mx-auto'
        >
          <div className='sm:border sm:bg-white border-gray-300 text-center sm:px-10 px-12 py-8 mb-2' >
            <img 
              className='h-12 mx-auto mb-4' 
              src='/img/logo.png'
              alt='logo'
            />
            {modalMsg && <Modal modalMsg={modalMsg} closeModal={closeModal}/>}
            <p className='font-semibold text-gray-400 text-lg leading-5 mb-4'>
              Sign up to see photos and videos from your friends.
            </p>
            <Link 
              to="/"
              className='bg-sky-500  font-medium text-sm text-white p-2 rounded block justify-center'
            >
              <FaFacebook className='inline'/> Login in with Facebook
            </Link>

            <div className='flex justify-between align-items-center mt-5 mb-7'>
              <div className='border-b border-gray-300 h-2 w-5/12'></div>
              <p className='text-xs font-medium text-gray-500'>OR</p>
              <div className='border-b border-gray-300 h-2  w-5/12'></div>
            </div>

            <div className='flex flex-col'>
              <FloatingInput 
                classname='mb-2'
                type="text"
                label='Email'
                value={email}
                onChange={onChangeHandler(setEmail)}
              />
              <FloatingInput 
                classname='mb-3'
                type="text"
                label='Fullname'
                value={fullname}
                onChange={onChangeHandler(setFullName)}
              />
              <FloatingInput 
                classname='mb-3'
                type="text"
                label='Username'
                value={username}
                onChange={onChangeHandler(setUsername)}
              />
              <FloatingInput 
                className="mb-3"
                type="password"
                label='Password'
                value={password}
                onChange={onChangeHandler(setPassword)}
              />
              <button 
                disabled={submitDisabled}
                type='submit' 
                className={`mt-2 inline-flex items-center justify-center disabled:opacity-50 
                            bg-sky-400 ${!submitDisabled && 'hover:bg-sky-600'} font-bold
                            text-white p-1 rounded text-sm cursor-pointer transition ease-in`} >
                  {submitLoading && <Spinner />} Sign up
              </button>
            </div>
            <div className='flex justify-between align-items-center mt-5 mb-7'>
              <div className='border-b border-gray-300 h-2 w-5/12'></div>
              <p className='text-xs font-medium text-gray-500'>OR</p>
              <div className='border-b border-gray-300 h-2  w-5/12'></div>
            </div>
            <p className='text-xs text-gray-500 m-2'>By signing up, you agree to our
              <span className='font-semibold'> Terms</span>,
              <span className='font-semibold'> Data Policy</span> and
              <span className='font-semibold'> Cookies Policy</span>.
            </p>
          </div>
          <div className='sm:border sm:bg-white border-gray-300 text-center sm:px-10 px-12 py-8 mb-2'>
            <p className='text-sm'>Have an account? <span className='text-sky-500'><Link to={ROUTES.LOGIN}>Log in</Link></span></p> 
          </div>
        </form>
      </div>
    </div>
  )
}


export default Signup