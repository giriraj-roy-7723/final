
import { Link } from "react-router-dom";
import { Service } from "../data/services";
import * as LucideIcons from "lucide-react";

interface ServiceCardProps {
  service: Service;
}

const ServiceCard = ({ service }: ServiceCardProps) => {
  // Dynamically get the icon from Lucide based on the iconName
  const IconComponent = (LucideIcons as any)[service.iconName.charAt(0).toUpperCase() + service.iconName.slice(1)];

  return (
    <Link to={`/services/${service.slug}`} className="block">
      <div className="service-card bg-white rounded-lg shadow-md overflow-hidden h-full">
        <div className="relative h-48">
          <img 
            src={service.image} 
            alt={service.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-transparent to-black/50"></div>
          <div className="absolute bottom-0 left-0 p-4 text-white">
            <h3 className="font-bold text-xl">{service.name}</h3>
          </div>
        </div>
        <div className="p-5">
          <div className="mb-4 flex items-center">
            <span className="bg-blue-100 p-2 rounded-full mr-3 text-primary">
              {IconComponent && <IconComponent size={20} />}
            </span>
          </div>
          <p className="text-gray-600 mb-4">{service.description}</p>
          <div className="flex items-center text-primary font-medium">
            <span>Learn More</span>
            <svg className="ml-2 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ServiceCard;
