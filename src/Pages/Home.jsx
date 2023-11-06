import React from 'react';
import Banner from '../Components/Banner';
import NewsLetter from '../Components/NewsLetter';
import RecentBlogs from '../Components/RecentBlogs';
import Testimonials from '../Components/Testimonials';

const Home = () => {
    return (
        <div>
            <Banner></Banner>
            <RecentBlogs></RecentBlogs>
            <NewsLetter></NewsLetter>
            <Testimonials></Testimonials>
        </div>
    );
};

export default Home;