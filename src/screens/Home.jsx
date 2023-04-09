import React from 'react';
import './shared.css';

import { useListBlogs } from '../hooks/useListBlogs';

function Home() {
    const [blogs, reloadBlogs] = useListBlogs();
    if (!blogs)
        return (
            <div className="App">
                <h1>Loading Blog Posts...</h1>
            </div>
        );

    console.log(blogs);

    return (
        <div className="App">
            <h1>Vite + React</h1>
            <div className="card">
                <p>
                    Edit <code>src/App.jsx</code> and save to test HMR
                </p>
            </div>
            <p className="read-the-docs">Click on the Vite and React logos to learn more</p>
        </div>
    );
}

export default Home;
