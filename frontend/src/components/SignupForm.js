import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // React Router v6
import { api } from '../api';

const SignupForm = () => {
  const [username, setUsername] = useState('');  // State for username
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate(); // Replaces useHistory in React Router v6

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const { data } = await api.post('/auth/register', { username, email, password }); // Include username in the API call
      alert('Signup successful! You can now login.');
      navigate('/login'); // Redirect to login page after successful signup
    } catch (error) {
      setError(error.response?.data?.message || 'Signup failed. Try again.'); // Display error message
    }
  };

  return (
    <div style={styles.container}>
      <form onSubmit={handleSubmit} style={styles.form}>
        <h2>Sign Up</h2>

        {error && <p style={styles.error}>{error}</p>} {/* Display error message */}

        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)} // Handle username input
          required
          style={styles.input}
        />

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)} // Handle email input
          required
          style={styles.input}
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)} // Handle password input
          required
          style={styles.input}
        />

        <button type="submit" style={styles.button}>Sign Up</button>
      </form>
    </div>
  );
};

// Styling for the form and components
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
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', // Added shadow for aesthetics
  },
  input: {
    padding: '10px',
    fontSize: '16px',
    borderRadius: '4px',
    border: '1px solid #ddd',
    marginBottom: '10px',
  },
  button: {
    padding: '10px',
    fontSize: '16px',
    backgroundColor: '#28a745',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    transition: 'background-color 0.3s', // Added transition effect
  },
  buttonHover: {
    backgroundColor: '#218838', // Slightly darker green on hover
  },
  error: {
    color: 'red',
    fontSize: '14px',
  },
};

export default SignupForm;
