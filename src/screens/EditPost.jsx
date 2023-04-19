import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchPostsAddPost, fetchPostsDeletePost } from '../state/postsSlice';
import './shared.css';

function EditPost() {
    // Get post id from url
    const { id = '' } = useParams();
    const posts = useSelector((state) => state.posts.posts);
    const post = posts.find((post) => post.id === +id);

    // Initialize state
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [title, setTitle] = useState(post?.title || '');
    const [message, setMessage] = useState(post?.content || '');
    const [inFlight, setInFlight] = useState(false);

    // Return JSX if no post is found
    if (!post) return <h1>Post not found</h1>;

    return (
        <div className="card blog-content">
            <h1
                style={{
                    marginBottom: '2rem'
                }}
            >
                Edit Post #{id}
            </h1>
            <input
                type="text"
                placeholder="Enter post title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
            ></input>
            <textarea
                type="text"
                placeholder="Enter post message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                style={{
                    marginTop: '2rem',
                    height: '300px',
                    width: '100%'
                }}
            ></textarea>
            <button
                disabled={inFlight}
                style={{
                    marginTop: '1rem'
                }}
                onClick={async () => {
                    // Ensure there is a valid title and message
                    if (!title) return alert('Please enter a title');
                    if (!message) return alert('Please enter a message');

                    // Ensure we are not already in flight
                    if (!inFlight) {
                        setInFlight(true);
                        try {
                            // Make fetch request to create new post
                            const response = await fetch(
                                'http://localhost:3001/v1/api/posts/' + id,
                                {
                                    method: 'PATCH',
                                    headers: {
                                        'Content-Type': 'application/json'
                                    },
                                    body: JSON.stringify({
                                        title,
                                        content: message
                                    })
                                }
                            );

                            // Ensure the response is valid
                            if (!response.ok) {
                                throw new Error(
                                    `HTTP Error: ${response.status}`
                                );
                            }

                            // Clear the form
                            setTitle('');
                            setMessage('');

                            // Parse as JSON
                            const data = await response.json();

                            // Delete the post from the store and add the new post
                            dispatch(fetchPostsDeletePost(+id));
                            dispatch(fetchPostsAddPost(data));

                            // Go to the new post
                            navigate(`/blog/${data.id}`);
                        } catch (error) {
                            console.error(error);
                            // Display error message
                            alert(
                                `Failed to create new post: ${error.message}`
                            );
                        }

                        // Reset the form
                        setInFlight(false);
                    }
                }}
            >
                {inFlight ? 'Editing...' : 'Edit Post #' + id}
            </button>
        </div>
    );
}

export default EditPost;
