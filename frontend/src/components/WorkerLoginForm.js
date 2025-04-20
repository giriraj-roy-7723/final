import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { api, setAuthToken } from '../api';

const WorkerLoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await api.post('/auth/worker/login', { email, password });
      const { token, username } = response.data.user;
      
      // Save auth data
      localStorage.setItem('token', token);
      localStorage.setItem('userRole', 'worker');
      localStorage.setItem('username', username);
      setAuthToken(token);

      // Force a page reload to update all states
      window.location.href = '/worker/dashboard';
    } catch (error) {
      console.error('Login error:', error);
      setError(
        error.response?.data?.message || 
        'Login failed. Please check your credentials and try again.'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen pt-20 pb-12">
      <div className="max-w-md mx-auto bg-[#1f2937]/50 backdrop-blur-xl rounded-2xl overflow-hidden border border-gray-700">
        <div className="px-8 pt-8 pb-6">
          <h2 className="text-3xl font-bold text-center bg-gradient-to-r from-blue-400 to-cyan-500 bg-clip-text text-transparent font-space">
            Service Provider Login
          </h2>
          <p className="mt-2 text-center text-gray-400 font-outfit">
            Access your provider dashboard
          </p>
        </div>

        <form onSubmit={handleSubmit} className="px-8 pb-8 space-y-6">
          {error && (
            <div className="p-4 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-sm text-center">
              {error}
            </div>
          )}

          <div className="space-y-2">
            <label htmlFor="email" className="block text-sm font-medium text-gray-300">
              Email
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-3 rounded-lg bg-gray-800/50 border border-gray-700 text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              placeholder="Enter your email"
              disabled={loading}
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="password" className="block text-sm font-medium text-gray-300">
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-4 py-3 rounded-lg bg-gray-800/50 border border-gray-700 text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              placeholder="Enter your password"
              disabled={loading}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full py-3 px-4 rounded-lg font-medium transition-all duration-300 ${
              loading
                ? 'bg-gray-600 cursor-not-allowed'
                : 'bg-gradient-to-r from-blue-500 to-cyan-500 hover:shadow-lg hover:shadow-blue-500/25'
            }`}
          >
            {loading ? 'Logging in...' : 'Login as Provider'}
          </button>

          <p className="text-center text-gray-400 text-sm">
            Want to become a service provider?{' '}
            <Link 
              to="/worker/signup" 
              className="text-blue-400 hover:text-blue-300 font-medium transition-colors"
            >
              Sign up here
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default WorkerLoginForm;