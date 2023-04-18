import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import './Navbar.css'; // Import your CSS file

function Navbar({ title = 'CSC 436 Project 2', footer = false }) {
    const location = useLocation();
    const links = [
        {
            name: 'Home',
            path: '/'
        },
        {
            name: 'Create New Post',
            path: '/create'
        }
    ];

    return (
        <nav
            className={'navbar' + (footer ? ' footer' : '')}
            style={
                footer
                    ? {
                          borderTop: '2px solid darkgray'
                      }
                    : {
                          borderBottom: '2px solid darkgray'
                      }
            }
        >
            <div className="navbar-container">
                <h1 className="navbar-link">{title}</h1>
                <ul className="navbar-menu">
                    {links.map(({ name, path }, index) => (
                        <li key={index} className="navbar-item">
                            <NavLink
                                to={path}
                                className={`navbar-link ${
                                    location.pathname === path
                                        ? 'navbar-link-active'
                                        : ''
                                }`}
                            >
                                {name}
                            </NavLink>
                        </li>
                    ))}
                </ul>
            </div>
        </nav>
    );
}

export default Navbar;
