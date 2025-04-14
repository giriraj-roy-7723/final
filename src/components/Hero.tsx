
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

const Hero = () => {
  return (
    <div className="hero-pattern py-16 md:py-24 lg:py-32">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-gray-900 leading-tight">
            Expert Home Services <span className="text-primary">On Demand</span>
          </h1>
          <p className="text-lg md:text-xl text-gray-600 mb-8">
            Connect with trusted professionals for all your household needs - from cleaning and cooking to repairs and maintenance.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link to="/services/house-cleaning">
              <Button className="bg-primary hover:bg-primary/90 text-white px-8 py-6 text-lg rounded-md w-full">
                Book a Service <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link to="#">
              <Button variant="outline" className="border-primary text-primary hover:bg-primary hover:text-white px-8 py-6 text-lg rounded-md w-full">
                Become a Provider
              </Button>
            </Link>
          </div>
          <div className="mt-8 flex flex-wrap justify-center gap-4 text-sm text-gray-500">
            <div className="flex items-center">
              <svg className="h-5 w-5 mr-2 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              Verified Professionals
            </div>
            <div className="flex items-center">
              <svg className="h-5 w-5 mr-2 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              Satisfaction Guaranteed
            </div>
            <div className="flex items-center">
              <svg className="h-5 w-5 mr-2 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              Secure Payments
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
