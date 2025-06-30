import React from 'react';
import useAuth from '../Hooks/useAuth';
import Loader from '../Pages/Loader';
import { Navigate, useLocation } from 'react-router';

const PrivetRoute = ({children}) => {
    const{ user, loading }= useAuth();
    const location = useLocation();
    
    if(loading){
        return <Loader></Loader>
    }
    
    if(!user){
        return <Navigate  state={{ from:location.pathname }} to="/login"></Navigate>
    }

    
    return children;
  

  
    
};

export default PrivetRoute;