import React, { useEffect, useState } from 'react';
import PostList from '../components/Posts/PostList';
import { getallPost } from '../utils/api';
import { toast } from 'react-toastify';

const HomePage = () => {
    
  const [posts, setPosts] = useState([]);

  const fetchPosts = async () => {
    try {
        const response = await getallPost();
        setPosts(response.data);
    } catch (error) {
      toast.error(error?.response?.data?.message || 'Something Went Wrong. Try Again');

    }
  };

  useEffect(()=>{
    fetchPosts();
  },[])

    return (
        <div>
            <h1>Latest Blog Posts</h1>
            <PostList posts={posts}  fetchPosts={fetchPosts}/>
        </div>
    );
};

export default HomePage;
