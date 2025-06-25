import React from 'react';
import { Outlet } from 'react-router';
import Logo from '../Shared/Logo/Logo';
import authImage from '../assets/authImage.png'

const AuthLayOut = () => {
    return (
        <div className="p-20">
            <div>
                <Logo></Logo>
            </div>
  <div className="hero-content flex-col lg:flex-row-reverse">
    <img
      src={authImage}
      className="flex-1 max-w-sm rounded-lg shadow-2xl"
    />
    <div className='flex-1'>
    <Outlet></Outlet>
    </div>
  </div>
</div>
    );
};

export default AuthLayOut;