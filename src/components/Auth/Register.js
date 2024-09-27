import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { setToken } from '../../utils/auth';
import './Auth.css'; 
import { signup } from '../../utils/api';
import { toast } from 'react-toastify';
import FadeLoader from 'react-spinners/FadeLoader';

const Register = ({ setIsAuthenticated }) => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const response = await signup({ username, email, password });
      const { access_token } = response.data;
      toast.success(response?.data?.message || 'Register User successfully!');
      setToken(access_token);
      setIsAuthenticated(true);
      setLoading(false);
      navigate('/');
    } catch (err) {
      setLoading(false);
      toast.error(err?.response?.data?.message || 'Something went wrong.');
    }
  };

  return (
    <div className="register-container">
      <div className="register-card">
        <h2>Register</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Username</label>
            <input
              type="text"
              className="form-control"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
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
          <button type="submit" className="btn btn-primary btn-block mt-6">
            Register
          </button>
          )}
        </form>
        <div className="text-center mt-3">
          <span>Already have an account? </span>
          <Link className="link" to="/login">Login</Link>
        </div>
      </div>
    </div>
  );
};

export default Register;
