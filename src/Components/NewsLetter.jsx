import React from "react";
import { toast } from "react-toastify";
import Lottie from 'lottie-react';
import animationData from "../../public/mailAnimation.json";

const NewsLetter = () => {
    const handleSubscribe = e => {
        e.preventDefault();
        const form = e.target;
        form.reset();
        toast('Thank you for subscribing to our newsletter');
        
    }
  return (
    <div className="max-w-[1260px] mx-auto my-20 flex flex-col lg:flex-row gap-10 items-center">
      <div className="hero bg-orange-400 py-10 shadow-xl">
        <div className="hero-content flex-col lg:flex-row">
        <Lottie
        animationData={animationData}
        loop={true}
        autoplay={true}
      />
          <div className="lg:w-1/2 text-white">
            <h1 className="text-5xl font-bold">Subscribe to our Newsletter!</h1>
            <p className="py-6">
              Subscribe to our newsletter and get email of new blog
            </p>
            <form onSubmit={handleSubscribe}> 
              <div className="form-control">
                <label className="input-group">
                  <span className="text-black">Email</span>
                  <input
                    type="email"
                    placeholder="Your Email"
                    className="input input-bordered w-full"
                    required
                  />
                </label>
              </div>
              <input className="btn w-full my-5" type="submit" value="Subscribe" />
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewsLetter;
