
import React from "react";
import { useParams, Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { getServiceBySlug } from "@/data/services";
import { getProvidersByServiceId } from "@/data/providers";
import ProviderCard from "@/components/ProviderCard";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

const ServiceCategory = () => {
  const { slug } = useParams<{ slug: string }>();
  const service = getServiceBySlug(slug || "");
  const providers = service ? getProvidersByServiceId(service.id) : [];

  if (!service) {
    return (
      <div>
        <Navbar />
        <div className="container mx-auto px-4 py-16 text-center">
          <h2 className="text-3xl font-bold mb-4">Service Not Found</h2>
          <p className="mb-8">Sorry, we couldn't find the service you're looking for.</p>
          <Link to="/">
            <Button variant="outline">Return to Home</Button>
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        {/* Hero Banner */}
        <div className="relative h-64 md:h-80 lg:h-96">
          <img 
            src={service.image} 
            alt={service.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/40"></div>
          <div className="absolute inset-0 flex items-center">
            <div className="container mx-auto px-4">
              <Link to="/" className="inline-flex items-center text-white mb-4 hover:text-primary-foreground transition-colors">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Home
              </Link>
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">{service.name}</h1>
              <p className="text-white/90 max-w-2xl text-lg">{service.description}</p>
            </div>
          </div>
        </div>
        
        {/* Providers Section */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="mb-10">
              <h2 className="text-2xl font-bold mb-4">Available Service Providers</h2>
              <p className="text-gray-600 max-w-2xl">
                Choose from our trusted and vetted professionals specializing in {service.name.toLowerCase()}.
              </p>
            </div>
            
            {providers.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {providers.map((provider) => (
                  <ProviderCard 
                    key={provider.id} 
                    provider={provider}
                    serviceSlug={service.slug}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-12 bg-white rounded-lg shadow-sm">
                <h3 className="text-xl font-medium mb-2">No providers available</h3>
                <p className="text-gray-600 mb-4">
                  We're currently adding new service providers in this category.
                </p>
                <Link to="/">
                  <Button>Return to Home</Button>
                </Link>
              </div>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default ServiceCategory;
