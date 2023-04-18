import React from 'react';
import { useSelector } from 'react-redux';
import { NavLink, useParams } from 'react-router-dom';

import './shared.css';

export function BlogPost() {
    const { id = '' } = useParams();
    const posts = useSelector((state) => state.posts.posts);
    const post = posts.find((post) => post.id === +id);

    if (!post) return <h1>Post not found</h1>;

    const { title, content, originally_published, last_updated } = post;
    return (
        <>
            <h1
                style={{
                    fontSize: '4em'
                }}
            >
                #{id} - {title}
            </h1>
            <p
                style={{
                    fontSize: '2em',
                    lineBreak: 'anywhere'
                }}
            >
                {content}
            </p>

            <p>
                Published on{' '}
                <strong>
                    {new Date(originally_published).toLocaleString()}
                </strong>
            </p>

            <p>
                Last updated on{' '}
                <strong>{new Date(last_updated).toLocaleString()}</strong>
            </p>

            <p
                style={{
                    marginTop: '4em',
                    display: 'flex',
                    justifyContent: 'space-around'
                }}
            >
                <NavLink
                    to={`/`}
                    style={{
                        fontSize: '2em'
                    }}
                >
                    Go Back
                </NavLink>
                <NavLink
                    to={`/edit/${id}`}
                    style={{
                        fontSize: '2em',
                        color: 'aquamarine'
                    }}
                >
                    Edit
                </NavLink>
                <NavLink
                    to={`/delete/${id}`}
                    style={{
                        fontSize: '2em',
                        color: 'red'
                    }}
                >
                    Delete
                </NavLink>
            </p>
        </>
    );
}

export default BlogPost;
