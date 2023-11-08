import React from "react";
import useAuth from "../Hooks/useAuth";
import axios from "axios";
import { toast } from "react-toastify";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../Hooks/useAxiosSecure";

const UpdateBlog = () => {
  const axiosSecure = useAxiosSecure();
  const { id } = useParams();
  const handleUpdate = (e) => {
    e.preventDefault();
    const form = e.target;
    const title = form.title.value;
    const image = form.image.value;
    const category = form.category.value;
    const short = form.short.value;
    const long = form.long.value;
   
    const updatedBlog = { title, image, category, short, long };
    axiosSecure
      .put(
        `https://the-blog-hub-server.vercel.app/updateblog/${id}`,
        updatedBlog
      )
      .then((res) => {
        if (res.data.modifiedCount > 0) {
          toast("blog updated successfully");
        }
      });
  };
  const { data, isLoading, refetch } = useQuery({
    queryKey: ["singleBlogData"],
    queryFn: () =>
      axiosSecure
        .get(`https://the-blog-hub-server.vercel.app/blogs/${id}`)
        .then((res) => res.data),
  });
  if (isLoading) {
    return (
      <div className="w-full h-[80vh] flex justify-center items-center">
            <span className="loading loading-spinner loading-xs"></span>
            <span className="loading loading-spinner loading-sm"></span>
            <span className="loading loading-spinner loading-md"></span>
            <span className="loading loading-spinner loading-lg"></span>
          </div>
    );
  }
  const { title, image, category, short, long } = data;
  return (
    <div className="max-w-[1260px] mx-auto my-20">
      <h2 className="text-center font-bold text-3xl">Update Blog</h2>
      <form onSubmit={handleUpdate} className="card-body">
        <div className="flex lg:gap-5 flex-col lg:flex-row">
          <div className="form-control flex-1">
            <label className="label">
              <span className="label-text">Title</span>
            </label>
            <input
              type="text"
              defaultValue={title}
              placeholder="Blog Title"
              className="input input-bordered"
              name="title"
              required
            />
          </div>
          <div className="form-control flex-1">
            <label className="label">
              <span className="label-text">Image URL</span>
            </label>
            <input
              type="text"
              defaultValue={image}
              placeholder="Image URL"
              className="input input-bordered"
              name="image"
              required
            />
          </div>
        </div>
        <div className="flex gap-5 flex-col lg:flex-row">
          <div className="form-control lg:w-1/5">
            <label className="label">
              <span className="label-text">Category</span>
            </label>
            <select name="category" className="input input-bordered">
              <option value="Technology">Technology</option>
              <option value="Travel">Travel </option>
              <option value="Health">Health</option>
              <option value="Food">Food</option>
              <option value="Lifestyle">Lifestyle</option>
              <option value="Business">Business</option>
            </select>
          </div>
          <div className="form-control flex-1">
            <label className="label">
              <span className="label-text">Short Description</span>
            </label>
            <input
              type="text"
              defaultValue={short}
              placeholder="Short Description"
              className="input input-bordered"
              name="short"
              required
            />
          </div>
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Long Description</span>
          </label>
          <textarea
            className="textarea textarea-bordered"
            rows="6"
            placeholder="Long Description"
            name="long"
            defaultValue={long}
          ></textarea>
        </div>
        <input
          className="btn normal-case text-lg font-semibold bg-orange-600 text-white my-5"
          type="submit"
          value="Update"
        />
      </form>
    </div>
  );
};

export default UpdateBlog;
