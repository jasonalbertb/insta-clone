import React from 'react'
import { Navigate, Outlet} from "react-router-dom";
import {ROUTES} from "../constants/routes";

export const ProtectedRoute = ({
        user, 
        redirectPath = ROUTES.LOGIN,
        children
    }) => {
    if (!user) {
        return <Navigate to={redirectPath} />
    }
    return children ? children : <Outlet />
}
