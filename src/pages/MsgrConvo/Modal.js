import React from 'react'

export const Modal = ({header="Error",  content, closeModal}) => {
    const handleCancel = ()=>{
        closeModal();
    }
    return (
        <div className='fixed top-0 left-0 w-screen h-screen bg-black-rgba grid place-items-center z-50'>
            <div className='w-8/12 rounded-lg bg-white text-center'>
                <div className='border-b border-gray-300 px-6 py-4'>
                    <p className='text-xl font-semibold mb-1'>{header}</p>
                    <p>{content}</p>
                </div>
                <button 
                    onClick={handleCancel}
                    className='font-bold text-sky-500 py-2'
                >Dismiss</button>
            </div>
        </div>
    )
}
