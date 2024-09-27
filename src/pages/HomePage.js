import React, { useEffect, useState } from 'react';
import PostList from '../components/Posts/PostList';
import { getallPost } from '../utils/api';
import { toast } from 'react-toastify';
import FadeLoader from "react-spinners/FadeLoader";

const HomePage = () => {

  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);


  const fetchPosts = async () => {
    try {
      setLoading(true)
      const response = await getallPost();
      setPosts(response.data);
      setLoading(false)
    } catch (error) {
      setLoading(false);
      toast.error(error?.response?.data?.message || 'Something Went Wrong. Try Again');

    }
  };

  useEffect(() => {
    fetchPosts();
  }, [])

  return (
    <div>
      {loading ? (
        <div className='d-flex justify-content-center align-center'>
        <FadeLoader
          loading={loading}
          size={150}
          aria-label="Loading Spinner"
          data-testid="loader"
          color='blue'
        />
        </div>
      ) : (
        <>
          <h1>Latest Blog Posts</h1>
          <PostList posts={posts} fetchPosts={fetchPosts} />
        </>
      )}
    </div>
  );
};

export default HomePage;
