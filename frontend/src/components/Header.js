import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  // Main container style with full-page gradient
  const containerStyle = {
    background: 'linear-gradient(135deg, #0f0c29, #302b63, #24243e)',
    minHeight: '100vh',
    color: '#fff',
    padding: '2rem',
    fontFamily: "'Poppins', sans-serif",
  };

  const headerStyle = {
    background: 'rgba(255, 255, 255, 0.1)',
    backdropFilter: 'blur(10px)',
    borderRadius: '20px',
    padding: '2rem',
    marginBottom: '2rem',
    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)',
    border: '1px solid rgba(255, 255, 255, 0.1)',
  };

  const titleStyle = {
    margin: 0,
    fontSize: '3rem',
    fontWeight: '800',
    letterSpacing: '2px',
    textTransform: 'uppercase',
    fontFamily: "'Montserrat', sans-serif",
    textAlign: 'center',
    background: 'linear-gradient(90deg, #ff8a00, #e52e71)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    textShadow: '0 0 20px rgba(229, 46, 113, 0.3)',
    marginBottom: '1rem',
  };

  const subtitleStyle = {
    fontSize: '1.2rem',
    fontWeight: '300',
    textAlign: 'center',
    marginBottom: '2rem',
    opacity: 0.9,
  };

  const navStyle = {
    display: 'flex',
    justifyContent: 'center',
    gap: '3rem',
    marginTop: '1.5rem',
  };

  // Create link styles as objects to reuse
  const linkBaseStyle = {
    color: '#fff',
    textDecoration: 'none',
    fontWeight: '600',
    fontSize: '1.1rem',
    transition: 'all 0.3s ease',
    padding: '0.5rem 1.5rem',
    borderRadius: '50px',
    background: 'rgba(255, 255, 255, 0.1)',
    border: '1px solid rgba(255, 255, 255, 0.2)',
    cursor: 'pointer', // Ensure it looks clickable
  };

  const linkHoverStyle = {
    background: 'linear-gradient(90deg, #ff8a00, #e52e71)',
    boxShadow: '0 0 20px rgba(229, 46, 113, 0.5)',
    transform: 'translateY(-3px)',
    border: '1px solid transparent',
  };

  const infoSectionStyle = {
    background: 'rgba(255, 255, 255, 0.1)',
    backdropFilter: 'blur(10px)',
    color: '#fff',
    padding: '2.5rem',
    borderRadius: '20px',
    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.2)',
    border: '1px solid rgba(255, 255, 255, 0.1)',
    width: '80%',
    maxWidth: '800px',
    margin: '0 auto',
    textAlign: 'center',
    fontSize: '1.1rem',
    lineHeight: '1.8',
  };

  const infoTitleStyle = {
    fontSize: '2rem',
    fontWeight: '700',
    marginBottom: '1.5rem',
    background: 'linear-gradient(90deg, #00d2ff, #3a7bd5)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
  };

  // State for hover effects
  const [hoverStates, setHoverStates] = React.useState({
    home: false,
    login: false,
    signup: false
  });

  const handleMouseEnter = (link) => {
    setHoverStates(prev => ({ ...prev, [link]: true }));
  };

  const handleMouseLeave = (link) => {
    setHoverStates(prev => ({ ...prev, [link]: false }));
  };

  return (
    <div style={containerStyle}>
      <header style={headerStyle}>
        <h1 style={titleStyle}>Service Platform</h1>
        <p style={subtitleStyle}>Your gateway to premium services</p>
        <nav style={navStyle}>
          <Link 
            to="/" 
            style={{
              ...linkBaseStyle,
              ...(hoverStates.home ? linkHoverStyle : {})
            }}
            onMouseEnter={() => handleMouseEnter('home')}
            onMouseLeave={() => handleMouseLeave('home')}
          >
            Home
          </Link>
          <Link 
            to="/login" 
            style={{
              ...linkBaseStyle,
              ...(hoverStates.login ? {
                ...linkHoverStyle,
                animation: 'none' // Disable pulse when hovered
              } : { animation: 'pulse 2s infinite' })
            }}
            onMouseEnter={() => handleMouseEnter('login')}
            onMouseLeave={() => handleMouseLeave('login')}
          >
            Login
          </Link>
          <Link 
            to="/signup" 
            style={{
              ...linkBaseStyle,
              ...(hoverStates.signup ? {
                background: 'linear-gradient(90deg, #3a7bd5, #00d2ff)',
                boxShadow: '0 0 20px rgba(0, 210, 255, 0.5)',
                transform: 'translateY(-3px)',
                border: '1px solid transparent',
              } : {})
            }}
            onMouseEnter={() => handleMouseEnter('signup')}
            onMouseLeave={() => handleMouseLeave('signup')}
          >
            Sign Up
          </Link>
        </nav>
      </header>
      
      <div style={infoSectionStyle}>
        <h2 style={infoTitleStyle}>Welcome to Our Service Platform!</h2>
        <p>
          We provide a range of premium services to elevate your lifestyle. Whether you need home repairs, cleaning, or specialized maintenance, we connect you with top-tier professionals.
        </p>
        <p>
          <strong>Sign up today</strong> to access our network of vetted service providers, book appointments seamlessly, and manage all your service needs in one sophisticated platform.
        </p>
        <p style={{ marginTop: '1.5rem' }}>
          Start exploring now or login to unlock personalized recommendations and exclusive offers.
        </p>
      </div>

      {/* Add this to your global CSS */}
      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@800&family=Poppins:wght@300;400;600;700&display=swap');
          
          @keyframes pulse {
            0% { transform: scale(1); }
            50% { transform: scale(1.05); }
            100% { transform: scale(1); }
          }
        `}
      </style>
    </div>
  );
};

export default Header;