import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import PostModal from './Posts/PostModal';
import '../index.css';

const BlogNavbar = ({ isAuthenticated, handleLogout, fetchPosts }) => {
  const [showModal, setShowModal] = useState(false);
  const [actionType, setActionType] = useState(''); 

  const handleCreate = () => {
    setActionType('create');
    setShowModal(true);
  };

    return (
      <>
      <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <div className="d-flex justify-content-between w-100">
            <ul className="navbar-nav">
            <li className="nav-item">
                <Link className="nav-link navbar-brand" to="/">Blog Posts</Link>
              </li>
            </ul>
            <ul className="navbar-nav mr-4">
              {isAuthenticated ? (
                <>
                  <li className="nav-item">
                  <button className="btn btn-outline-light custom-margin-right" onClick={() => handleCreate()}>
                      Create Post
                  </button>
                  </li>
                  <li className="nav-item ">
                    <button className="btn btn-outline-light custom-margin-right" onClick={handleLogout}>Logout</button>
                  </li>
                </>
              ) : (
                <>
                  <li className="nav-item ">
                    <Link className="nav-link navbar-brand" to="/login">Login</Link>
                  </li>
                  <li className="nav-item mr-12">
                    <Link className="nav-link navbar-brand" to="/register">Register</Link>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
      </nav>
      <PostModal
        show={showModal}
        handleClose={() => setShowModal(false)}
        actionType={actionType}
        fetchPosts={fetchPosts}
      />
      </>
    );
  };

export default BlogNavbar;