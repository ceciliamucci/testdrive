import React, { useState } from 'react';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import './DoctorCardIC.css';
import AppointmentFormIC from '../AppointmentFormIC/AppointmentFormIC';
import { v4 as uuidv4 } from 'uuid';

const DoctorCardIC = ({ name, speciality, experience, ratings, onAppointment }) => {
    const [showModal, setShowModal] = useState(false);
    const [appointments, setAppointments] = useState([]);

    const handleBooking = (appointmentData) => {
        const newAppointment = { id: uuidv4(), ...appointmentData };
        setAppointments([...appointments, newAppointment]);
        onAppointment(newAppointment);
        setShowModal(false);
    };

    const handleCancel = (appointmentId) => {
        setAppointments(appointments.filter(appointment => appointment.id !== appointmentId));
    };

    return (
        <div className="doctor-card-container">
            <div className="doctor-card-details-container">
                <div className="doctor-card-profile-image-container">
                    <svg xmlns="http://www.w3.org/2000/svg" width="46" height="46" fill="currentColor" className="bi bi-person-fill" viewBox="0 0 16 16">
                        <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"/>
                    </svg>
                </div>
                <div className="doctor-card-details">
                    <div className="doctor-card-detail-name">{name}</div>
                    <div className="doctor-card-detail-speciality">{speciality}</div>
                    <div className="doctor-card-detail-experience">{experience} years experience</div>
                    <div className="doctor-card-detail-consultationfees">Ratings: {ratings}</div>
                </div>
            </div>

            <div className="doctor-card-options-container">
                <Popup
                    trigger={<button className="book-appointment-btn">Book Appointment</button>}
                    modal
                    open={showModal}
                    onClose={() => setShowModal(false)}
                >
                    {(close) => (
                        <div className="doctorbg">
                            <h3>Book Appointment with {name}</h3>
                            <AppointmentFormIC onSubmit={handleBooking} />
                            {appointments.length > 0 && (
                                <div>
                                    <h3>Appointment Booked!</h3>
                                    {appointments.map(appointment => (
                                        <div key={appointment.id}>
                                            <p>Name: {appointment.name}</p>
                                            <p>Phone Number: {appointment.phoneNumber}</p>
                                            <button onClick={() => handleCancel(appointment.id)}>Cancel Appointment</button>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    )}
                </Popup>
            </div>
        </div>
    );
};

export default DoctorCardIC;
