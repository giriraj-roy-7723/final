import React, { useState, useEffect } from 'react';
import { api } from '../api';

const WorkerDashboard = () => {
  const [services, setServices] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [newService, setNewService] = useState({
    name: '',
    description: '',
    price: '',
    category: '',
    location: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [isAddServiceOpen, setIsAddServiceOpen] = useState(false);

  useEffect(() => {
    fetchWorkerServices();
    fetchBookings();
  }, []);

  const fetchWorkerServices = async () => {
    try {
      const { data } = await api.get('/services/worker');
      setServices(data.services || []);
    } catch (error) {
      setError('Failed to load services');
    }
  };

  const fetchBookings = async () => {
    try {
      const { data } = await api.get('/bookings/worker');
      setBookings(data.services || []);
    } catch (error) {
      setError('Failed to load bookings');
    }
  };

  const handleInputChange = (e) => {
    setNewService({
      ...newService,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await api.post('/services', newService);
      setNewService({
        name: '',
        description: '',
        price: '',
        category: '',
        location: ''
      });
      fetchWorkerServices();
      setIsAddServiceOpen(false);
    } catch (error) {
      setError('Failed to add service');
    } finally {
      setLoading(false);
    }
  };

  const handleBookingStatus = async (serviceId, bookingId, status) => {
    try {
      await api.put(`/bookings/${serviceId}/booking/${bookingId}`, { status });
      fetchBookings();
    } catch (error) {
      setError('Failed to update booking status');
    }
  };

  return (
    <div className="min-h-screen pt-24 pb-12 px-4">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold text-white mb-8 font-space">Provider Dashboard</h2>
        
        <div className="space-y-12">
          <section>
            <button
              onClick={() => setIsAddServiceOpen(!isAddServiceOpen)}
              className="w-full bg-[#1f2937]/50 backdrop-blur-xl rounded-xl p-6 border border-gray-700 flex items-center justify-between hover:border-blue-500/40 transition-all duration-300"
            >
              <h3 className="text-2xl font-semibold text-white font-space">Add New Service</h3>
              <svg
                className={`w-6 h-6 text-gray-400 transform transition-transform duration-300 ${isAddServiceOpen ? 'rotate-180' : ''}`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            <div className={`transition-all duration-300 overflow-hidden ${isAddServiceOpen ? 'max-h-[1000px] opacity-100' : 'max-h-0 opacity-0'}`}>
              <div className="bg-[#1f2937]/50 backdrop-blur-xl rounded-b-xl p-6 border-x border-b border-gray-700 mt-1">
                {error && (
                  <div className="p-4 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-sm text-center mb-6">
                    {error}
                  </div>
                )}
                
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-300">Service Name</label>
                    <input
                      type="text"
                      name="name"
                      value={newService.name}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 rounded-lg bg-gray-800/50 border border-gray-700 text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                      placeholder="Enter service name"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-300">Description</label>
                    <textarea
                      name="description"
                      value={newService.description}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 rounded-lg bg-gray-800/50 border border-gray-700 text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                      placeholder="Describe your service"
                      rows="4"
                    />
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="space-y-2">
                      <label className="block text-sm font-medium text-gray-300">Price</label>
                      <input
                        type="number"
                        name="price"
                        value={newService.price}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 rounded-lg bg-gray-800/50 border border-gray-700 text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                        placeholder="Enter price"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <label className="block text-sm font-medium text-gray-300">Category</label>
                      <input
                        type="text"
                        name="category"
                        value={newService.category}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 rounded-lg bg-gray-800/50 border border-gray-700 text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                        placeholder="Service category"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <label className="block text-sm font-medium text-gray-300">Location</label>
                      <input
                        type="text"
                        name="location"
                        value={newService.location}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 rounded-lg bg-gray-800/50 border border-gray-700 text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                        placeholder="Service location"
                      />
                    </div>
                  </div>
                  
                  <button
                    type="submit"
                    disabled={loading}
                    className={`w-full py-3 px-4 rounded-lg font-medium transition-all duration-300 ${
                      loading
                        ? 'bg-gray-600 cursor-not-allowed'
                        : 'bg-gradient-to-r from-blue-500 to-cyan-500 hover:shadow-lg hover:shadow-blue-500/25'
                    }`}
                  >
                    {loading ? 'Adding Service...' : 'Add Service'}
                  </button>
                </form>
              </div>
            </div>
          </section>

          <section>
            <h3 className="text-2xl font-semibold text-white mb-6">Booking Requests</h3>
            <div className="space-y-6">
              {bookings.map(service => (
                <div key={service._id} className="bg-[#1f2937]/50 backdrop-blur-xl rounded-xl p-6 border border-gray-700">
                  <h4 className="text-xl font-semibold text-white mb-4">{service.name}</h4>
                  {service.bookings && service.bookings.map(booking => (
                    <div key={booking._id} className="bg-gray-800/50 rounded-lg p-4 mb-4">
                      {booking.user && (
                        <div className="space-y-2 mb-4">
                          <p className="text-gray-300">Client: <span className="text-white">{booking.user.username}</span></p>
                          <p className="text-gray-300">Email: <span className="text-white">{booking.user.email}</span></p>
                        </div>
                      )}
                      <p className="text-gray-300">Date: <span className="text-white">{new Date(booking.requestDate).toLocaleDateString()}</span></p>
                      <div className="flex items-center gap-3 mt-2">
                        <span className="text-gray-300">Status:</span>
                        <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                          booking.status === 'pending' ? 'bg-yellow-500/10 text-yellow-400 border border-yellow-500/20' :
                          booking.status === 'accepted' ? 'bg-green-500/10 text-green-400 border border-green-500/20' :
                          'bg-red-500/10 text-red-400 border border-red-500/20'
                        }`}>
                          {booking.status}
                        </span>
                      </div>
                      {booking.status === 'pending' && (
                        <div className="flex gap-4 mt-4">
                          <button
                            onClick={() => handleBookingStatus(service._id, booking._id, 'accepted')}
                            className="flex-1 py-2 px-4 rounded-lg font-medium bg-gradient-to-r from-green-500 to-emerald-500 text-white hover:shadow-lg hover:shadow-green-500/25 transition-all duration-300"
                          >
                            Accept
                          </button>
                          <button
                            onClick={() => handleBookingStatus(service._id, booking._id, 'rejected')}
                            className="flex-1 py-2 px-4 rounded-lg font-medium bg-gradient-to-r from-red-500 to-pink-500 text-white hover:shadow-lg hover:shadow-red-500/25 transition-all duration-300"
                          >
                            Reject
                          </button>
                        </div>
                      )}
                    </div>
                  ))}
                  {(!service.bookings || service.bookings.length === 0) && (
                    <p className="text-gray-400 text-center py-4">No booking requests for this service</p>
                  )}
                </div>
              ))}
              {bookings.length === 0 && (
                <p className="text-gray-400 text-center py-8">No services with booking requests</p>
              )}
            </div>
          </section>

          <section>
            <h3 className="text-2xl font-semibold text-white mb-6">Your Services</h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {services.map(service => (
                <div key={service._id} className="bg-[#1f2937]/50 backdrop-blur-xl rounded-xl p-6 border border-gray-700">
                  <h4 className="text-xl font-semibold text-white mb-3">{service.name}</h4>
                  <p className="text-gray-300 mb-4">{service.description}</p>
                  <div className="space-y-2">
                    <p className="text-gray-300">Price: <span className="text-white">₹{service.price}</span></p>
                    <p className="text-gray-300">Category: <span className="text-white">{service.category}</span></p>
                    <p className="text-gray-300">Location: <span className="text-white">{service.location}</span></p>
                    <p className="text-gray-300">
                      Status:{' '}
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                        service.availability
                          ? 'bg-green-500/10 text-green-400 border border-green-500/20'
                          : 'bg-gray-500/10 text-gray-400 border border-gray-500/20'
                      }`}>
                        {service.availability ? 'Available' : 'Unavailable'}
                      </span>
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default WorkerDashboard;