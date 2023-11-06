import React from "react";
import { toast } from "react-toastify";

const NewsLetter = () => {
    const handleSubscribe = e => {
        e.preventDefault();
        const form = e.target;
        form.reset();
        toast('Thank you for subscribing to our newsletter');
        
    }
  return (
    <div className="max-w-[1260px] mx-auto my-20 flex flex-col lg:flex-row gap-10 items-center">
      <div className="hero bg-yellow-200 py-10">
        <div className="hero-content flex-col lg:flex-row">
          <img
            src="https://i.ibb.co/DDS2C3W/newsletter.jpg"
            className="max-w-sm rounded-lg shadow-2xl"
          />
          <div className="lg:w-1/2">
            <h1 className="text-5xl font-bold">Subscribe to our Newsletter!</h1>
            <p className="py-6">
              Subscribe to our newsletter and get email of new blog
            </p>
            <form onSubmit={handleSubscribe}> 
              <div className="form-control">
                <label className="input-group">
                  <span>Email</span>
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

      {/* <div>
        <img src="https://i.ibb.co/DDS2C3W/newsletter.jpg" alt="" />
      </div>
      <div>
        <h2>Subscribe to our Newsletter!</h2>
        <p>Subscribe to our newsletter and get email of new blog</p>
        <div className="form-control">
          <label className="input-group">
            <span>Email</span>
            <input
              type="text"
              placeholder="info@site.com"
              className="input input-bordered"
            />
          </label>
        </div>
      </div> */}
    </div>
  );
};

export default NewsLetter;
