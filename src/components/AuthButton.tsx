
import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { LogIn, LogOut, UserPlus } from "lucide-react";

interface AuthButtonProps {
  userType?: string;
}

const AuthButton: React.FC<AuthButtonProps> = ({ userType }) => {
  const navigate = useNavigate();
  const isLoggedIn = Boolean(localStorage.getItem("userType"));
  const currentUserType = localStorage.getItem("userType");
  
  const handleLogin = () => {
    if (userType === "provider") {
      navigate("/provider-auth");
    } else {
      navigate("/client-auth");
    }
  };

  const handleSignup = () => {
    if (userType === "provider") {
      navigate("/provider-auth?tab=register");
    } else {
      navigate("/client-auth?tab=register");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("userType");
    localStorage.removeItem("userEmail");
    window.location.href = "/";
  };

  if (isLoggedIn) {
    return (
      <Button 
        variant="outline" 
        className="border-primary text-primary hover:bg-primary hover:text-white"
        onClick={handleLogout}
      >
        <LogOut size={16} className="mr-2" /> Logout
      </Button>
    );
  }

  return (
    <div className="flex space-x-2">
      <Button 
        variant="outline" 
        className="border-primary text-primary hover:bg-primary hover:text-white"
        onClick={handleLogin}
      >
        <LogIn size={16} className="mr-2" /> Login
      </Button>
      <Button 
        className="bg-primary text-white hover:bg-primary/90"
        onClick={handleSignup}
      >
        <UserPlus size={16} className="mr-2" /> Sign Up
      </Button>
    </div>
  );
};

export default AuthButton;
