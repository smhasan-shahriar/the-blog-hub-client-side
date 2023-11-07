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
import BlogDetails from '../Pages/BlogDetails';
import UpdateBlog from '../Pages/UpdateBlog';
import ErrorPage from '../Pages/ErrorPage';
import PrivateRoutes from './PrivateRoutes';

export const router = createBrowserRouter([
    {
      path: "/",
      element: <MainLayout></MainLayout>,
      errorElement: <ErrorPage></ErrorPage>,
      children: [
        {
            path: "/",
            element: <Home></Home>
        },
        {
            path: "/addblog",
            element: <PrivateRoutes><AddBlog></AddBlog></PrivateRoutes> 
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
            element: <PrivateRoutes><Wishlist></Wishlist></PrivateRoutes> 
        },
        {
            path: "/blogs/:id",
            element: <PrivateRoutes><BlogDetails></BlogDetails></PrivateRoutes> 
        },
        {
            path: "/updateblog/:id",
            element: <PrivateRoutes><UpdateBlog></UpdateBlog></PrivateRoutes> 
        },
        {
            path: "/login",
            element: <Login></Login>
        },
        {
            path: "/register",
            element: <Register></Register>
        }
      ]
    }
  ]);


