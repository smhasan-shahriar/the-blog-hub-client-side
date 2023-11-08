import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React from "react";
import BlogCard from "./BlogCard";

const RecentBlogs = () => {
  const { data, isLoading, refetch } = useQuery({
    queryKey: ["recentBlogsData"],
    queryFn: () =>
      axios.get("http://localhost:5000/recentblogs").then((res) => res.data),
  });

  if (isLoading) {
    return (
      <div>
        <progress className="progress w-56" value="100" max="100"></progress>
      </div>
    );
  }
  const { title, image, category, short, long } = data;
  return (
    <div className="max-w-[1260px] mx-auto my-20">
      <h2 className="text-center font-bold text-3xl">Recent Blogs</h2>
      <div className="grid grid-cols-1 lg:grid-cols-3 justify-items-center gap-5 my-10">
        {data.map((blog) => (
          <BlogCard key={blog._id} blog={blog}></BlogCard>
        ))}
      </div>
    </div>
  );
};

export default RecentBlogs;
