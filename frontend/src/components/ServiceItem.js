import React from 'react';

const ServiceItem = ({ service, onBook }) => {
  return (
    <div className="glass p-6 rounded-xl transition-all duration-300 hover:transform hover:-translate-y-2 hover:shadow-xl hover:shadow-purple-500/20">
      <div className="flex justify-between items-start gap-4">
        <h3 className="text-xl font-semibold text-white">{service.name}</h3>
        {service.category && (
          <span className="px-3 py-1 rounded-full text-xs font-medium bg-gradient-to-r from-purple-500/10 to-blue-500/10 text-purple-400 border border-purple-500/20">
            {service.category}
          </span>
        )}
      </div>
      
      <p className="mt-3 text-gray-300">{service.description}</p>
      
      <div className="flex gap-6 mt-4">
        <div className="flex items-center gap-2">
          <span className="text-xl">💰</span>
          <span className="font-semibold text-white">${service.price}</span>
        </div>
        {service.location && (
          <div className="flex items-center gap-2">
            <span className="text-xl">📍</span>
            <span className="text-gray-300">{service.location}</span>
          </div>
        )}
      </div>

      {service.worker && (
        <div className="mt-4 pt-4 border-t border-gray-700">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-r from-purple-500 to-blue-500 flex items-center justify-center text-white text-xl">
              {service.worker.username.charAt(0).toUpperCase()}
            </div>
            <div>
              <p className="font-medium text-white">{service.worker.username}</p>
              <p className="text-sm text-gray-400">{service.worker.expertise}</p>
            </div>
          </div>
        </div>
      )}

      <button 
        onClick={() => onBook && onBook(service._id)}
        className="mt-4 w-full py-3 bg-gradient-to-r from-purple-500 to-blue-500 text-white rounded-lg font-medium transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/50 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-gray-900"
      >
        Book Service
      </button>
    </div>
  );
};

export default ServiceItem;
