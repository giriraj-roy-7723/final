import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { api, setAuthToken } from '../api';

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate(); // useNavigate instead of useHistory

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const { data } = await api.post('/auth/login', { email, password });

      // Save token and set default headers
      localStorage.setItem('token', data.token);
      setAuthToken(data.token);

      // Redirect to dashboard or home
      navigate('/dashboard');
    } catch (error) {
      setError(error.response?.data?.message || 'Login failed. Try again.');
    }
  };

  return (
    <div style={styles.container}>
      <form onSubmit={handleSubmit} style={styles.form}>
        <h2>Login</h2>

        {error && <p style={styles.error}>{error}</p>}

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          style={styles.input}
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          style={styles.input}
        />

        <button type="submit" style={styles.button}>Login</button>
      </form>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    marginTop: '80px',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    width: '300px',
    gap: '10px',
    padding: '20px',
    border: '1px solid #ccc',
    borderRadius: '8px',
    backgroundColor: '#f9f9f9',
  },
  input: {
    padding: '10px',
    fontSize: '16px',
  },
  button: {
    padding: '10px',
    fontSize: '16px',
    backgroundColor: '#007bff',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
  },
  error: {
    color: 'red',
    fontSize: '14px',
  },
};

export default LoginForm;
