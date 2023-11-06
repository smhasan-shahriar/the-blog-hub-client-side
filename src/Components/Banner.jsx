import React from 'react';

const Banner = () => {
    return (
        <div>
            <div className="hero min-h-[500px]" style={{backgroundImage: 'url(https://i.ibb.co/LhbTpZf/retrosupply-j-Lw-VAUt-LOAQ-unsplash.jpg)'}}>
  <div className="hero-overlay bg-opacity-60"></div>
  <div className="hero-content text-center text-neutral-content">
    <div className="max-w-md">
      <h1 className="mb-5 text-5xl font-bold">The Blog Hub: Navigating the Real World</h1>
      <p className="mb-5">Discover the unfiltered truth of everyday life, explore personal growth, relationships, and well-being, and find inspiration for your unique journey.</p>
    </div>
  </div>
</div>
        </div>
    );
};

export default Banner;