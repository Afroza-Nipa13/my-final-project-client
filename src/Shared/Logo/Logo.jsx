import React from 'react';
import logo from '../../assets/logo.png'
import { Link } from 'react-router';

const Logo = () => {
    return (
        <Link to="/" className='flex items-end'>
            <img className='mb-2' src={logo}/>
            <p className='font-extrabold text-3xl -ml-3'>Profast</p>
        </Link>
    );
};

export default Logo;