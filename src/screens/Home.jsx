import React from 'react';
import { useSelector } from 'react-redux';

import './shared.css';
import BlogPostCard from '../components/BlogPostCard';

function Home() {
    const posts = useSelector((state) => state.posts.posts);

    return (
        <div className="App">
            <div
                style={{
                    height: '100px'
                }}
            ></div>

            {posts.map(({ id, ...props }) => (
                <BlogPostCard key={id} id={id} {...props} />
            ))}

            {posts.length === 0 ? (
                <>
                    <h1>No Blog Posts Yet.</h1>
                    <p>Get started by creating a new blog post.</p>
                </>
            ) : null}

            <div
                style={{
                    height: '100px'
                }}
            ></div>
        </div>
    );
}

export default Home;
