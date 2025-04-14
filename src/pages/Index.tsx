
import React from "react";
import { Link } from "react-router-dom";
import Hero from "@/components/Hero";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ServiceCard from "@/components/ServiceCard";
import { services, getPopularServices } from "@/data/services";
import FeatureSection from "@/components/FeatureSection";
import TestimonialSection from "@/components/TestimonialSection";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const Index = () => {
  const popularServices = getPopularServices();

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <Hero />
        
        {/* Popular Services Section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Our Popular Services</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Discover our most requested home services from trusted professionals in your area.
              </p>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {popularServices.map((service) => (
                <ServiceCard key={service.id} service={service} />
              ))}
            </div>
            
            <div className="text-center mt-12">
              <Link to="/services/house-cleaning">
                <Button variant="outline" size="lg" className="border-primary text-primary hover:bg-primary hover:text-white">
                  View All Services <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </div>
          </div>
        </section>
        
        {/* How It Works */}
        <FeatureSection />
        
        {/* CTA Section */}
        <section className="py-16 bg-primary">
          <div className="container mx-auto px-4">
            <div className="text-center">
              <h2 className="text-3xl font-bold text-white mb-4">Ready to Get Started?</h2>
              <p className="text-white/90 max-w-2xl mx-auto mb-8">
                Book your first service today and experience the difference with our trusted professionals.
              </p>
              <Link to="/services/house-cleaning">
                <Button variant="secondary" size="lg" className="bg-white text-primary hover:bg-gray-100">
                  Book a Service Now
                </Button>
              </Link>
            </div>
          </div>
        </section>
        
        {/* Testimonials */}
        <TestimonialSection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
