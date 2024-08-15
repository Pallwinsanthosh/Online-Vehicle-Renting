import React, { useContext, useEffect, useState } from 'react';
import { UserContext } from './UserContext';
import './UserVehicles.css'; // Add this file for custom styles if needed

const UserVehicles = () => {
    const { user } = useContext(UserContext);
    const [vehicles, setVehicles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (user && user.email) {
            fetchVehiclesByEmail(user.email);
        } else {
            setLoading(false);
            setError("User not logged in.");
        }
    }, [user]);

    const fetchVehiclesByEmail = async (email) => {
        try {
            const response = await fetch(`http://localhost:8080/bike/email/${user.email}`);
            if (!response.ok) {
                throw new Error("Failed to fetch vehicles.");
            }
            const data = await response.json();
            setVehicles(data);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const removeVehicle = async (vehicleId) => {
        try {
            const response = await fetch(`http://localhost:8080/aa/${user.email}`, {
                method: 'DELETE',
            });
            if (!response.ok) {
                throw new Error("Failed to remove vehicle.");
            }
            // Remove the vehicle from the UI by filtering it out
            setVehicles(vehicles.filter(vehicle => vehicle.id !== vehicleId));
        } catch (err) {
            setError(err.message);
        }
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div className="user-vehicles-container">
            <h1>{user.name}'s Vehicles</h1>
            {vehicles.length > 0 ? (
                <ul className="vehicle-list">
                    {vehicles.map((vehicle) => (
                        <li key={vehicle.id} className="vehicle-item">
                            <div className="vehicle-image">
                                <img src={vehicle.url} alt={`${vehicle.make} ${vehicle.model}`} />
                            </div>
                            <div className="vehicle-details">
                                <h2>{vehicle.make} {vehicle.model}</h2>
                                <p>Name: {vehicle.name}</p>
                                <p>Description: {vehicle.description}</p>
                                <p>Contact: {vehicle.number}</p>
                                <p>Plate Number: {vehicle.plate}</p>
                                <p>Price: {vehicle.price}</p>
                                <p>mileage: {vehicle.mileage}</p>
                                <button 
                                    className="remove-vehicle-button" 
                                    onClick={() => removeVehicle(vehicle.id)}
                                >
                                    Remove Vehicle
                                </button>
                            </div>
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No vehicles found for this user.</p>
            )}
        </div>
    );
};

export default UserVehicles;
