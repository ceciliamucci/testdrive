import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './Confirmation.css';

const Confirmation = () => {
    const navigate = useNavigate();
    const { state } = useLocation();
    const { appointment = {} } = state || {};
    const { doctor = { name: '', speciality: '' }, phoneNumber = '', date = '', timeSlot = '' } = appointment;

    const handleOkay = () => {
        navigate('/appointments', { state: { appointment } }); // Pass the appointment data back to Appointments
    };

    return (
        <div className="confirmation-container">
            <h2>Confirmation</h2>
            <p>Appointment booked successfully with Dr. {doctor.name}</p>
            <div className="appointment-details">
                <h3>Appointment Details</h3>
                <div><strong>Doctor:</strong> Dr. {doctor.name}</div>
                <div><strong>Specialty:</strong> {doctor.speciality}</div>
                <div><strong>Phone number:</strong> {phoneNumber}</div>
                <div><strong>Date:</strong> {new Date(date).toLocaleString()}</div>
                <div><strong>Time:</strong> {timeSlot}</div>
            </div>
            <button className="okay-button" onClick={handleOkay}>Okay</button>
        </div>
    );
};

export default Confirmation;