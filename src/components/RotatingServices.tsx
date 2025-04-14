
import React, { useState, useEffect } from "react";
import { services } from "@/data/services";
import { ArrowRight, Home, Utensils, Car, Wrench, Pipe, Hammer, BadgeAlert, WashingMachine } from "lucide-react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

const RotatingServices = () => {
  const [currentServiceIndex, setCurrentServiceIndex] = useState(0);
  
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentServiceIndex((prevIndex) => (prevIndex + 1) % services.length);
    }, 3000);
    
    return () => clearInterval(interval);
  }, []);
  
  const currentService = services[currentServiceIndex];
  
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case "home": return <Home className="w-5 h-5" />;
      case "utensils": return <Utensils className="w-5 h-5" />;
      case "car": return <Car className="w-5 h-5" />;
      case "wrench": return <Wrench className="w-5 h-5" />;
      case "pipe": return <Pipe className="w-5 h-5" />;
      case "hammer": return <Hammer className="w-5 h-5" />;
      case "washing-machine": return <WashingMachine className="w-5 h-5" />;
      default: return <BadgeAlert className="w-5 h-5" />;
    }
  };

  return (
    <div className="relative h-24 overflow-hidden my-4">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentService.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.5 }}
          className="absolute inset-0"
        >
          <div className="bg-gray-50 p-4 rounded-lg border border-gray-200 flex items-center justify-between">
            <div className="flex items-center">
              <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center text-primary mr-3">
                {getIcon(currentService.iconName)}
              </div>
              <div>
                <h3 className="font-medium text-gray-900">{currentService.name}</h3>
                <p className="text-sm text-gray-500 truncate max-w-xs">{currentService.description}</p>
              </div>
            </div>
            <Link to={`/services/${currentService.slug}`} className="flex items-center text-primary hover:underline text-sm">
              View Details
              <ArrowRight className="ml-1 h-4 w-4" />
            </Link>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default RotatingServices;
