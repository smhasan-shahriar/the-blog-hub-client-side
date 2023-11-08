import React, { useContext, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import useAuth from "../Hooks/useAuth";
import { toast } from "react-toastify";



const NavBar = () => {
  
  const { user, logOut } = useAuth()
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const handleLogOut = () => {
    logOut()
      .then(() => toast("logged out"))
      .catch((error) => console.error(error.message));



   
   
  };
  const navLinks = (
    <>
      <li>
        <NavLink to="/">Home</NavLink>
      </li>
      {
        user &&  <li>
        <NavLink to="/addblog">Add Blog</NavLink>
      </li>
      }
     
      <li>
        <NavLink to="/allblogs">All Blogs</NavLink>
      </li>
      <li>
        <NavLink to="/featuredblogs">Featured Blogs</NavLink>
      </li>
      {
        user && <li>
        <NavLink to="/wishlist">Wishlist</NavLink>
      </li>
      }
      
    </>
  );
  return (
    <div>
      <div className="navbar bg-base-100 max-w-[1260px] mx-auto">
        <div className="navbar-start">
          <div className="dropdown" onClick={() => setIsDropdownOpen(!isDropdownOpen)}>
            <label tabIndex={0} className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </label>
            {
              isDropdownOpen && (
                <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
              >
                {navLinks}
              </ul>
              )
            }
          
          </div>
          <img className="md:w-12 w-8" src="https://i.ibb.co/VT2mhg5/icons8-blog-96.png" alt="" />
          <a className="normal-case font-bold lg:text-lg">The Blog Hub</a>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">{navLinks}</ul>
        </div>
        {user ? (
          <div className="navbar-end lg:space-x-4 md:space-x-2 space-x-1">
            <p>{user?.displayName}</p>
            <img
              className="w-12 h-12 rounded-full"
              src={user.photoURL}
              alt=""
            />
            <Link onClick={handleLogOut} className="btn font-bold">
              Log Out
            </Link>
          </div>
        ) : (
          <div className="navbar-end">
            <Link className="btn mr-4" to="/login">Log In</Link>
          <Link className="btn" to="/register">Register</Link>
          </div>
        )}

      </div>
    </div>
  );
};

export default NavBar;
