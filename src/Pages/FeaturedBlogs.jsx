import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import React from 'react';

const FeaturedBlogs = () => {
    const featuredBlogs = useQuery({
        queryKey: ["featuredData"],
        queryFn: () =>
          axios.get("http://localhost:5000/featured").then((res) => res.data),
      });
    
      const users = useQuery({
        queryKey: ["userData"],
        queryFn: () =>
          axios.get(`http://localhost:5000/users`).then((res) => res.data),
      });
    
      if (featuredBlogs.isLoading) {
        return (
          <div>
            <progress className="progress w-56" value="100" max="100"></progress>
          </div>
        );
      }
    
      if (users.isLoading) {
        return (
          <div>
            <progress className="progress w-56" value="100" max="100"></progress>
          </div>
        );
      }
      console.log(featuredBlogs.data, users.data)
      const featuredBlogsArray = featuredBlogs.data.map((item1) => {
        const matchingItem2 = users.data.find((item2) => item2.userEmail === item1.email);
        if (matchingItem2) {
          return {
            title: item1.title,
            userName: matchingItem2.userName,
            picture: matchingItem2.userImage,
          };
        }
        return null; 
      });
      console.log(featuredBlogsArray)
    return (
        <div className="max-w-[1260px] mx-auto my-20">
        <h2 className="text-center font-bold text-3xl">Featured Blogs</h2>
        </div>
    );
};

export default FeaturedBlogs;