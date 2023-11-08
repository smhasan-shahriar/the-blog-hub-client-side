import React from "react";
import useAuth from "../Hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "react-toastify";
import useAxiosSecure from "../Hooks/useAxiosSecure";

const AddBlog = () => {
  const { user } = useAuth();
  // const { data } = useQuery({
  //     queryKey: ['addblogdata'],
  //     queryFn: () =>
  //     axios.post('/addblog', {
  //         firstName: 'Fred',
  //         lastName: 'Flintstone'
  //       })
  //       .then(response => response.data),
  //   })
  const axiosSecure = useAxiosSecure();
  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    const title = form.title.value;
    const image = form.image.value;
    const category = form.category.value;
    const short = form.short.value;
    const long = form.long.value;
    const email = user.email;
    const time = Date.now();
    const newBlog = { title, image, category, short, long, email, time };
    axiosSecure.post("/addblog", newBlog).then((res) => {
      if (res.data.insertedId) {
        toast("Blog successfully added");
        form.reset();
      }
      
    })
  };
  return (
    <div className="max-w-[1260px] mx-auto my-20">
      <h2 className="text-center font-bold text-3xl">Add Blog</h2>
      <form onSubmit={handleSubmit} className="card-body">
        <div className="flex lg:gap-5 flex-col lg:flex-row">
          <div className="form-control flex-1">
            <label className="label">
              <span className="label-text">Title</span>
            </label>
            <input
              type="text"
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
          ></textarea>
        </div>
        <input
          className="btn normal-case text-lg font-semibold bg-orange-600 text-white my-5"
          type="submit"
          value="Submit"
        />
      </form>
    </div>
  );
};

export default AddBlog;
