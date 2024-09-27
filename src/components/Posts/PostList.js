import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaUserCircle, FaEdit, FaTrash, FaPlus } from 'react-icons/fa';
import { jwtDecode } from "jwt-decode";
import PostModal from './PostModal';
import '../../index.css';
import { getToken } from '../../utils/auth';
import { createComment, deleteComment, editComment } from '../../utils/api';
import { toast } from 'react-toastify';

const PostList = ({ posts, fetchPosts }) => {
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [currentUserId, setCurrentUserId] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [actionType, setActionType] = useState('');
  const [selectedPost, setSelectedPost] = useState(null);
  const [expandedPostId, setExpandedPostId] = useState(null);
  const [commentText, setCommentText] = useState('');
  const [activeCommentId, setActiveCommentId] = useState(null);
  const [editCommentId, setEditCommentId] = useState(null);
  const postsPerPage = 5;

  const getCurrentUserId = () => {
    const token = getToken();
    if (token) {
      const decoded = jwtDecode(token);
      setCurrentUserId(decoded.id);
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
    }
  };

  useEffect(() => {
    getCurrentUserId();
    setTotalPages(Math.ceil(posts.length / postsPerPage));
  }, [posts]);
  
  const handleCreatePost = () => {
    setActionType('create');
    setShowModal(true);
  };

  const handleEditPost = (post) => {
    setSelectedPost(post);
    setActionType('edit');
    setShowModal(true);
  };

  const handleDeletePost = (post) => {
    setSelectedPost(post);
    setActionType('delete');
    setShowModal(true);
  };

  const handleEditComment = (comment) => {
    setCommentText(comment.content);
    setEditCommentId(comment.id);
  };

  const handleDeleteComment = async (commentId) => {
    try {
      const token = getToken();
      await deleteComment(commentId, token);
      toast.success('Comment deleted successfully.');
      fetchPosts();
      setActiveCommentId(null);
    } catch (error) {
      console.error("Error deleting comment:", error);
      toast.error(error?.response?.data?.message || 'Something went wrong. Try again.');
    }
  };

  const toggleComments = async (postId) => {
    setExpandedPostId(expandedPostId === postId ? null : postId);
  };

  const handleCommentSubmit = async (postId) => {
    if (!isAuthenticated) {
      toast.error('You must be logged in to comment.');
      return;
    }

    try {
      const token = getToken();
      if (editCommentId) {
        const response = await editComment(editCommentId, { content: commentText }, token);
        toast.success(response?.data?.message || 'Comment updated successfully.');
        setEditCommentId(null);
        setCommentText('');
      } else {
        const response = await createComment({ postId: postId, content: commentText }, token);
        toast.success(response?.data?.message || 'Comment added successfully.');
      }
      setCommentText('');
      fetchPosts();
    } catch (error) {
      setEditCommentId(null);
      toast.error(error?.response?.data?.message || 'Something went wrong. Try again.');
    }
  };

  const indexOfLastPost = page * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);

  return (
    <div className="container mt-4">
      {isAuthenticated && (
      <button
      className="btn btn-success mb-3" 
      onClick={handleCreatePost}
    >
      <FaPlus className="mr-2" /> Create Post 
    </button>
    )}
      {posts.length < 1 ? (
        <h5>Post Blog is currently empty. There are no posts.</h5>
      ) : (
        <>
          {currentPosts.map((post) => (
            <div key={post.id} className="card post-card mb-4">
              <div className="card-header d-flex align-items-center">
                <FaUserCircle size={40} className="mr-2" />
                <div>
                  <h6 className="mb-0">{post.username}</h6>
                  <small className="text-muted">Posted on {new Date(post.createdAt).toLocaleString()}</small>
                </div>
              </div>

              <div className="card-body">
                <h5 className="card-title">{post.title}</h5>
                <p className="card-text">{post.content.slice(0, 400)}</p>
                <button
                  className="btn btn-secondary mt-2"
                  onClick={() => toggleComments(post.id)}
                >
                  {expandedPostId === post.id ? 'Hide Comments' : 'View Comments'}
                </button>
              </div>

              {expandedPostId === post.id && (
                <div className="card-body">
                  {post.comments && post.comments.length > 0 ? (
                    post.comments.map((comment) => (
                      <div key={comment.id} className="mb-2 d-flex justify-content-between align-items-center">
                        <div>
                          <strong>{post.user.username || 'User'} </strong>
                          <small className="text-muted">{new Date(comment.updatedAt).toLocaleString()}</small>
                          <p>{comment.content}</p>
                        </div>
                        <div>
                          <button
                            className="btn btn-link comment-btn"
                            onClick={() => setActiveCommentId(activeCommentId === comment.id ? null : comment.id)}
                          >
                            &#x22EE;
                          </button>
                          {activeCommentId === comment.id && (
                            <div className="dropdown-menu show">
                              <button
                                className="dropdown-item"
                                onClick={() => handleEditComment(comment)}
                              >
                                Edit
                              </button>
                              <button
                                className="dropdown-item text-danger"
                                onClick={() => handleDeleteComment(comment.id)}
                              >
                                Delete
                              </button>
                            </div>
                          )}
                        </div>
                      </div>
                    ))
                  ) : (
                    <h6>This post has no comments yet.</h6>
                  )}

                  {isAuthenticated ? (
                    <div className="add-comment">
                      <textarea
                        className="form-control"
                        rows="3"
                        placeholder="Add a comment..."
                        value={commentText}
                        onChange={(e) => setCommentText(e.target.value)}
                      />
                      <button
                        className="btn btn-primary mt-2"
                        onClick={() => handleCommentSubmit(post.id)}
                      >
                        Submit Comment
                      </button>
                    </div>
                  ) : (
                    <p>Please <Link to="/login">log in</Link> to comment.</p>
                  )}
                </div>
              )}

              <div className="card-footer text-muted">
                {post.user.id === currentUserId && (
                  <div className="post-actions d-flex justify-content-end">
                    <button className="btn btn-info custom-margin-right" onClick={() => handleEditPost(post)}>
                      <FaEdit /> Edit
                    </button>
                    <button className="btn btn-danger" onClick={() => handleDeletePost(post)}>
                      <FaTrash /> Delete
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))}

          {totalPages > 1 && (
            <div className="pagination d-flex justify-content-end">
              <button
                className="btn btn-secondary mx-4"
                disabled={page <= 1}
                onClick={() => setPage(page - 1)}
              >
                &lt;&lt;
              </button>
              <span>{page} of {totalPages}</span>
              <button
                className="btn btn-secondary mx-4"
                disabled={page >= totalPages}
                onClick={() => setPage(page + 1)}
              >
                &gt;&gt;
              </button>
            </div>
          )}
        </>
      )}
      <PostModal
        show={showModal}
        handleClose={() => setShowModal(false)}
        post={selectedPost}
        actionType={actionType}
        fetchPosts={fetchPosts}
      />
    </div>
  );
};

export default PostList;
