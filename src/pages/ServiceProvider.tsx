
import React from "react";
import { useParams, Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { getServiceBySlug } from "@/data/services";
import { getProviderBySlug } from "@/data/providers";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Calendar, Clock, MapPin, Phone } from "lucide-react";

const ServiceProvider = () => {
  const { slug, providerSlug } = useParams<{ slug: string; providerSlug: string }>();
  
  const service = getServiceBySlug(slug || "");
  const provider = getProviderBySlug(providerSlug || "");

  if (!service || !provider) {
    return (
      <div>
        <Navbar />
        <div className="container mx-auto px-4 py-16 text-center">
          <h2 className="text-3xl font-bold mb-4">Provider Not Found</h2>
          <p className="mb-8">Sorry, we couldn't find the service provider you're looking for.</p>
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
      <main className="flex-grow bg-gray-50">
        <div className="container mx-auto px-4 py-12">
          <Link 
            to={`/services/${service.slug}`}
            className="inline-flex items-center text-gray-600 mb-8 hover:text-primary transition-colors"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to {service.name}
          </Link>

          {/* Provider Profile */}
          <div className="bg-white rounded-lg shadow-md overflow-hidden mb-8">
            <div className="p-6 md:p-8">
              <div className="flex flex-col md:flex-row md:items-start">
                <img
                  src={provider.image}
                  alt={provider.name}
                  className="w-24 h-24 md:w-32 md:h-32 rounded-full object-cover mb-4 md:mb-0 md:mr-6"
                />
                <div>
                  <h1 className="text-2xl md:text-3xl font-bold mb-2">{provider.name}</h1>
                  <div className="flex items-center mb-3">
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <svg
                          key={i}
                          className={`h-5 w-5 ${i < Math.floor(provider.rating) ? "text-yellow-400" : "text-gray-300"}`}
                          fill="currentColor"
                          viewBox="0 0 20 20"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                    </div>
                    <span className="ml-2 text-gray-500">
                      {provider.rating} ({provider.reviewCount} reviews)
                    </span>
                  </div>
                  <p className="text-lg font-medium text-primary mb-4">{provider.price}</p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {provider.tags.map((tag, index) => (
                      <span
                        key={index}
                        className="bg-blue-50 text-primary text-sm px-3 py-1 rounded-full"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <div className="flex items-center text-gray-500 mb-2">
                    <Clock className="h-4 w-4 mr-2" />
                    <span>{provider.availability}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Provider Details */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <div className="bg-white rounded-lg shadow-md p-6 md:p-8 mb-8">
                <h2 className="text-xl font-bold mb-4">About</h2>
                <p className="text-gray-600 mb-6">{provider.description}</p>
                
                <h2 className="text-xl font-bold mb-4">Service Details</h2>
                <ul className="space-y-3 text-gray-600">
                  <li className="flex items-start">
                    <span className="text-primary mr-2">•</span>
                    Professional {service.name.toLowerCase()} services tailored to your needs
                  </li>
                  <li className="flex items-start">
                    <span className="text-primary mr-2">•</span>
                    Brings own professional equipment and supplies
                  </li>
                  <li className="flex items-start">
                    <span className="text-primary mr-2">•</span>
                    Fully insured and background-checked
                  </li>
                  <li className="flex items-start">
                    <span className="text-primary mr-2">•</span>
                    Satisfaction guaranteed or your money back
                  </li>
                </ul>
              </div>

              <div className="bg-white rounded-lg shadow-md p-6 md:p-8">
                <h2 className="text-xl font-bold mb-4">Reviews</h2>
                
                <div className="space-y-6">
                  {[1, 2, 3].map((review) => (
                    <div key={review} className="border-b border-gray-100 pb-6 last:border-0">
                      <div className="flex items-start">
                        <img 
                          src={`https://i.pravatar.cc/40?img=${review + 10}`} 
                          alt="Reviewer" 
                          className="w-10 h-10 rounded-full mr-3"
                        />
                        <div>
                          <h4 className="font-medium">Client {review}</h4>
                          <div className="flex items-center mt-1 mb-2">
                            <div className="flex">
                              {[...Array(5)].map((_, i) => (
                                <svg
                                  key={i}
                                  className="h-4 w-4 text-yellow-400"
                                  fill="currentColor"
                                  viewBox="0 0 20 20"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                </svg>
                              ))}
                            </div>
                            <span className="text-sm text-gray-500 ml-2">1 month ago</span>
                          </div>
                          <p className="text-gray-600">
                            {review === 1 && "Excellent service! Very professional and thorough. Will definitely book again."}
                            {review === 2 && "Arrived on time and did a fantastic job. Highly recommended for quality work."}
                            {review === 3 && "Very knowledgeable and efficient. Solved my problem quickly and explained everything."}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Booking Card */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-lg shadow-md p-6 sticky top-6">
                <h2 className="text-xl font-bold mb-4">Book this Service</h2>
                <div className="border-b border-gray-100 pb-4 mb-4">
                  <p className="text-2xl font-bold text-primary">{provider.price}</p>
                  <p className="text-gray-500 text-sm">Starting price</p>
                </div>
                <Link to={`/book/${service.slug}/${provider.slug}`}>
                  <Button className="w-full mb-4">
                    Book Now
                  </Button>
                </Link>
                <Button variant="outline" className="w-full mb-6">
                  Contact Provider
                </Button>
                <p className="text-sm text-gray-500 text-center">
                  You won't be charged yet
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ServiceProvider;
