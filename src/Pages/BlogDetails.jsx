import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React from "react";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import useAuth from "../Hooks/useAuth";
import { toast } from "react-toastify";
import CommentCard from "../Components/CommentCard";
import useAxiosSecure from "../Hooks/useAxiosSecure";

const BlogDetails = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { id } = useParams();
  window.scrollTo({ top: 0 });
  const axiosSecure = useAxiosSecure();
  const blogDetails = useQuery({
    queryKey: ["singleBlogData"],
    queryFn: () => axiosSecure.get(`/blogs/${id}`).then((res) => res.data),
  });
  const comments = useQuery({
    queryKey: ["commentsData"],
    queryFn: () => axiosSecure.get(`/comments/${id}`).then((res) => res.data),
  });
  if (blogDetails.isLoading) {
    return (
      <div className="w-full h-[80vh] flex justify-center items-center">
            <span className="loading loading-spinner loading-xs"></span>
            <span className="loading loading-spinner loading-sm"></span>
            <span className="loading loading-spinner loading-md"></span>
            <span className="loading loading-spinner loading-lg"></span>
          </div>
    );
  }
  if (comments.isLoading) {
    return (
      <div className="w-full h-[80vh] flex justify-center items-center">
            <span className="loading loading-spinner loading-xs"></span>
            <span className="loading loading-spinner loading-sm"></span>
            <span className="loading loading-spinner loading-md"></span>
            <span className="loading loading-spinner loading-lg"></span>
          </div>
    );
  }
  const { _id, title, email, image, category, short, long } = blogDetails.data;
  const handlePostComment = (e) => {
    e.preventDefault();
    const form = e.target;
    const comment = form.comment.value;
    const userComment = {
      comment,
      blogId: id,
      userName: user.displayName,
      userImage: user.photoURL,
    };
    axios
      .post("https://the-blog-hub-server.vercel.app/comments", userComment)
      .then((res) => {
        if (res.data.insertedId) {
          toast("Comment successfully posted");
          comments.refetch();
          form.reset();
        }
      });
  };
  return (
    <div className="max-w-[1260px] mx-auto my-20 relative">
      <h2 className="text-center font-bold text-3xl bg-black text-white absolute w-full py-5 z-10 opacity-60">
        {title}
      </h2>
      <img className="w-full h-[600px] object-cover" src={image} alt="" />
      <p className="text-xl font-bold my-4">{short}</p>
      <p className="text-lg font-medium text-justify">{long}</p>
      {user?.email === email && (
        <div className="text-center">
          <button
            onClick={() => navigate(`/updateblog/${_id}`)}
            className="btn bg-orange-600 text-white my-5 normal-case text-lg"
          >
            Update
          </button>
        </div>
      )}

      <div>
        <h2 className="text-left font-bold text-3xl mt-10 my-2">
          Comments: {comments.data.length}
        </h2>
        <hr className="border-2 my-2"/>
        <div>
          {user && user?.email !== email ? (
            <div>
              <form onSubmit={handlePostComment}>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Write Your Comment</span>
                  </label>
                  <textarea
                    className="textarea textarea-bordered"
                    placeholder="Write Your Comment"
                    name="comment"
                  ></textarea>
                </div>
                <div className="w-full text-center mx-auto my-5">
                  <input
                    className="btn btn-primary normal-case text-lg font-bold"
                    type="submit"
                    value="Post Your Comment"
                  />
                </div>
              </form>
            </div>
          ) : (
            <p className="text-xl font-bold text-left">
              You can not comment on your own blog
            </p>
          )}
        </div>
        <div>
          {comments.data.map((comment) => (
            <CommentCard key={comment._id} userComment={comment}></CommentCard>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BlogDetails;
