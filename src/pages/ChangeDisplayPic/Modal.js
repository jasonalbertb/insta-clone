import React, {useEffect} from 'react'

export const Modal = ({modalMessage, closeModal}) => {
    useEffect(()=>{
        const timeout = setTimeout(closeModal, 5000);
        return ()=>{
            clearTimeout(timeout);
        }
    })
    return (
        <div className='text-center text-sm text-red-500 capitalize tracking-wider'>{modalMessage}</div>
    )
}
