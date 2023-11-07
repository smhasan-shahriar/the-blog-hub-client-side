import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React, { useEffect, useState } from "react";
import BlogCard from "../Components/BlogCard";

const AllBlogs = () => {
  const [filter, setFilter] = useState("");
  const [selectedCategory, setSelectedCategory] = useState('');
  const { data, isLoading, refetch } = useQuery({
    queryKey: ["blogsData"],
    queryFn: () =>
      axios.get("http://localhost:5000/allblogs").then((res) => res.data),
  });

  if (isLoading) {
    return (
      <div>
        <progress className="progress w-56" value="100" max="100"></progress>
      </div>
    );
  }

  const { title, image, category, short, long } = data;
  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    const filter = form.search.value;
    const filteredBlogs = data.filter((blog) =>
    (blog.title.toLowerCase().includes(filter.toLowerCase()) && 
    (selectedCategory === '' || blog.category === selectedCategory))
    );
    setFilter(filter);
  };

  const handleFilterChange = e => {
    setFilter(e.target.value)
  }
  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
};

  return (
    <div className="max-w-[1260px] mx-auto my-20">
      <h2 className="text-center font-bold text-3xl">All Blogs</h2>
     
        <div className="h-[50px] rounded-lg lg:text-right my-5">
          <form onSubmit={handleSubmit} className="mx-auto flex justify-between items-center flex-col lg:flex-row gap-5">
            <div className="flex items-center gap-3">
              <label className="label">
                <span className="label-text">Filter by Category</span>
              </label>
              <select onChange={handleCategoryChange} value={selectedCategory} name="category" className="input input-bordered">
                <option value="">All Categories</option>
                <option value="Technology">Technology</option>
                <option value="Travel">Travel </option>
                <option value="Health">Health</option>
                <option value="Food">Food</option>
                <option value="Lifestyle">Lifestyle</option>
                <option value="Business">Business</option>
              </select>
            </div>
            <div>
                <input
                  name="search"
                  onChange={handleFilterChange}
                  className="text-sm p-4 md:w-[360px] w-[220px] border"
                  type="text"
                  placeholder="Search by title"
                />
                <input
                  type="submit"
                  className="w-[110px] h-[50px] bg-[#FF444A] text-white rounded-r-lg font-semibold"
                  value="Search"
                ></input>
            </div>
          </form>

      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 justify-items-center gap-5 my-20">
      {filter === '' && selectedCategory === '' ? (
                    data.map((blog) => <BlogCard key={blog._id} blog={blog} />)
                ) : (
                    data
                        .filter((blog) =>
                            (blog.title.toLowerCase().includes(filter.toLowerCase()) &&
                            (selectedCategory === '' || blog.category === selectedCategory))
                        )
                        .map((filteredBlog) => (
                            <BlogCard key={filteredBlog._id} blog={filteredBlog} />
                        ))
                )}
      </div>
    </div>
  );
};

export default AllBlogs;
