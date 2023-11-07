import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React, { useEffect } from "react";
import useAuth from "../Hooks/useAuth";
import WishListCard from "../Components/WishListCard";
import { toast } from "react-toastify";

const Wishlist = () => {
  const { user } = useAuth();
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
      axios
        .get(`https://the-blog-hub-server.vercel.app/wishlist`)
        .then((res) => res.data),
  });

  if (allBlogs.isLoading) {
    return (
      <div>
        <progress className="progress w-56" value="100" max="100"></progress>
      </div>
    );
  }

  if (emailQuery.isLoading) {
    return (
      <div>
        <progress className="progress w-56" value="100" max="100"></progress>
      </div>
    );
  }
  const allBlogsData = allBlogs?.data;
  const wishListData = emailQuery?.data;
  const userWishList = wishListData?.filter(
    (item) => item.userEmail === user?.email
  );
  const wishListIds = userWishList?.map((item) => item.blogId);
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
          toast("deleted successfully");
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
