import React from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import './Appointments.css';

const Appointments = ({ appointments, setAppointments }) => {
    const navigate = useNavigate();
    const location = useLocation();
    const isLoggedIn = !!sessionStorage.getItem("auth-token");

    // Get appointment data from location state if available
    const { state } = location;
    const newAppointment = state?.appointment; // Get the appointment data

    return (
        <div className="appointments-container">
            {/* Display new appointment if available */}
            {newAppointment && newAppointment.doctor && (
                <div className="appointment-card">
                    <h2>New Appointment Booked!</h2>
                    <p>Doctor: {newAppointment.doctor.name}</p>
                    <p>Speciality: {newAppointment.doctor.speciality}</p>
                    <p>Experience: {newAppointment.doctor.experience} years</p>
                    <p>Ratings: {newAppointment.doctor.ratings}</p>
                    <p>Phone Number: {newAppointment.phoneNumber}</p>
                    <p>Date: {new Date(newAppointment.date).toLocaleDateString()}</p>
                    <p>Time: {newAppointment.timeSlot}</p>
                    <button className="btn1" onClick={() => handleCancelAppointment(newAppointment.id)}>Cancel Appointment</button>
                </div>
            )}

            {/* Display message if logged in and no appointments */}
            {isLoggedIn && appointments.length === 0 && (
                <div>
                    <h2>You don't have any appointments booked yet.</h2>
                    <Link to="/instant-consultation">
                        <button className="btn1" style={{ backgroundColor: 'blue', color: 'white' }}>Book one</button>
                    </Link>
                </div>
            )}

            {/* Display appointments if logged in and there are appointments */}
            {isLoggedIn && appointments.length > 0 && (
                <div>
                    {appointments.map(appointment => (
                        <div key={appointment.id} className="appointment-card">
                            <h3>{appointment.doctor.name}</h3>
                            <p>Speciality: {appointment.doctor.speciality}</p>
                            <p>Experience: {appointment.doctor.experience} years</p>
                            <p>Ratings: {appointment.doctor.ratings}</p>
                            <h4>Appointment Booked!</h4>
                            <p>Name: {appointment.name}</p>
                            <p>Phone Number: {appointment.phoneNumber}</p>
                            <button className="btn1" onClick={() => handleCancelAppointment(appointment.id)}>Cancel Appointment</button>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );

    function handleCancelAppointment(appointmentId) {
        // Logic to cancel the appointment
        setAppointments(prevAppointments => prevAppointments.filter(appointment => appointment.id !== appointmentId));
    }
};

export default Appointments;
