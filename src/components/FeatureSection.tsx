
import { CheckCircle, Clock, Search, ShieldCheck } from "lucide-react";

const features = [
  {
    title: "Find Trusted Professionals",
    description: "Our service providers are vetted and verified, ensuring high-quality service for your needs.",
    icon: ShieldCheck
  },
  {
    title: "Book Services Easily",
    description: "Simple booking process allows you to schedule services at your convenience with just a few clicks.",
    icon: Clock
  },
  {
    title: "Browse and Compare",
    description: "View detailed profiles, ratings, and reviews to find the perfect service provider for your needs.",
    icon: Search
  },
  {
    title: "Satisfaction Guaranteed",
    description: "We stand by our service quality with our satisfaction guarantee on all bookings.",
    icon: CheckCircle
  }
];

const FeatureSection = () => {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">How ServiceSquad Works</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            We make it easy to find, book, and manage services for your home needs with our simple platform.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="bg-gray-50 rounded-lg p-6 text-center">
              <div className="flex justify-center mb-4">
                <div className="bg-primary/10 p-3 rounded-full">
                  <feature.icon className="h-8 w-8 text-primary" />
                </div>
              </div>
              <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeatureSection;
