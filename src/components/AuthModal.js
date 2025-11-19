import React, { useState } from 'react';
import { useAuth } from '../hooks/useAuth';

const AuthModal = ({ onClose, showNotification }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const { login, register } = useAuth();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    password_confirm: '',
    username: '',
    role: 'student',
    name: '',
    age: '',
    institution: ''
  });

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      if (isLogin) {
        await login({
          email: formData.email,
          password: formData.password
        });
        showNotification('Welcome back!', 'success');
      } else {
        if (formData.password !== formData.password_confirm) {
          showNotification('Passwords do not match', 'error');
          setLoading(false);
          return;
        }
        
        await register({
          email: formData.email,
          username: formData.username || formData.email.split('@')[0],
          password: formData.password,
          password_confirm: formData.password_confirm,
          role: formData.role
        });
        showNotification('Account created successfully!', 'success');
      }
      onClose();
    } catch (error) {
      showNotification(error.message || 'Authentication failed', 'error');
    } finally {
      setLoading(false);
    }
  };

  const scrollModalDown = () => {
    const modalContent = document.querySelector('.modal-content');
    modalContent.scrollBy({
      top: 200,
      behavior: 'smooth'
    });
  };

  return (
    <div className="modal" onClick={(e) => e.target.className === 'modal' && onClose()}>
      <div className="modal-content">
        <span className="close" onClick={onClose}>&times;</span>
        <div className="scroll-indicator" onClick={scrollModalDown}>
          <i className="fas fa-chevron-down"></i>
        </div>
        
        <div className="auth-container">
          <div className="auth-tabs">
            <button 
              className={`tab-btn ${isLogin ? 'active' : ''}`}
              onClick={() => setIsLogin(true)}
            >
              Login
            </button>
            <button 
              className={`tab-btn ${!isLogin ? 'active' : ''}`}
              onClick={() => setIsLogin(false)}
            >
              Sign Up
            </button>
          </div>

          <div className="auth-form">
            <h2>{isLogin ? 'Welcome Back' : 'Create Account'}</h2>
            <form onSubmit={handleSubmit}>
              {!isLogin && (
                <div className="form-group">
                  <label>Username</label>
                  <input
                    type="text"
                    name="username"
                    value={formData.username}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              )}
              
              <div className="form-group">
                <label>Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                />
              </div>
              
              <div className="form-group">
                <label>Password</label>
                <div className="password-input">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    required
                    minLength="6"
                  />
                  <i 
                    className={`fas ${showPassword ? 'fa-eye-slash' : 'fa-eye'}`}
                    onClick={() => setShowPassword(!showPassword)}
                  ></i>
                </div>
              </div>

              {!isLogin && (
                <div className="form-group">
                  <label>Confirm Password</label>
                  <input
                    type="password"
                    name="password_confirm"
                    value={formData.password_confirm}
                    onChange={handleInputChange}
                    required
                    minLength="6"
                  />
                </div>
              )}
              
              <div className="form-group">
                <label>Role</label>
                <div className="role-selector">
                  <label>
                    <input
                      type="radio"
                      name="role"
                      value="student"
                      checked={formData.role === 'student'}
                      onChange={handleInputChange}
                    /> Student
                  </label>
                  <label>
                    <input
                      type="radio"
                      name="role"
                      value="teacher"
                      checked={formData.role === 'teacher'}
                      onChange={handleInputChange}
                    /> Teacher
                  </label>
                </div>
              </div>
              
              <button type="submit" className="btn-primary full-width" disabled={loading}>
                {loading ? 'Processing...' : (isLogin ? 'Login' : 'Sign Up')}
              </button>
              
              {isLogin && (
                <a href="#" className="forgot-password">Forgot Password?</a>
              )}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthModal;