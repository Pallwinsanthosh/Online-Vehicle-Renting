import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Booking.css';

const Booking = () => {
  const location = useLocation();
  const vehicle = location.state?.vehicle;
  const [fullname, setFullname] = useState('');
  const [email, setEmail] = useState('');
  const [licensenumber, setLicensenumber] = useState('');
  const [licenseexpirationdate, setLicenseexpirationdate] = useState('');
  const [pickupdate, setPickupdate] = useState('');
  const [dropdate, setDropdate] = useState('');
  const [totalAmount, setTotalAmount] = useState(0);

  useEffect(() => {
    if (pickupdate && dropdate && vehicle) {
      const pickup = new Date(pickupdate);
      const drop = new Date(dropdate);
      const diffTime = Math.abs(drop - pickup);
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      const amount = diffDays * vehicle.price; // Assuming vehicle.price is the price per day
      setTotalAmount(amount);
    }
  }, [pickupdate, dropdate, vehicle]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const bookingDetails = {
      fullname,
      email,
      licensenumber,
      licenseexpirationdate,
      pickupdate,
      dropdate,
      totalAmount,
      vehicleId: vehicle.id, // Assuming vehicle has an id property
    };

    try {
      const response = await fetch('http://localhost:8080/usersdetails', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(bookingDetails),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      console.log('Booking successful:', data);
      
      // Optionally, reset the form fields after a successful submission
      setFullname('');
      setEmail('');
      setLicensenumber('');
      setLicenseexpirationdate('');
      setPickupdate('');
      setDropdate('');
    } catch (error) {
      console.error('There was a problem with the booking request:', error);
    }
  };

  return (
    <div className="booking-container">
      <h2>Rental Booking</h2>
      {vehicle && (
        <div>
          <h3>Name: {vehicle.name}</h3>
          <h3>Address: {vehicle.address}</h3>
          <h3>Price per Day: {vehicle.price}</h3>
          <br></br>
        </div>
      )}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="fullname">Full Name</label>
          <input
            type="text"
            id="fullname"
            placeholder="Enter your full name"
            value={fullname}
            onChange={(e) => setFullname(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="licensenumber">Driver's License Number</label>
          <input
            type="text"
            id="licensenumber"
            placeholder="Enter your license number"
            value={licensenumber}
            onChange={(e) => setLicensenumber(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="licenseexpirationdate">License Expiration Date</label>
          <input
            type="date"
            id="licenseexpirationdate"
            value={licenseexpirationdate}
            onChange={(e) => setLicenseexpirationdate(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="pickupdate">Pickup Date</label>
          <input
            type="date"
            id="pickupdate"
            value={pickupdate}
            onChange={(e) => setPickupdate(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="dropdate">Drop-off Date</label>
          <input
            type="date"
            id="dropdate"
            value={dropdate}
            onChange={(e) => setDropdate(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label>Total Amount: {totalAmount}</label>
        </div>
        <Link to="/">
        <button type="submit" className="submit-btn">Book Now</button>
        </Link>
      </form>
    </div>
  );
};

export default Booking;
