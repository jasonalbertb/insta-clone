import React from 'react'
import {useGlobalContext} from "../context/globalContext";
import {LogoHeader} from "../components/headers/LogoHeader";
import { ROUTES } from '../constants/routes';
import {Link} from "react-router-dom";
const Error = () => {
    const {error} = useGlobalContext();
    return (
        <>
            <LogoHeader />
            <div className='mt-20 grid place-items-center'>
                <div className='mt-12 p-4 text-center w-full max-w-sm px-4'>
                <p className='text-lg font-bold'> Something went wrong</p>
                {error.message && <p >{error.message}</p>}
                <Link to={ROUTES.DASHBOARD} className='block text-blue-700 text-sm mt-2'>
                    Go back to Instagram</Link>
                </div>
            </div>
        </>
    )
}

export default Error