import React, { useState, useContext } from 'react';
import { UserContext } from './UserContext';
import './EditUserForm.css'; // Replace with your actual CSS file name

const EditUserForm = ({ onSave, onCancel }) => {
    const { user } = useContext(UserContext);
    const [name, setName] = useState(user?.name || '');
    const [email, setEmail] = useState(user?.email || '');

    const handleSubmit = (e) => {
        e.preventDefault();
        onSave({ name, email });
    };

    return (
        <div className="form-container"> {/* Added the scoped class */}
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Name:</label>
                    <input 
                        type="text" 
                        value={name} 
                        onChange={(e) => setName(e.target.value)} 
                    />
                </div>
                <div>
                    <label>Email:</label>
                    <input 
                        type="email" 
                        value={email} 
                        onChange={(e) => setEmail(e.target.value)} 
                    />
                </div>
                <button type="submit">Save</button>
                <button type="button" onClick={onCancel}>Cancel</button>
            </form>
        </div>
    );
};

export default EditUserForm;
