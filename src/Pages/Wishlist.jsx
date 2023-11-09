import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React, { useEffect, useState } from "react";
import useAuth from "../Hooks/useAuth";
import WishListCard from "../Components/WishListCard";
import { toast } from "react-toastify";
import useAxiosSecure from "../Hooks/useAxiosSecure";

const Wishlist = () => {
  const { user } = useAuth();
  const [wishList, setWishList] = useState([]);
  const axiosSecure = useAxiosSecure();
  const allBlogs = useQuery({
    queryKey: ["blogsData"],
    queryFn: () =>
      axios
        .get("https://the-blog-hub-server.vercel.app/allblogs")
        .then((res) => res.data),
  });

  const emailQuery = useQuery({
    queryKey: ["wishlistData"],
    queryFn: () =>
      axiosSecure.get(`/wishlist?email=${user.email}`).then((res) => res.data),
  });

  if (allBlogs.isLoading) {
    return (
      <div className="w-full h-[80vh] flex justify-center items-center">
            <span className="loading loading-spinner loading-xs"></span>
            <span className="loading loading-spinner loading-sm"></span>
            <span className="loading loading-spinner loading-md"></span>
            <span className="loading loading-spinner loading-lg"></span>
          </div>
    );
  }

  if (emailQuery.isLoading) {
    return (
      <div className="w-full h-[80vh] flex justify-center items-center">
            <span className="loading loading-spinner loading-xs"></span>
            <span className="loading loading-spinner loading-sm"></span>
            <span className="loading loading-spinner loading-md"></span>
            <span className="loading loading-spinner loading-lg"></span>
          </div>
    );
  }
  const allBlogsData = allBlogs?.data;
  const wishListData = emailQuery?.data;
  // const userWishList = wishListData?.filter(
  //   (item) => item.userEmail === user?.email
  // );
  const wishListIds = wishListData?.map((item) => item.blogId);
  const wishListBlogs = [];
  for (let item of wishListIds) {
    for (let blog of allBlogsData) {
      if (blog._id == item) {
        wishListBlogs.push(blog);
      }
    }
  }

  const handleDelete = (id) => {
    const email = user.email;
    const myRef = { email };
    console.log(email);
    fetch(`https://the-blog-hub-server.vercel.app/wishlist/${id}`, {
      method: "DELETE",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(myRef),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.deletedCount) {
          toast("successfully deleted from wishlist");
          emailQuery.refetch();
        }
      });
  };

  return (
    <div className="max-w-[1260px] mx-auto my-20">
      <h2 className="text-center font-bold text-3xl">Wishlist</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 justify-items-center gap-5 my-10">
        {wishListBlogs.map((blog, index) => (
          <WishListCard
            key={index}
            blog={blog}
            handleDelete={handleDelete}
          ></WishListCard>
        ))}
      </div>
    </div>
  );
};

export default Wishlist;
