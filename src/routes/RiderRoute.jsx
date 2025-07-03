import React from 'react';
import useAuth from '../Hooks/useAuth';
import Loader from '../Pages/Loader';
import useUserRole from '../Hooks/useUserRole';
import { Navigate } from 'react-router';

const RiderRoute = ({children}) => {
    const {user, loading}= useAuth();
    const {role, roleLoading}= useUserRole()
    if(loading || roleLoading){
        return <Loader></Loader>
    }

    if(!user || role !== "rider"){
        return <Navigate state={{from : location.pathname}} to='/forbidden'></Navigate>
    }
    
    return children;
};

export default RiderRoute;