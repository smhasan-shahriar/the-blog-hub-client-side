import React from 'react';
import { motion } from "framer-motion"

const Banner = () => {
    return (
        <div>
            <motion.div initial={{ opacity: 0, scale: 0.5 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ duration: 1 }} className="hero min-h-[500px]" style={{backgroundImage: 'url(https://i.ibb.co/LhbTpZf/retrosupply-j-Lw-VAUt-LOAQ-unsplash.jpg)'}}>
  <div className="hero-overlay bg-opacity-60"></div>
  <div className="hero-content text-center text-neutral-content">
    <div className="max-w-md">
      <h1 className="mb-5 text-5xl font-bold">The Blog Hub: Navigating the Real World</h1>
      <p className="mb-5">Discover the unfiltered truth of everyday life, explore personal growth, relationships, and well-being, and find inspiration for your unique journey.</p>
    </div>
  </div>
</motion.div>
        </div>
    );
};

export default Banner;