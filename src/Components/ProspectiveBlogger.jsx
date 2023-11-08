import React from "react";
import { GrArticle, GrBook, GrBriefcase, GrBundle } from "react-icons/gr";
import { motion } from "framer-motion"

const ProspectiveBlogger = () => {
  return (
    
    <div className="max-w-[1260px] mx-auto my-20 shadow-xl">
      <motion.div initial={{ opacity: 0, scale: 0.5 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ duration: 2 }}
       className="flex flex-col-reverse md:flex-row items-center gap-10">
        <div className="w-full md:w-1/3">
          <img className="h-[500px] w-full object-cover"
            src="https://i.ibb.co/rZQMSYc/krakenimages-Y5bv-Rlc-Cx8k-unsplash.jpg"
            alt=""
          />
        </div>
        <div className="w-full md:w-1/2">
          <h2 className="font-bold text-6xl my-5">About Us</h2>
          <p>
            Welcome to The Blog Hub - Your Gateway to real story. We're a
            passionate team dedicated to sharing our expertise and love for real
            story. Explore, learn, and be inspired.
          </p>
          <p className="mt-5 text-xl font-bold">What we Offer</p>
          <ul className="ml-4">
            <li className="flex items-center gap-2"><GrArticle /> Insightful articles</li>
            <li className="flex items-center gap-2"><GrBook /> Practical tips and how-to guides.</li>
            <li className="flex items-center gap-2"><GrBriefcase /> Engaging stories and personal experiences.</li>
          </ul>
          <p className="my-5">
            Join us on this journey and discover the world of real stories. Connect with us for updates and
            more. Thanks for being a part of our community. Explore, learn, and
            be inspired!
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default ProspectiveBlogger;
