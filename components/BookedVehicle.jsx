import React, { useContext, useEffect, useState } from 'react';
import { UserContext } from './UserContext';
import './BookedVehicle.css'; // Add this file for custom styles if needed

const BookedVehicle = () => {
  const { user } = useContext(UserContext);
  const [bookingDetails, setBookingDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (user && user.email) {
      fetchBookingDetails(user.email);
    } else {
      setLoading(false);
      setError("User not logged in.");
    }
  }, [user]);

  const fetchBookingDetails = async (email) => {
    try {
      const response = await fetch(`http://localhost:8080/userdetails/${user.email}`);
      if (!response.ok) {
        throw new Error("Failed to fetch booking details.");
      }
      const data = await response.json();
      setBookingDetails(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="booked-vehicle-container">
      <h1>Booking Details</h1>
      {bookingDetails ? (
        <div className="booking-details">
          <p><strong>Full Name:</strong> {bookingDetails.fullname}</p>
          <p><strong>Email:</strong> {bookingDetails.email}</p>
          <p><strong>Driver's License Number:</strong> {bookingDetails.licensenumber}</p>
          <p><strong>License Expiration Date:</strong> {bookingDetails.licenseexpirationdate}</p>
          <p><strong>Pickup Date:</strong> {bookingDetails.pickupdate}</p>
          <p><strong>Drop-off Date:</strong> {bookingDetails.dropdate}</p>
        </div>
      ) : (
        <p>No booking details found.</p>
      )}
    </div>
  );
};

export default BookedVehicle;
