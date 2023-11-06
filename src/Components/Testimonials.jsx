import React from "react";

const Testimonials = () => {
  return (
    <div className="max-w-[1260px] mx-auto my-20">
      <h2 className="text-center font-bold text-3xl">Testimonials</h2>
      <hr className="border-2 w-1/4 mx-auto my-4" />
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        <div className="flex flex-col justify-center items-center">
          <div className="avatar relative top-12 border-white rounded-full border-4">
            <div className="w-24 rounded-full">
              <img src="https://i.ibb.co/RyYXmJf/user-em-3.jpg" />
            </div>
          </div>
          <div className="bg-orange-600 pt-20 pb-10 px-5 text-white">
            <p className="text-center quoted-text text-xl font-semibold italic">The blog Hub consistently delivers insightful and practical content. I've learned so much and find myself coming back for more. Keep up the fantastic work!</p>
            <p className="font-medium text-lg text-center my-5"><span className="text-[#a6ff00] font-bold text-xl">Mr. Rehman</span> CEO of SHEBA</p>
          </div>
        </div>
        <div className="flex flex-col justify-center items-center">
          <div className="avatar relative top-12 border-white rounded-full border-4">
            <div className="w-24 rounded-full">
              <img src="https://i.ibb.co/gtX45HS/user-em-2.jpg" />
            </div>
          </div>
          <div className="bg-orange-600 pt-20 pb-10 px-5 text-white">
            <p className="text-center quoted-text text-xl font-semibold italic">The blog hub has become my go-to resource. The engaging articles and valuable tips have improved my life. Thank you for the inspiration and knowledge you provide.</p>
            <p className="font-medium text-lg text-center my-5"><span className="text-[#a6ff00] font-bold text-xl">Ms. Tanya</span> CEO of SHEBA</p>
          </div>
        </div>
        <div className="flex flex-col justify-center items-center">
          <div className="avatar relative top-12 border-white rounded-full border-4">
            <div className="w-24 rounded-full">
              <img src="https://i.ibb.co/ZN9FYzG/user-em-1.jpg" />
            </div>
          </div>
          <div className="bg-orange-600 pt-20 pb-10 px-5 text-white">
            <p className="text-center quoted-text text-xl font-semibold italic">I'm a loyal reader because the blog hub offers a perfect blend of information and inspiration. It's my daily dose of wisdom and motivation. Kudos to your fantastic work!</p>
            <p className="font-medium text-lg text-center my-5"><span className="text-[#a6ff00] font-bold text-xl">Ms. Xepher</span> CEO of SHEBA</p>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Testimonials;
