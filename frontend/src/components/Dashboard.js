import React, { useState, useEffect } from 'react';
import { api } from '../api';

const Dashboard = () => {
  const [services, setServices] = useState([]);
  const [userBookings, setUserBookings] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [cancelLoading, setCancelLoading] = useState(false);

  useEffect(() => {
    fetchServices();
    fetchUserBookings();
  }, []);

  const fetchServices = async () => {
    try {
      const { data } = await api.get('/services');
      setServices(data.services || []);
    } catch (error) {
      setError('Failed to load services');
    }
  };

  const fetchUserBookings = async () => {
    try {
      const { data } = await api.get('/bookings/user');
      setUserBookings(data.services || []);
    } catch (error) {
      console.error('Error fetching bookings:', error);
    }
  };

  const handleBooking = async (serviceId) => {
    setLoading(true);
    setError('');
    
    try {
      const bookingDate = new Date();
      await api.post(`/bookings/${serviceId}`, {
        bookingDate,
        notes: 'Interested in this service'
      });
      
      alert('Booking request sent successfully!');
      await fetchUserBookings();
    } catch (error) {
      console.error('Booking error:', error);
      setError(error.response?.data?.message || 'Failed to book service. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = async (serviceId, bookingId) => {
    if (!window.confirm('Are you sure you want to cancel this booking request?')) {
      return;
    }

    setCancelLoading(true);
    setError('');
    
    try {
      await api.delete(`/bookings/${serviceId}/booking/${bookingId}`);
      await fetchUserBookings(); // Refresh the bookings list
      setError(''); // Clear any existing errors
    } catch (error) {
      console.error('Cancel error:', error);
      setError(error.response?.data?.message || 'Failed to cancel booking. Please try again.');
    } finally {
      setCancelLoading(false);
    }
  };

  const handleCall = (phoneNumber) => {
    window.location.href = `tel:${phoneNumber}`;
  };

  return (
    <div className="min-h-screen pt-24 pb-12 px-4">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold text-white mb-8 font-space">Your Dashboard</h2>
        
        {error && (
          <div className="p-4 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-sm text-center mb-6">
            {error}
          </div>
        )}
        
        <div className="space-y-8">
          <section>
            <h3 className="text-2xl font-semibold text-white mb-6">Your Bookings</h3>
            <div className="grid gap-6">
              {userBookings.map(service => (
                <div key={service._id} className="bg-[#1f2937]/50 backdrop-blur-xl rounded-xl p-6 border border-gray-700">
                  <h4 className="text-xl font-semibold text-white mb-4">{service.name}</h4>
                  {service.worker && service.bookings && service.bookings.some(booking => booking.status === 'accepted') ? (
                    <div className="space-y-2 mb-4">
                      <p className="text-gray-300">Provider: <span className="text-white">{service.worker.username}</span></p>
                      <div className="flex items-center gap-4">
                        <p className="text-gray-300">Contact: <span className="text-white">{service.worker.phoneNumber}</span></p>
                        <button
                          onClick={() => handleCall(service.worker.phoneNumber)}
                          className="px-4 py-2 text-sm font-medium text-white rounded-lg bg-gradient-to-r from-green-500 to-emerald-500 hover:shadow-lg hover:shadow-green-500/25 transition-all duration-300"
                        >
                          Call Now
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-2 mb-4">
                      <p className="text-gray-300">Provider: <span className="text-white">{service.worker.username}</span></p>
                      <p className="text-gray-300">Contact: <span className="text-gray-400">Available after booking confirmation</span></p>
                    </div>
                  )}
                  <div className="space-y-2">
                    <p className="text-gray-300">Price: <span className="text-white">₹{service.price}</span></p>
                    <p className="text-gray-300">Location: <span className="text-white">{service.location}</span></p>
                  </div>
                  {service.bookings && service.bookings.map(booking => (
                    <div key={booking._id} className="mt-4 pt-4 border-t border-gray-700">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
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
                          <button
                            onClick={() => handleCancel(service._id, booking._id)}
                            disabled={cancelLoading}
                            className={`px-4 py-2 text-sm font-medium text-white rounded-lg bg-gradient-to-r from-red-500 to-pink-500 hover:shadow-lg hover:shadow-red-500/25 transition-all duration-300 ${
                              cancelLoading ? 'opacity-50 cursor-not-allowed' : ''
                            }`}
                          >
                            {cancelLoading ? 'Cancelling...' : 'Cancel Request'}
                          </button>
                        )}
                      </div>
                      <p className="text-gray-300 mt-2">
                        Requested: <span className="text-white">{new Date(booking.requestDate).toLocaleDateString()}</span>
                      </p>
                    </div>
                  ))}
                </div>
              ))}
              {userBookings.length === 0 && (
                <p className="text-gray-400 text-center py-8">No bookings yet</p>
              )}
            </div>
          </section>

          <section>
            <h3 className="text-2xl font-semibold text-white mb-6">Available Services</h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {services.map(service => (
                <div key={service._id} className="bg-[#1f2937]/50 backdrop-blur-xl rounded-xl p-6 border border-gray-700">
                  <h4 className="text-xl font-semibold text-white mb-3">{service.name}</h4>
                  <p className="text-gray-300 mb-4">{service.description}</p>
                  {service.worker && (
                    <div className="space-y-2 mb-4">
                      <p className="text-gray-300">Provider: <span className="text-white">{service.worker.username}</span></p>
                      <p className="text-gray-300">Expertise: <span className="text-white">{service.worker.expertise}</span></p>
                    </div>
                  )}
                  <div className="space-y-2 mb-4">
                    <p className="text-gray-300">Price: <span className="text-white">₹{service.price}</span></p>
                    <p className="text-gray-300">Location: <span className="text-white">{service.location}</span></p>
                  </div>
                  {service.availability && (
                    <button
                      onClick={() => handleBooking(service._id)}
                      disabled={loading}
                      className={`w-full py-3 px-4 rounded-lg font-medium transition-all duration-300 ${
                        loading
                          ? 'bg-gray-600 cursor-not-allowed'
                          : 'bg-gradient-to-r from-purple-500 to-pink-500 hover:shadow-lg hover:shadow-purple-500/25'
                      }`}
                    >
                      {loading ? 'Booking...' : 'Book Now'}
                    </button>
                  )}
                </div>
              ))}
              {services.length === 0 && (
                <p className="text-gray-400 text-center py-8">No services available</p>
              )}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
