import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React from "react";
import { CompactTable } from "@table-library/react-table-library/compact";
import {
  Table,
  Header,
  HeaderRow,
  Body,
  Row,
  HeaderCell,
  Cell,
} from "@table-library/react-table-library/table";
import { useTheme } from "@table-library/react-table-library/theme";
import { getTheme } from "@table-library/react-table-library/baseline";

const FeaturedBlogs = () => {
  const theme = useTheme(getTheme());
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
  const nodes = [...featuredBlogsArray];
  console.log(nodes);
  const COLUMNS = [
    { label: "Serial", renderCell: (item) => item.serial },
    { label: "Blog Title", renderCell: (item) => item.title },
    { label: "User Name", renderCell: (item) => item.userName },
    {
      label: "User Image",
      renderCell: (item) => (
        <img className="w-12 h-12 rounded-full" src={item.picture}></img>
      ),
    },
  ];
  const data = { nodes };
  const resize = { minWidth: 25 };
  return (
    <div className="max-w-[1260px] mx-auto my-20">
      <h2 className="text-center font-bold text-3xl">Featured Blogs</h2>
      <div className="my-10">
        <CompactTable columns={COLUMNS} data={data} theme={theme} />
      </div>
    </div>
  );
};

export default FeaturedBlogs;
