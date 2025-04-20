import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Header = ({ isAuthenticated, userRole }) => {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [username, setUsername] = useState('');

  useEffect(() => {
    // Get username from localStorage if authenticated
    if (isAuthenticated) {
      const storedUsername = localStorage.getItem('username');
      setUsername(storedUsername || '');
    } else {
      setUsername('');
    }
  }, [isAuthenticated]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userRole');
    localStorage.removeItem('username');
    window.location.href = '/'; // Redirect to landing page after logout
  };

  return (
    <header className="fixed w-full top-0 z-50 bg-[#1a1c2e]/80 backdrop-blur-xl border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <Link to="/" className="flex items-center space-x-2">
            <h1 className="text-3xl font-space font-bold">
              <span className="text-white">Service</span>
              <span className="bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 text-transparent bg-clip-text">Squad</span>
            </h1>
          </Link>

          {/* Mobile menu button */}
          <button 
            className="md:hidden relative w-10 h-10 rounded-lg bg-white/5 hover:bg-white/10 transition-colors duration-200"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <span className="sr-only">Open menu</span>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-5 h-5 flex flex-col justify-center space-y-1.5">
                <span className={`block w-5 h-0.5 bg-white transform transition-transform duration-300 ${isMenuOpen ? 'rotate-45 translate-y-2' : ''}`}></span>
                <span className={`block w-5 h-0.5 bg-white transition-opacity duration-300 ${isMenuOpen ? 'opacity-0' : ''}`}></span>
                <span className={`block w-5 h-0.5 bg-white transform transition-transform duration-300 ${isMenuOpen ? '-rotate-45 -translate-y-2' : ''}`}></span>
              </div>
            </div>
          </button>

          <nav className={`hidden md:flex items-center space-x-1`}>
            <Link to="/" className="px-4 py-2 text-sm font-medium text-gray-300 hover:text-white rounded-lg hover:bg-white/5 transition-all duration-200">
              Home
            </Link>
            
            {!isAuthenticated ? (
              <>
                <Link to="/login" className="px-4 py-2 text-sm font-medium text-gray-300 hover:text-white rounded-lg hover:bg-white/5 transition-all duration-200">
                  Client Login
                </Link>
                <Link to="/signup" className="px-4 py-2 text-sm font-medium text-gray-300 hover:text-white rounded-lg hover:bg-white/5 transition-all duration-200">
                  Client Sign Up
                </Link>
                <Link to="/worker/login" 
                  className="ml-2 px-4 py-2 text-sm font-medium text-white rounded-lg 
                    bg-gradient-to-r from-purple-500 to-pink-500 hover:shadow-lg 
                    hover:shadow-purple-500/25 transition-all duration-300"
                >
                  Service Provider
                </Link>
              </>
            ) : (
              <>
                <Link 
                  to={userRole === 'worker' ? '/worker/dashboard' : '/dashboard'} 
                  className="px-4 py-2 text-sm font-medium text-gray-300 hover:text-white rounded-lg hover:bg-white/5 transition-all duration-200"
                >
                  Dashboard
                </Link>
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-white/5">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center text-white font-medium">
                      {username ? username.charAt(0).toUpperCase() : 'U'}
                    </div>
                    <span className="text-sm font-medium text-white">
                      Welcome, {username}!
                    </span>
                  </div>
                  <button 
                    onClick={handleLogout} 
                    className="px-4 py-2 text-sm font-medium text-white rounded-lg 
                      bg-gradient-to-r from-red-500 to-pink-500 hover:shadow-lg 
                      hover:shadow-red-500/25 transition-all duration-300"
                  >
                    Logout
                  </button>
                </div>
              </>
            )}
          </nav>
        </div>
      </div>

      {/* Mobile menu */}
      <div className={`${isMenuOpen ? 'block' : 'hidden'} md:hidden border-t border-white/5 bg-[#1a1c2e]`}>
        <div className="px-4 py-2 space-y-1">
          <Link to="/" className="block px-4 py-2 text-base font-medium text-gray-300 hover:text-white rounded-lg hover:bg-white/5 transition-all duration-200">
            Home
          </Link>
          
          {!isAuthenticated ? (
            <>
              <Link to="/login" className="block px-4 py-2 text-base font-medium text-gray-300 hover:text-white rounded-lg hover:bg-white/5 transition-all duration-200">
                Client Login
              </Link>
              <Link to="/signup" className="block px-4 py-2 text-base font-medium text-gray-300 hover:text-white rounded-lg hover:bg-white/5 transition-all duration-200">
                Client Sign Up
              </Link>
              <Link to="/worker/login" 
                className="block px-4 py-2 text-base font-medium text-white rounded-lg 
                  bg-gradient-to-r from-purple-500 to-pink-500 hover:shadow-lg 
                  hover:shadow-purple-500/25 transition-all duration-300 mt-2"
              >
                Service Provider
              </Link>
            </>
          ) : (
            <>
              <Link 
                to={userRole === 'worker' ? '/worker/dashboard' : '/dashboard'} 
                className="block px-4 py-2 text-base font-medium text-gray-300 hover:text-white rounded-lg hover:bg-white/5 transition-all duration-200"
              >
                Dashboard
              </Link>
              <div className="px-4 py-2 flex items-center gap-2 rounded-lg bg-white/5 mt-2">
                <div className="w-8 h-8 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center text-white font-medium">
                  {username ? username.charAt(0).toUpperCase() : 'U'}
                </div>
                <span className="text-sm font-medium text-white">
                  Welcome, {username}!
                </span>
              </div>
              <button 
                onClick={handleLogout} 
                className="block w-full px-4 py-2 text-base font-medium text-white rounded-lg 
                  bg-gradient-to-r from-red-500 to-pink-500 hover:shadow-lg 
                  hover:shadow-red-500/25 transition-all duration-300 mt-2 text-left"
              >
                Logout
              </button>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;