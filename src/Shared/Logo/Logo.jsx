import React from 'react';
import logo from '../../assets/logo.png'

const Logo = () => {
    return (
        <div className='flex items-end'>
            <img className='mb-2' src={logo}/>
            <p className='font-extrabold text-3xl -ml-3'>Profast</p>
        </div>
    );
};

export default Logo;