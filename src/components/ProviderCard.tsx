
import { Link } from "react-router-dom";
import { Provider } from "../data/providers";
import { Button } from "@/components/ui/button";

interface ProviderCardProps {
  provider: Provider;
  serviceSlug: string;
}

const ProviderCard = ({ provider, serviceSlug }: ProviderCardProps) => {
  return (
    <div className="provider-card bg-white rounded-lg shadow-md overflow-hidden">
      <div className="p-6">
        <div className="flex items-start">
          <img
            src={provider.image}
            alt={provider.name}
            className="w-16 h-16 rounded-full object-cover mr-4"
          />
          <div>
            <h3 className="font-bold text-lg">{provider.name}</h3>
            <div className="flex items-center mt-1">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <svg
                    key={i}
                    className={`h-4 w-4 ${
                      i < Math.floor(provider.rating) ? "text-yellow-400" : "text-gray-300"
                    }`}
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <span className="text-sm text-gray-500 ml-1">
                {provider.rating} ({provider.reviewCount} reviews)
              </span>
            </div>
          </div>
        </div>
        
        <div className="mt-4">
          <p className="text-gray-600 text-sm mb-3 line-clamp-2">
            {provider.description}
          </p>
          <p className="text-lg font-bold text-primary mb-2">{provider.price}</p>
          <div className="flex flex-wrap gap-1 mb-3">
            {provider.tags.map((tag, index) => (
              <span
                key={index}
                className="bg-blue-50 text-primary text-xs px-2 py-1 rounded"
              >
                {tag}
              </span>
            ))}
          </div>
          <p className="text-xs text-gray-500 mb-4">
            <span className="font-medium">Availability:</span> {provider.availability}
          </p>
          <Link to={`/services/${serviceSlug}/provider/${provider.slug}`}>
            <Button className="w-full">View Profile</Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProviderCard;
