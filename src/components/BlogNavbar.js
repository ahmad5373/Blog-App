import React from 'react';
import { Link } from 'react-router-dom';
import '../index.css';

const BlogNavbar = ({ isAuthenticated, handleLogout}) => {
  return (
    <>
     <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
        <Link className="navbar-brand ml-2" to="/">Blog Posts</Link>

        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
        <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item">
            </li>
          </ul>

          <ul className="navbar-nav ml-auto">
            {isAuthenticated ? (
              <>
                <li className="nav-item">
                  <button className="btn btn-outline-light m-2" onClick={handleLogout}>Logout</button>
                </li>
              </>
            ) : (
              <>
                <li className="nav-item">
                  <Link className="btn btn-outline-light m-2" to="/login">Login</Link>
                </li>
                <li className="nav-item">
                  <Link className="btn btn-outline-light m-2" to="/register">Register</Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </nav>
    </>
  );  
  };

export default BlogNavbar;