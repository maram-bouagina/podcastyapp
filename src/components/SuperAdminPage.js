import React, { useState } from 'react';
import axios from 'axios';
import { useAuth } from './Auth';
import './SuperAdminPage.css';
import Header from './Header';
const SuperAdminPage = () => {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        country: '',
        organization: '',
        password: '',
        confirmPassword: '',
        role: 'admin'
    });
    const [error, setError] = useState('');
    const auth = useAuth();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (formData.password !== formData.confirmPassword) {
            setError('Passwords do not match');
            return;
        }

        try {
            const response = await axios.post('http://localhost:8000/user/create-admin/', formData, {
                headers: {
                    Authorization: `Bearer ${auth.token}`                }
            });

            if (response.status === 200) {
                alert('Admin created successfully!');
                setFormData({
                    username: '',
                    email: '',
                    country: '',
                    organization: '',
                    password: '',
                    confirmPassword: '',
                    role: 'admin'
                });
            }
        } catch (err) {
            setError(err.response?.data?.detail || 'Failed to create admin.');
        }
    };

    return (
<div className='SuperDivSuperAdmin'> 
    <Header className="headerOtherC"/>
    <div className='superAdmin-container'>
        <h1 className="create-admin-title">Create Admin</h1>
        <form className="admin-form" onSubmit={handleSubmit}>
            <input 
                className="form-input" 
                type="text" 
                name="username" 
                placeholder="Username" 
                value={formData.username} 
                onChange={handleChange} 
                required 
            />
            <input 
                className="form-input" 
                type="email" 
                name="email" 
                placeholder="Email" 
                value={formData.email} 
                onChange={handleChange} 
                required 
            />
            <input 
                className="form-input" 
                type="text" 
                name="country" 
                placeholder="Country" 
                value={formData.country} 
                onChange={handleChange} 
                required 
            />
            <input 
                className="form-input" 
                type="text" 
                name="organization" 
                placeholder="Organization" 
                value={formData.organization} 
                onChange={handleChange} 
            />
            <input 
                className="form-input" 
                type="password" 
                name="password" 
                placeholder="Password" 
                value={formData.password} 
                onChange={handleChange} 
                required 
            />
            <input 
                className="form-input" 
                type="password" 
                name="confirmPassword" 
                placeholder="Confirm Password" 
                value={formData.confirmPassword} 
                onChange={handleChange} 
                required 
            />
            {error && <p className="error-message">{error}</p>}
            <button className="submit-button" type="submit">Create Admin</button>
        </form>
    </div>
</div>
    );
};

export default SuperAdminPage;