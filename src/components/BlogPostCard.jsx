import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';

function BlogPostCard({ id, title, originally_published, last_updated }) {
    const navigate = useNavigate();

    return (
        <div
            className="blog"
            onClick={() => navigate(`/blog/${id}`)}
            style={{
                cursor: 'pointer'
            }}
        >
            <h2>
                #{id} - {title}
            </h2>
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
            <NavLink
                to={`/blog/${id}`}
                style={{
                    color: 'green'
                }}
            >
                View Blog Post #{id}
            </NavLink>
        </div>
    );
}

export default BlogPostCard;
