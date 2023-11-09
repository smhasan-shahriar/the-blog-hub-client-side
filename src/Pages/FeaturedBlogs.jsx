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
  const theme = useTheme({
    Table: `
        --data-table-library_grid-template-columns: 10% 5fr 3fr 15%;
      `,
    HeaderRow: `
        background-color: #eaf5fd;
      `,
    Row: `
        &:nth-of-type(odd) {
          background-color: #d2e9fb;
        }

        &:nth-of-type(even) {
          background-color: #eaf5fd;
        }
      `,
  });
  const resize = { resizerHighlight: "#dde2eb", resizerWidth: 25 };
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
      <div className="w-full h-[80vh] flex justify-center items-center">
            <span className="loading loading-spinner loading-xs"></span>
            <span className="loading loading-spinner loading-sm"></span>
            <span className="loading loading-spinner loading-md"></span>
            <span className="loading loading-spinner loading-lg"></span>
          </div>
    );
  }

  if (users.isLoading) {
    return (
      <div className="w-full h-[80vh] flex justify-center items-center">
            <span className="loading loading-spinner loading-xs"></span>
            <span className="loading loading-spinner loading-sm"></span>
            <span className="loading loading-spinner loading-md"></span>
            <span className="loading loading-spinner loading-lg"></span>
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
  // console.log(nodes);
  // const COLUMNS = [
  //   { label: "Serial No.", renderCell: (item) => item.serial },
  //   { label: "Blog Title", renderCell: (item) => item.title },
  //   { label: "Blog Owner", renderCell: (item) => item.userName },
  //   {
  //     label: "Blog Owner's Picture",
  //     renderCell: (item) => (
  //       <img className="w-12 h-12 rounded-full object-cover" src={item.picture}></img>
  //     ),
  //   },
  // ];
  const data = { nodes };
  
  return (
    <div className="max-w-[1260px] lg:mx-auto mx-4 my-20">
      <h2 className="text-center font-bold text-3xl">Featured Blogs</h2>
      <div className="my-10">
        {/* <CompactTable columns={COLUMNS} data={data} theme={theme} /> */}
        <Table data={data} theme={theme} layout={{ custom: true, horizontalScroll: true }}>
      {(tableList) => (
        <>
          <Header>
            <HeaderRow>
              <HeaderCell  resize={resize}>Serial No.</HeaderCell>
              <HeaderCell  resize={resize}>Blog Name</HeaderCell>
              <HeaderCell  resize={resize}>Blog Owner</HeaderCell>
              <HeaderCell  resize={resize}>Blog Owner's <br /> Picture</HeaderCell>
            </HeaderRow>
          </Header>

          <Body>
            {tableList.map((item) => (
              <Row key={item.id} item={item}>
                <Cell>{item.serial}</Cell>
                <Cell>{item.title}</Cell>
                <Cell>{item.userName}</Cell>
                <Cell><img className="w-12 h-12 rounded-full object-cover" src={item.picture}></img></Cell>
                
                
      
              </Row>
            ))}
          </Body>
        </>
      )}
    </Table>
      </div>
    </div>
  );
};

export default FeaturedBlogs;
