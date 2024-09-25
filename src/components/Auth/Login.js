import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { setToken } from '../../utils/auth';
import { toast } from 'react-toastify';
import { login } from '../../utils/api';
import './Auth.css'; 

const Login = ({ setIsAuthenticated }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await login({ email, password });
      console.log("response =>", response);
      const { access_token } = response.data;
      toast.success(response?.data?.message || 'LoggedIn successfully!');
      setToken(access_token); 
      setIsAuthenticated(true);
      navigate('/');
    } catch (err) {
      toast.error(err?.response?.data?.message || 'Something went wrong.');
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h2>Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              className="form-control"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              className="form-control"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="btn btn-primary btn-block mt-6">
            Login
          </button>
        </form>
        <div className="text-center mt-3">
          <span>Don't have an account? </span>
          <Link className="link" to="/register">Register</Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
