import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate, Link } from 'react-router-dom';
import Header from './components/Header';
import LoginForm from './components/LoginForm';
import SignupForm from './components/SignupForm';
import WorkerLoginForm from './components/WorkerLoginForm';
import WorkerSignupForm from './components/WorkerSignupForm';
import WorkerDashboard from './components/WorkerDashboard';
import Dashboard from './components/Dashboard';

const ProtectedRoute = ({ children, allowedRole }) => {
  const token = localStorage.getItem('token');
  const userRole = localStorage.getItem('userRole');

  if (!token) {
    return <Navigate to="/login" />;
  }

  if (allowedRole && userRole !== allowedRole) {
    return <Navigate to="/" />;
  }

  return children;
};

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userRole, setUserRole] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const storedRole = localStorage.getItem('userRole');
    if (token) {
      setIsAuthenticated(true);
      setUserRole(storedRole);
    } else {
      setIsAuthenticated(false);
      setUserRole(null);
    }
  }, []);

  return (
    <Router>
      <Header isAuthenticated={isAuthenticated} userRole={userRole} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/signup" element={<SignupForm />} />
        <Route path="/worker/login" element={<WorkerLoginForm />} />
        <Route path="/worker/signup" element={<WorkerSignupForm />} />
        <Route
          path="/worker/dashboard"
          element={
            <ProtectedRoute allowedRole="worker">
              <WorkerDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute allowedRole="user">
              <Dashboard />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
};

const Home = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#1a1c2e] to-[#2d1b69]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16">
        <div className="text-center">
          <h1 className="text-5xl md:text-7xl font-bold font-space mb-6">
            <span className="text-white">Your Gateway to</span>
            <br />
            <span className="bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 text-transparent bg-clip-text">
              Professional Services
            </span>
          </h1>
          
          <p className="text-gray-300 text-xl md:text-2xl mb-12 font-outfit max-w-3xl mx-auto">
            Connect with skilled professionals for all your service needs. 
            From home repairs to specialized expertise, we've got you covered.
          </p>

          <div className="flex flex-col md:flex-row justify-center gap-8 max-w-4xl mx-auto px-4">
            <div className="flex-1 bg-white/5 backdrop-blur-xl rounded-2xl p-8 border border-purple-500/20 hover:border-purple-500/40 transition-all duration-300">
              <div className="h-16 w-16 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-white mb-4">Looking for Services?</h2>
              <p className="text-gray-300 mb-6">
                Find trusted professionals for any job. Book services with confidence and get things done.
              </p>
              <div className="space-y-3">
                <Link to="/login" className="block w-full py-3 px-4 rounded-lg bg-gradient-to-r from-purple-500 to-pink-500 text-white font-medium hover:shadow-lg hover:shadow-purple-500/30 transition-all duration-300">
                  Client Login
                </Link>
                <Link to="/signup" className="block w-full py-3 px-4 rounded-lg bg-white/10 text-white font-medium hover:bg-white/20 transition-all duration-300">
                  Create Account
                </Link>
              </div>
            </div>

            <div className="flex-1 bg-white/5 backdrop-blur-xl rounded-2xl p-8 border border-blue-500/20 hover:border-blue-500/40 transition-all duration-300">
              <div className="h-16 w-16 rounded-full bg-gradient-to-r from-blue-500 to-cyan-500 flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-white mb-4">Service Provider?</h2>
              <p className="text-gray-300 mb-6">
                Join our platform to showcase your skills, find clients, and grow your business.
              </p>
              <div className="space-y-3">
                <Link to="/worker/login" className="block w-full py-3 px-4 rounded-lg bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-medium hover:shadow-lg hover:shadow-blue-500/30 transition-all duration-300">
                  Provider Login
                </Link>
                <Link to="/worker/signup" className="block w-full py-3 px-4 rounded-lg bg-white/10 text-white font-medium hover:bg-white/20 transition-all duration-300">
                  Become a Provider
                </Link>
              </div>
            </div>
          </div>

          <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="p-6">
              <div className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500 mb-2">100+</div>
              <div className="text-gray-300">Professional Services</div>
            </div>
            <div className="p-6">
              <div className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-500 mb-2">1000+</div>
              <div className="text-gray-300">Happy Customers</div>
            </div>
            <div className="p-6">
              <div className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-500 mb-2">500+</div>
              <div className="text-gray-300">Expert Providers</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
