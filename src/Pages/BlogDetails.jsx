import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import React from 'react';
import { Navigate, useNavigate, useParams } from 'react-router-dom';
import useAuth from '../Hooks/useAuth';

const BlogDetails = () => {
    const navigate = useNavigate()
    const {user} = useAuth()
    const {id}=useParams()
    const {data, isLoading, refetch} = useQuery({
        queryKey: ['singleBlogData'],
        queryFn: () => 
            axios.get(`http://localhost:5000/blogs/${id}`)
            .then(res => res.data)
    })
    if(isLoading){
        return (
            <div>
                <progress className="progress w-56" value="100" max="100"></progress>
            </div>
        );
    }
    const {_id, title, email, image, category, short, long} = data; 
    return (
        <div className="max-w-[1260px] mx-auto my-20 relative">
            <h2 className="text-center font-bold text-3xl bg-black text-white absolute w-full py-5 z-10 opacity-60">{title}</h2>
            <img className='w-full h-[600px] object-cover' src={image} alt="" />
            <p className='text-xl font-bold my-4'>{short}</p>
            <p className='text-lg font-medium text-justify'>{long}</p>
            {
                user?.email === email && <div className='text-center'>
                    <button onClick={()=> navigate(`/updateblog/${_id}`)} className='btn bg-orange-600 text-white my-5 normal-case text-lg'>Update</button>
                </div>
            }
        </div>
    );
};

export default BlogDetails;