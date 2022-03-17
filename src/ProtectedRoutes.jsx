import React, {useContext} from 'react'
import {Outlet, Navigate, useLocation} from 'react-router';
import {UserContext} from './App';


const useAuth = () => {
    const {user} = useContext(UserContext)
    return user ? true : false
}


function ProtectedRoutes() {

    const isAuth = useAuth();
    const location = useLocation();


    return isAuth ? (
        <Outlet/>) : (
        <Navigate to={"/"}
            replace
            state={
                {from: location}
            }/>
    )
}

export default ProtectedRoutes
