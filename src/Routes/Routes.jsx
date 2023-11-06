import React from 'react';
import { createBrowserRouter } from 'react-router-dom';
import MainLayout from '../Layout/MainLayout';
import Home from '../Pages/Home';
import AddBlog from '../Pages/AddBlog';
import AllBlogs from '../Pages/AllBlogs';
import FeaturedBlogs from '../Pages/FeaturedBlogs';
import Wishlist from '../Pages/Wishlist';
import Login from '../Pages/Login';
import Register from '../Pages/Register';

export const router = createBrowserRouter([
    {
      path: "/",
      element: <MainLayout></MainLayout>,
      children: [
        {
            path: "/",
            element: <Home></Home>
        },
        {
            path: "/addblog",
            element: <AddBlog></AddBlog>
        },
        {
            path: "/allblogs",
            element: <AllBlogs></AllBlogs>
        },
        {
            path: "/featuredblogs",
            element: <FeaturedBlogs></FeaturedBlogs>
        },
        {
            path: "/wishlist",
            element: <Wishlist></Wishlist>
        }
      ]
    },
    {
        path: "/login",
        element: <Login></Login>
    },
    {
        path: "/register",
        element: <Register></Register>
    }
  ]);

