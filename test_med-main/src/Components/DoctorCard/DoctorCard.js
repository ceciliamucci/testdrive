import React, { useState } from 'react';
import './DoctorCard.css';
import { useNavigate } from 'react-router-dom';

const DoctorCard = ({ name, speciality, experience, ratings, image, availability, id }) => {
    const [showAppointmentForm, setShowAppointmentForm] = useState(false);
    const [appointmentData, setAppointmentData] = useState({
        name: '',
        phoneNumber: '',
        date: '',
        timeSlot: ''
    });
    const [bookedAppointments, setBookedAppointments] = useState([]);
    const navigate = useNavigate();

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setAppointmentData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleBookAppointment = (e) => {
        e.preventDefault();
        if (!appointmentData.name || !appointmentData.phoneNumber || !appointmentData.date || !appointmentData.timeSlot) {
            alert('Please fill in all fields');
            return;
        }

        const newAppointment = {
            id: Date.now(),
            ...appointmentData,
            doctorName: name,
            doctorId: id
        };

        setBookedAppointments(prev => [...prev, newAppointment]);
        setShowAppointmentForm(false);
        navigate('/confirmation', {
            state: {
                appointment: newAppointment,
                message: `Appointment booked successfully with ${name}`
            }
        });
    };

    const handleCancelAppointment = (appointmentId) => {
        setBookedAppointments(prev =>
            prev.filter(appointment => appointment.id !== appointmentId)
        );
    };

    return (
        <div className="doctor-card-container">
            <div className="doctor-card-details-container">
                <div className="doctor-card-profile-image-container">
                    {image ? (
                        <img src={image} alt={name} className="doctor-image" />
                    ) : (
                        <svg xmlns="http://www.w3.org/2000/svg" width="120" height="120" fill="currentColor" className="bi bi-person-circle" viewBox="0 0 16 16">
                            <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z"/>
                            <path fillRule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z"/>
                        </svg>
                    )}
                </div>
                <div className="doctor-card-details">
                    <div className="doctor-card-detail-name">{name}</div>
                    <div className="doctor-card-detail-speciality">{speciality}</div>
                    <div className="doctor-card-detail-experience">{experience} years experience</div>
                    <div className="doctor-card-detail-consultationfees">Ratings: {ratings}</div>
                </div>
            </div>

            {!showAppointmentForm ? (
                <div className="doctor-card-options-container">
                    <button
                        className="book-appointment-btn"
                        onClick={() => setShowAppointmentForm(true)}
                    >
                        Book Appointment
                    </button>
                </div>
            ) : (
                <div className="appointment-form-container">
                    <form onSubmit={handleBookAppointment}>
                        <div className="form-group">
                            <label>Name:</label>
                            <input
                                type="text"
                                name="name"
                                value={appointmentData.name}
                                onChange={handleInputChange}
                                placeholder="Enter your name"
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label>Phone Number:</label>
                            <input
                                type="tel"
                                name="phoneNumber"
                                value={appointmentData.phoneNumber}
                                onChange={handleInputChange}
                                placeholder="Enter your phone number"
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label>Date of Appointment:</label>
                            <input
                                type="date"
                                name="date"
                                value={appointmentData.date}
                                onChange={handleInputChange}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label>Book Time Slot:</label>
                            <select
                                name="timeSlot"
                                value={appointmentData.timeSlot}
                                onChange={handleInputChange}
                                required
                            >
                                <option value="">Select a time slot</option>
                                <option value="9:00 AM">9:00 AM</option>
                                <option value="10:00 AM">10:00 AM</option>
                                <option value="11:00 AM">11:00 AM</option>
                                <option value="2:00 PM">2:00 PM</option>
                                <option value="3:00 PM">3:00 PM</option>
                            </select>
                        </div>
                        <div className="form-buttons">
                            <button type="submit" className="book-now-btn">Book Now</button>
                            <button
                                type="button"
                                className="cancel-btn"
                                onClick={() => setShowAppointmentForm(false)}
                            >
                                Cancel
                            </button>
                        </div>
                    </form>
                </div>
            )}

            {bookedAppointments.length > 0 && (
                <div className="booked-appointments">
                    <h3>Your Appointments</h3>
                    {bookedAppointments.map(appointment => (
                        <div key={appointment.id} className="appointment-item">
                            <p>Date: {appointment.date}</p>
                            <p>Time: {appointment.timeSlot}</p>
                            <button
                                onClick={() => handleCancelAppointment(appointment.id)}
                                className="cancel-appointment-btn"
                            >
                                Cancel Appointment
                            </button>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default DoctorCard;