import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React from "react";
import BlogCard from "./BlogCard";

const RecentBlogs = () => {
  const { data, isLoading, refetch } = useQuery({
    queryKey: ["recentBlogsData"],
    queryFn: () =>
      axios
        .get("https://the-blog-hub-server.vercel.app/recentblogs")
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
