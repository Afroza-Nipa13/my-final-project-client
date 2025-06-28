import React from 'react';
import Logo from './Logo/Logo';
import { NavLink } from 'react-router';
import { MdArrowOutward } from 'react-icons/md';
import useAuth from '../Hooks/useAuth';
import Swal from 'sweetalert2';

const NavBar = () => {
  const { user, logOut } = useAuth()

  const handleLogOut = () => {
    logOut().then(() => {
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "You are logged out successfully",
        showConfirmButton: false,
        timer: 1500
      });
    }).catch(error => {
      console.log(error)
    })

  }
  const links = <>
    <NavLink to='/'><li>Services</li></NavLink>
    <NavLink to='/coverage'><li>Coverage</li></NavLink>
    <NavLink to='/aboutUs'><li>About Us</li></NavLink>
    <NavLink to='/sendParcel'><li>Send A Parcel</li></NavLink>
    
    {
      user && <>
      <NavLink to='/dashboard'><li>Dashboard</li></NavLink>
      </>
    }
    <NavLink to='/'><li>Pricing</li></NavLink>
    <NavLink to='/be-a-rider'><li>Be a Rider</li></NavLink>
  </>
  return (
    <div className="navbar bg-base-100 shadow-sm">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /> </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
            {links}
          </ul>
        </div>
        <Logo></Logo>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1 gap-5">
          {links}
        </ul>
      </div>
      {user ? <div className='navbar-end'>
        <button onClick={handleLogOut} className="btn">Sign Out</button>
      </div>
        :
        <div className="navbar-end">
          <NavLink to='/login' className="btn">Sign In</NavLink>
          <NavLink className="btn rounded-4xl bg-primary border-none text-secondary">Be a rider</NavLink>
          <NavLink className='btn btn-circle bg-secondary text-primary'><MdArrowOutward className='w-6 h-6 ' /></NavLink>
        </div>
      }

    </div>
  );
};

export default NavBar;