import React, { useState, useEffect } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import HomePage from './pages/HomePage';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import BlogNavbar from './components/BlogNavbar';
import { getToken, removeToken } from './utils/auth'; 
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { getallPost } from './utils/api';

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [posts, setPosts] = useState([]);
  const navigate = useNavigate();

  const fetchPosts = async () => {
    try {
        const response = await getallPost();
        setPosts(response.data);
    } catch (error) {
      toast.error(error?.response?.data?.message || 'Something Went Wrong. Try Again');
    }
  };

  useEffect(() => {
    const token = getToken();
      setIsAuthenticated(!!token)
      fetchPosts();

  }, []);

  const handleLogout = () => {
    removeToken();
    setIsAuthenticated(false);
    navigate('/login');
  };

  return (
    <div>
      <BlogNavbar isAuthenticated={isAuthenticated} handleLogout={handleLogout} fetchPosts={fetchPosts}/>
      <div className="container mt-4">
        <Routes>
          <Route path="/" exact element={<HomePage posts={posts} fetchPosts={fetchPosts} />} />
          <Route path="/login" element={<Login setIsAuthenticated={setIsAuthenticated} />} />
          <Route path="/register" element={<Register setIsAuthenticated={setIsAuthenticated} />} />
        </Routes>
      </div>
        <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} />
    </div>
  );
};

export default App;
