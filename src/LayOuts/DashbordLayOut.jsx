import React from 'react';
import { NavLink, Outlet } from 'react-router';
import Logo from '../Shared/Logo/Logo';
import { FaBoxOpen, FaCheckCircle, FaHistory, FaHome, FaMoneyBillWave, FaSearchLocation, FaTruck, FaUserCheck, FaUserEdit } from 'react-icons/fa';
import { ClockIcon, UsersIcon } from 'lucide-react';
import useUserRole from '../Hooks/useUserRole';

const DashbordLayOut = () => {
  const { role, roleLoading } = useUserRole();
  console.log(role, roleLoading)
  return (
    <div className="drawer lg:drawer-open">
      <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content flex flex-col">
        {/* Page content here */}
        <div className="navbar bg-base-300 w-full lg:hidden">
          <div className="flex-none">
            <label htmlFor="my-drawer-2" aria-label="open sidebar" className="btn btn-square btn-ghost">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                className="inline-block h-6 w-6 stroke-current"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                ></path>
              </svg>
            </label>
          </div>
          <div className="mx-2 flex-1 px-2 lg:hidden">Dashboard</div>

        </div>
        {/* Page content here */}
        <Outlet></Outlet>
      </div>
      <div className="drawer-side">
        <label htmlFor="my-drawer-2" aria-label="close sidebar" className="drawer-overlay"></label>
        <ul className="menu bg-base-200 text-base-content min-h-full w-80 p-4 space-y-4">
          {/* Sidebar content here */}
          <Logo></Logo>
          <li>
            <NavLink to="/" className="flex items-center gap-2">
              <FaHome />
              Home
            </NavLink>
          </li>
          <li>
            <NavLink to="/dashboard/myParcels" className="flex items-center gap-2">
              <FaBoxOpen />
              My Parcels
            </NavLink>
          </li>
          <li>
            <NavLink to="/dashboard/paymentHistory" className="flex items-center gap-2">
              <FaHistory />
              Payment History
            </NavLink>
          </li>

          <li>
            <NavLink to="/dashboard/profile" className="flex items-center gap-2">
              <FaUserEdit />
              Update Profile
            </NavLink>
          </li>
          {/* riders link */}
          {!roleLoading && role === 'rider' &&
            <>
              <li>
                <NavLink to="/dashboard/pending-deliveries" className="flex items-center gap-2">
                  <FaTruck />
                  Pending Deliveries
                </NavLink>
              </li>

              <li>
                <NavLink to="/dashboard/completed-deliveries" className="flex items-center gap-2">
                  <FaCheckCircle />
                  Completed Deliveries
                </NavLink>
              </li>

              <li>
                <NavLink to="/dashboard/my-earnings" className="flex items-center gap-2">
                  <FaMoneyBillWave />
                  My Earnings
                </NavLink>
              </li>


            </>
          }
          {/* admins link */}
          {!roleLoading && role === "admin" &&
            <>

              <li>
                <NavLink to="/dashboard/assign-rider" className="flex items-center gap-2">
                  <FaUserCheck />
                  Assign Rider
                </NavLink>
              </li>

              <li>
                <NavLink to="/dashboard/active-riders">
                  <UsersIcon className="w-4 h-4" />
                  Active Riders
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/pending-riders">
                  <ClockIcon className="w-4 h-4" />
                  Pending Riders
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/track" className="flex items-center gap-2">
                  <FaSearchLocation />
                  Track a Package
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/dashboard/admin-manager"
                  className='space-x-2'
                >
                  👑 Admin Manager
                </NavLink>
              </li>
            </>
          }
        </ul>
      </div>
    </div>
  );
};

export default DashbordLayOut;