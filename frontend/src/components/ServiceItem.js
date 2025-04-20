import React from 'react';

const ServiceItem = ({ service }) => {
  return (
    <div className="service-item">
      <h3>{service.name}</h3>
      <p>{service.description}</p>
      <p>Price: ${service.price}</p>
      <button>Book Service</button>
    </div>
  );
};

export default ServiceItem;
