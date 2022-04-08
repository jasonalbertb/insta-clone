import React, { useEffect } from 'react'

export const Modal = ({modalMsg, closeModal}) => {
    useEffect(()=>{
        const timeout = setTimeout(closeModal, 2000);
        return () =>{
            clearTimeout(timeout);
        }
    })
    return (
        <div className='w-full text-center mb-1 capitalize tracking-wide text-xs text-red-500'>{modalMsg}</div>
    )
}
