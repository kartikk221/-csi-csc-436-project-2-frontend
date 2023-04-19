import React, { useEffect } from 'react';
import Navbar from './components/Navbar.jsx';
import { Route, Routes } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPostsSetPosts, fetchPostsSetError } from './state/postsSlice.js';

import './screens/shared.css';

import Home from './screens/Home.jsx';
import Create from './screens/Create.jsx';
import BlogPost from './screens/BlogPost.jsx';
import EditPost from './screens/EditPost.jsx';
import DeleteBlogPost from './screens/DeletePost.jsx';

function Navigation() {
    const dispatch = useDispatch();
    const error = useSelector((state) => state.posts.error);
    const initialized = useSelector((state) => state.posts.initialized);

    // Initialize state
    useEffect(() => {
        // Begin fetch request
        if (!initialized) {
            fetch('http://localhost:3001/v1/api/posts')
                .then((response) => response.json())
                .then((_posts) => dispatch(fetchPostsSetPosts(_posts)))
                .catch((error) => dispatch(fetchPostsSetError(error)));
        }
    }, [initialized]);

    return (
        <>
            <Navbar />
            {initialized ? (
                <Routes>
                    <Route path="/" Component={Home} />
                    <Route path="/create" Component={Create} />
                    <Route path="/blog/:id" Component={BlogPost} />
                    <Route path="/blog/:id/edit" Component={EditPost} />
                    <Route path="/blog/:id/delete" Component={DeleteBlogPost} />
                </Routes>
            ) : error ? (
                <h1 style={{ color: 'red' }}>
                    Failed to load blog posts. Please try again later. Error:
                    {error}
                </h1>
            ) : (
                <h1>Loading...</h1>
            )}
            <Navbar title="Made By Kartik Kumar" footer={true} />
        </>
    );
}

export default Navigation;
