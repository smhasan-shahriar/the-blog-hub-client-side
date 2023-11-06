import React from "react";
import { useNavigate } from "react-router-dom";

const BlogCard = ({ blog }) => {
  const { _id, title, image, category, short, long } = blog;
  const navigate = useNavigate()
  const handleClickDetails = id => {
    navigate(`/blogs/${id}`)
  }
  return (
    <div>
      <div className="card card-compact  h-[500px] bg-base-100 shadow-xl">
  <figure><img className="w-full h-[250px] object-cover" src={image} /></figure>
  <div className="card-body">
    <h2 className="card-title">{title}</h2>
    <p>{short}</p>
    <p>Category:<span className="bg-orange-600 py-1 px-2 text-white rounded-lg ml-3"> {category}</span></p>
    <div className="card-actions justify-end">
        <button className="btn normal-case font-medium">Add to Wishlist</button>
      <button onClick={() => handleClickDetails(_id)} className="btn btn-primary normal-case font-medium">Details</button>
    </div>
  </div>
</div>
    </div>
  );
};

export default BlogCard;
