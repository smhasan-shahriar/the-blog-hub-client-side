import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React from "react";
import { CompactTable } from "@table-library/react-table-library/compact";
import { useTheme } from "@table-library/react-table-library/theme";
import { getTheme } from "@table-library/react-table-library/baseline";

const FeaturedBlogs = () => {
  const theme = useTheme(getTheme());
  const featuredBlogs = useQuery({
    queryKey: ["featuredData"],
    queryFn: () =>
      axios
        .get("https://the-blog-hub-server.vercel.app/featured")
        .then((res) => res.data),
  });

  const users = useQuery({
    queryKey: ["userData"],
    queryFn: () =>
      axios
        .get(`https://the-blog-hub-server.vercel.app/users`)
        .then((res) => res.data),
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
  console.log(featuredBlogs.data, users.data);
  const featuredBlogsArray = featuredBlogs.data.map((item1, index) => {
    const matchingItem2 = users.data.find(
      (item2) => item2.userEmail === item1.email
    );
    if (matchingItem2) {
      return {
        id: index,
        serial: index + 1,
        title: item1.title,
        userName: matchingItem2.userName,
        picture: matchingItem2.userImage,
      };
    }
    return null;
  });
  console.log(featuredBlogsArray);
  const nodes = [
    {
     
      name: "Shopping List 1",
      type: "TASK",
      isComplete: true,
    },
    {
     
      name: "Shopping List 2",
      type: "TASK",
      isComplete: true,
    },
  ];
  console.log(nodes);
  const COLUMNS = [
    { label: "Serial", renderCell: (item) => item.name },

    { label: "Blog Title", renderCell: (item) => item.type },
    { label: "User Name", renderCell: (item) => item.type },

    { label: "User Image", renderCell: (item) => item.nodes },
  ];
  const data = { nodes };

  return (
    <div className="max-w-[1260px] mx-auto my-20">
      <h2 className="text-center font-bold text-3xl">Featured Blogs</h2>
      <CompactTable columns={COLUMNS} data={data} theme={theme} />
    </div>
  );
};

export default FeaturedBlogs;
