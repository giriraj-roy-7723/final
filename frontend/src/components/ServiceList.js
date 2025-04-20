import React from 'react';
import ServiceItem from './ServiceItem';

const ServiceList = ({ services }) => {
  return (
    <div>
      {services.length > 0 ? (
        services.map((service) => <ServiceItem key={service._id} service={service} />)
      ) : (
        <p>No services available</p>
      )}
    </div>
  );
};

export default ServiceList;
