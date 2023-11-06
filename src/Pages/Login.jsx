import React, { useContext } from "react";
import { AiOutlineGoogle } from "react-icons/ai";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import useAuth from "../Hooks/useAuth";


const LogIn = () => {
  const { logIn, socialLogIn } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const handleSocialLogin = () => {
    
    socialLogIn()
    .then(result =>{
        console.log(result.user);
        navigate(location?.state ? location.state : "/");
        toast('You have successfully logged in');

    })
    .catch(error => {
        console.log(error.message)
        toast(error.message)
    })
  }  
  const handleLogIn = (e) => {
    e.preventDefault();
    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;
    logIn(email, password)
      .then((result) => {
        console.log(result.user);
        navigate(location?.state ? location.state : "/");
        toast('You have successfully logged in')
      })
      .catch((error) => {
        toast(error.message);
      });
      e.target.reset();
  };
  return (
    <div className="min-h-screen mt-20 md:mt-0 py-20 bg-gradient-to-r from-pink-300 via-purple-300 to-indigo-400 flex justify-center items-center">
      <div className="flex items-center justify-center">
        <div>
          <h2 className="text-5xl font-bold mb-10 text-center">Login Now</h2>
          <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
            <form onSubmit={handleLogIn} className="card-body">
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Email</span>
                </label>
                <input
                  type="email"
                  placeholder="email"
                  className="input input-bordered"
                  name="email"
                  required
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Password</span>
                </label>
                <input
                  type="password"
                  placeholder="password"
                  className="input input-bordered"
                  name="password"
                  required
                />
              </div>
              <div className="form-control mt-6">
                <input
                  className="btn bg-gradient-to-r from-pink-300 via-purple-300 to-indigo-400 text-white normal-case text-xl"
                  type="submit"
                  value="Login"
                />
              </div>
              <p>
                Do not have account? Please{" "}
                <Link to="/register">
                  <span className="btn btn-link p-0 normal-case">Register</span>
                </Link>
              </p>
              <div onClick={handleSocialLogin} className="flex items-center">
                <p className="btn btn-ghost normal-case btn-outline text-blue-600">
                  <AiOutlineGoogle></AiOutlineGoogle> Login with Google
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LogIn;