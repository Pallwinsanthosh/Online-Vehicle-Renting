import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from './UserContext';
import EditUserForm from './EditUserForm'; // Import the EditUserForm component
import './UserProfile.css';

const UserProfile = () => {
    const { user, setUser } = useContext(UserContext);
    const [isEditing, setIsEditing] = useState(false);

    const handleLogin = (userData) => {
        setUser(userData);
    };

    const handleEditUser = async (userData) => {
        try {
            const response = await fetch(`http://localhost:8080/user/${user.email}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(userData),
            });
            if (response.ok) {
                const updatedUser = await response.json();
                setUser(updatedUser);
                setIsEditing(false);
            } else {
                // Handle error
                console.error('Failed to update user');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <div className="user-profile-container">
            <div className="sidebar">
                <ul>
                    <Link to="/bookeduser" style={{ color: 'inherit' }}><li>Booked Vehicles</li></Link>
                    <Link to="/vehicle" style={{ color: 'inherit' }}><li>Owned Vehicles</li></Link>
                    <li onClick={() => setIsEditing(true)}>Edit User</li>
                    <Link to="/sign" style={{ color: 'inherit' }}><li>Logout</li></Link>
                </ul>
            </div>
            <div className="user-info">
                {isEditing ? (
                    <EditUserForm 
                        onSave={handleEditUser} 
                        onCancel={() => setIsEditing(false)} 
                    />
                ) : (
                    user ? (
                        <div>
                            <h1>User Information</h1>
                            <h2>Welcome, {user.name}!</h2>
                            <p>Email: {user.email}</p>
                            <button onClick={() => setIsEditing(true)}>Edit User</button>
                        </div>
                    ) : (
                        <button onClick={() => handleLogin({ name: 'John Doe', email: 'john@example.com' })}>
                            Login
                        </button>
                    )
                )}
            </div>
        </div>
    );
};

export default UserProfile;
