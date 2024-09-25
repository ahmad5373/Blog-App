import React, { useState, useEffect } from 'react';
import { Modal, Button } from 'react-bootstrap';
import { toast } from 'react-toastify';
import './Post.css';
import { createPost, editPost, deletePost } from '../../utils/api';

const PostModal = ({ show, handleClose, post, actionType, fetchPosts }) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  useEffect(() => {
    if (actionType === 'edit' && post) {
      setTitle(post.title);
      setContent(post.content);
    } else if (actionType === 'create') {
      setTitle('');
      setContent('');
    }
  }, [post, actionType]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('jwtToken');

    try {
      if (actionType === 'create') {
        const response = await createPost({ title, content },token);
        toast.success(response?.data?.message || 'Post created successfully!');
      } else if (actionType === 'edit') {
        const response = await editPost(post.id, { title, content }, token);
        toast.success(response?.data?.message || 'Post updated successfully!');
      } else if (actionType === 'delete') {
        const response = await deletePost(post.id ,token);
        toast.success(response?.data?.message || 'Post deleted successfully!');
      }

      fetchPosts();
      handleClose();
    } catch (err) {
      toast.error(err?.response?.data?.message || 'Something went wrong.');
    }
  };

  const renderContent = () => {
    if (actionType === 'delete') {
      return <p>Are you sure you want to delete this post?</p>;
    } else {
      return (
        <>
          <div className="form-group">
            <label>Title</label>
            <input
              type="text"
              className="form-control"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label>Content</label>
            <textarea
              className="form-control"
              rows="4"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              required
            />
          </div>
        </>
      );
    }
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>{actionType === 'delete' ? 'Delete Post' : actionType === 'edit' ? 'Edit Post' : 'Create a New Post'}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form onSubmit={handleSubmit}>
          {renderContent()}
          {actionType !== 'delete' && (
            <Button type="submit" variant="primary" className="mt-6">
              {actionType === 'edit' ? 'Update Post' : 'Create Post'}
            </Button>
          )}
        </form>
      </Modal.Body>
      <Modal.Footer>
        {actionType === 'delete' ? (
          <>
            <Button variant="danger" onClick={handleSubmit}>
              Delete
            </Button>
            <Button variant="secondary" onClick={handleClose}>
              Cancel
            </Button>
          </>
        ) : null}
      </Modal.Footer>
    </Modal>
  );
};

export default PostModal;
