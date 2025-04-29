// src/components/AuthForm.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login, register } from '../api/auth';
import { useAuth } from '../context/AuthContext';
import AuthHeader from './AuthHeader';
import { Link } from 'react-router-dom';


export default function AuthForm({ type }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [err, setErr] = useState('');
  const { login: loginCtx } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async e => {
    e.preventDefault();
    setErr('');
    try {
      const fn = type === 'login' ? login : register;
      const { data } = await fn({ email, password });
      if (type === 'login') {
        loginCtx(data.user, data.token);
        navigate('/');
      } else {
        navigate('/login');
      }
    } catch (e) {
      setErr(e.response?.data?.message || 'Error');
    }
  };

  return (
    <div className="auth-page-wrapper">
      <AuthHeader />
      <form onSubmit={handleSubmit} className="auth-form">
        <h2>{type === 'login' ? 'Login' : 'Register'}</h2>
        {err && <div className="error">{err}</div>}
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={e=>setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={e=>setPassword(e.target.value)}
          required
        />
        <button type="submit">{type === 'login' ? 'Login' : 'Register'}</button>
        {type === 'login' ? (
  <div className="auth-switch">
    Not registered?{' '}
    <Link to="/register">Register here</Link>
  </div>
) : (
  <div className="auth-switch">
    Already have an account?{' '}
    <Link to="/login">Login here</Link>
  </div>
)}

      </form>
    </div>
  );
}
