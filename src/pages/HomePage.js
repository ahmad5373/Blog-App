import React from 'react';
import PostList from '../components/Posts/PostList';

const HomePage = ({ posts, fetchPosts }) => {
    return (
        <div>
            <h1>Latest Blog Posts</h1>
            <PostList posts={posts}  fetchPosts={fetchPosts}/>
        </div>
    );
};

export default HomePage;
