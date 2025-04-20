import React, { useState, useEffect } from 'react';
import { api } from '../api';
import ServiceList from './ServiceList';

const Dashboard = () => {
  const [services, setServices] = useState([]);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const { data } = await api.get('/services');
        setServices(data.services);
      } catch (error) {
        alert('Failed to load services');
      }
    };

    fetchServices();
  }, []);

  return (
    <div>
      <h2>Dashboard</h2>
      <ServiceList services={services} />
    </div>
  );
};

export default Dashboard;
