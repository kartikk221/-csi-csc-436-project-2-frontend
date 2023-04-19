import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchPostsDeletePost } from '../state/postsSlice';
import { NavLink, useParams, useNavigate } from 'react-router-dom';

import './shared.css';

export function DeleteBlogPost() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [isDeleting, setIsDeleting] = useState(false);
    const { id = '' } = useParams();
    const posts = useSelector((state) => state.posts.posts);
    const post = posts.find((post) => post.id === +id);

    if (!post) return <h1>Post not found</h1>;

    const { title } = post;
    return (
        <div className="blog-content">
            <h1
                style={{
                    fontSize: '4em'
                }}
            >
                {isDeleting ? 'Deleting...' : 'Are You Sure?'}
            </h1>
            <p
                style={{
                    fontSize: '2em'
                }}
            >
                Blog post{' '}
                <strong>
                    #{id} - {title}
                </strong>{' '}
                will permanently be deleted.
            </p>

            {isDeleting ? null : (
                <p
                    style={{
                        marginTop: '4em',
                        display: 'flex',
                        justifyContent: 'space-around'
                    }}
                >
                    <NavLink
                        to={`/blog/${id}`}
                        style={{
                            fontSize: '2em',
                            color: 'green'
                        }}
                    >
                        Go Back
                    </NavLink>
                    <NavLink
                        onClick={async () => {
                            setIsDeleting(true);
                            try {
                                // Make fetch request to delete
                                const response = await fetch(
                                    'http://localhost:3001/v1/api/posts/' + id,
                                    {
                                        method: 'DELETE'
                                    }
                                );

                                if (!response.ok)
                                    throw new Error(
                                        'HTTP error ' + response.status
                                    );

                                // Delete post from state
                                dispatch(fetchPostsDeletePost(+id));

                                // Go back to home
                                return navigate('/');
                            } catch (error) {
                                alert(
                                    'Failed to delete blog post. Please try again later. Error: ' +
                                        error
                                );
                            }
                            setIsDeleting(false);
                        }}
                        style={{
                            fontSize: '2em',
                            color: 'red'
                        }}
                    >
                        Delete
                    </NavLink>
                </p>
            )}
        </div>
    );
}

export default DeleteBlogPost;
