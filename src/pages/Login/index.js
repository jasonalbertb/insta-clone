import React, { useEffect, useState } from 'react'

import { Link} from "react-router-dom";
import { Spinner} from "../../components/Spinner";
import {ROUTES } from "../../constants/routes"; 
import {FaFacebook} from "react-icons/fa";
import {Modal} from "./Modal";
import {FloatingInput} from "../../components/FloatingInput";
import {getAuth, signInWithEmailAndPassword} from "firebase/auth";


const Login = () => {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [submitDisabled, setSubmitDisabled] = useState(true);
  const [modalMsg, setModalMsg] = useState(null);
  
  const [submitLoading, setSubmitLoading] = useState(false);

  const closeModal = ()=>{
     setModalMsg(null);
  }

  const submitHandler = async(e)=>{
    e.preventDefault();
    try {
      setSubmitLoading(true);
      setSubmitDisabled(true);
      const auth = getAuth();
      await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
      console.log(error.message);
      setModalMsg(error.message);
      setSubmitLoading(false);
    }
  }

  useEffect(()=>{
    setSubmitDisabled(!(email && password))
  }, [email, password]);
  
  return (
    <div className='h-screen w-screen bg-gray-50'>
      <div className='container max-w-screen-md mx-auto py-5'>
      <div className="flex">
        <div className='w-1/2 hidden md:block'>
          <img
            src='/img/iphone-with-profile.jpg' 
            alt='phone-img'
            />
        </div>

        <form 
          onSubmit={submitHandler}
          className='w-full sm:w-96 md:w-1/2 mx-auto py-5'
        >

          <div className='sm:border sm:bg-white border-gray-300 text-center sm:px-10 px-12 py-8 mb-2' >
            <img 
              className='h-12 mx-auto mb-5' 
              src='/img/logo.png'
              alt='logo'
            />
            <div className='flex flex-col'>
              {modalMsg && <Modal modalMsg={modalMsg} closeModal={closeModal}/>}
              <FloatingInput 
                classname='my-2'
                value={email} onChange={(e)=>setEmail(e.target.value)} 
                label={"Email Address"} type={"text"}
              />
              <FloatingInput 
                classname='my-2'
                type="password" value={password} label={"Password"}
                onChange={(e)=>setPassword(e.target.value)}
              />
              <button 
                disabled={submitDisabled}
                type='submit' 
                className={`inline-flex items-center justify-center disabled:opacity-75 bg-sky-400 ${!submitDisabled && 'hover:bg-sky-600'} font-bold text-white p-1 rounded text-sm cursor-pointer transition ease-in`} >
                  {submitLoading && <Spinner />} Log in
              </button>
            </div>
            <div className='flex justify-between align-items-center mt-5 mb-7'>
              <div className='border-b border-gray-300 h-2 w-5/12'></div>
              <p className='text-xs font-medium text-gray-500'>OR</p>
              <div className='border-b border-gray-300 h-2  w-5/12'></div>
            </div>
            <p className='text-indigo-500 text-sm font-medium mb-4'><Link to="/"><FaFacebook className='inline'/> Login with facebook</Link></p>
            <p className='text-xs'>Forgot password?</p>
          </div>
          <div className='sm:border bg-white border-gray-300 text-center sm:py-5 text-sm'>
            Don't have an account? 
            <Link to={ROUTES.SIGN_UP}> <span className='text-indigo-500 font-medium'>Sign up</span> </Link>
          </div>
        </form>
      </div>

      </div>
    </div>

  )
}

export default Login

