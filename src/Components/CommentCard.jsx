import React from "react";

const CommentCard = ({ userComment }) => {
  const { comment, userName, userImage } = userComment;
  return (
    <div className="flex items-center gap-5 bg-yellow-100 py-2 px-5 rounded-lg my-5">
      <div>
        <img
          className="w-24 h-24 object-cover rounded-full"
          src={userImage}
          alt=""
        />
        <h3 className="font-semibold text-yellow-500">{userName}</h3>
      </div>
      <div>
        <p className="quoted-text text-xl font-semibold italic">{comment}</p>
      </div>
    </div>
  );
};

export default CommentCard;
