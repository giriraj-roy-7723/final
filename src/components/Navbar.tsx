
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import AuthButton from './AuthButton';

const Navbar = () => {
  const [isOpen, setIsOpen] = React.useState(false);
  const location = useLocation();
  const isProvider = location.pathname === "/provider-auth" || localStorage.getItem("userType") === "provider";

  return (
    <nav className="bg-white shadow-sm py-4">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <span className="text-primary text-2xl font-bold">ServiceSquad</span>
            </Link>
          </div>
          
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-gray-700 hover:text-primary transition-colors">Home</Link>
            <Link to="/services/house-cleaning" className="text-gray-700 hover:text-primary transition-colors">Services</Link>
            <Link to="#" className="text-gray-700 hover:text-primary transition-colors">How it Works</Link>
            <Link to="#" className="text-gray-700 hover:text-primary transition-colors">About Us</Link>
          </div>
          
          <div className="hidden md:flex items-center space-x-4">
            <AuthButton userType={isProvider ? "provider" : "client"} />
          </div>
          
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-700 focus:outline-none"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
        
        {/* Mobile menu */}
        {isOpen && (
          <div className="md:hidden mt-4">
            <div className="flex flex-col space-y-4">
              <Link to="/" className="text-gray-700 hover:text-primary transition-colors py-2">Home</Link>
              <Link to="/services/house-cleaning" className="text-gray-700 hover:text-primary transition-colors py-2">Services</Link>
              <Link to="#" className="text-gray-700 hover:text-primary transition-colors py-2">How it Works</Link>
              <Link to="#" className="text-gray-700 hover:text-primary transition-colors py-2">About Us</Link>
              <div className="flex flex-col space-y-2 pt-2">
                <AuthButton userType={isProvider ? "provider" : "client"} />
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
