import React, { useState, useCallback } from 'react';
import './InstantConsultation.css';
import { useNavigate } from 'react-router-dom';
import FindDoctorSearchIC from '../FindDoctorSearchIC/FindDoctorSearchIC';
import DoctorCard from '../DoctorCard/DoctorCard';
import Notification from '../Notification/Notification';
import { generateDoctors } from '../../utils/generateDoctors';

// Existing static data for doctors
const existingDoctorData = [
    {
        id: 1,
        name: "Dr. Jiao Yang",
        speciality: "Dentist",
        experience: 9,
        ratings: "⭐⭐⭐⭐⭐",
        image: "src/doc-img1.png",
        availability: ["Monday", "Wednesday", "Friday"]
    },
    {
        id: 2,
        name: "Dr. Denis Raj",
        speciality: "Dentist",
        experience: 24,
        ratings: "⭐⭐⭐⭐⭐",
        image: "src/doc-img2.png",
        availability: ["Tuesday", "Thursday", "Saturday"]
    },
    {
        id: 3,
        name: "Dr. Lyn Christie",
        speciality: "Dentist",
        experience: 11,
        ratings: "⭐⭐⭐⭐⭐",
        image: "src/doc-img3.png",
        availability: ["Monday", "Tuesday", "Friday"]
    },
];

// Generate additional random doctors
const randomDoctors = generateDoctors(5);

const InstantConsultation = ({ setAppointments }) => {
    const [doctors, setDoctors] = useState([...existingDoctorData, ...randomDoctors]);
    const [showModal, setShowModal] = useState(false);
    const [selectedDoctor, setSelectedDoctor] = useState(null);
    const [name, setName] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [showNotification, setShowNotification] = useState(false);
    const [currentAppointment, setCurrentAppointment] = useState(null);
    const navigate = useNavigate();
    const isLoggedIn = !!sessionStorage.getItem("auth-token"); // Check if user is logged in

    // Search functionality
    const handleSearch = useCallback((searchTerm) => {
        setDoctors([...existingDoctorData, ...randomDoctors].filter(doctor =>
            doctor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            doctor.speciality.toLowerCase().includes(searchTerm.toLowerCase())
        ));
    }, []);

    const handleAppointment = () => {
        if (!isLoggedIn) {
            alert('You must be logged in to book an appointment.');
            return;
        }

        if (!name.trim() || !phoneNumber.trim() || !selectedDoctor) {
            alert('Please fill in all fields');
            return;
        }

        const appointmentData = {
            id: Date.now(),
            doctor: selectedDoctor,
            phoneNumber,
            date: new Date().toISOString(),
            timeSlot: selectedDoctor.availability[0], // Assuming you want to set the first available time slot
        };

        setAppointments(prevAppointments => [...prevAppointments, appointmentData]);
        navigate('/appointments', { state: { appointment: appointmentData } });
    };

    const openModal = (doctor) => {
        setSelectedDoctor(doctor);
        setShowModal(true);
    };

    const closeModal = () => {
        setShowModal(false);
        setSelectedDoctor(null);
        setName('');
        setPhoneNumber('');
    };

    return (
        <center>
            {!isLoggedIn && (
                <div className="login-prompt">
                    <h3>Please log in to see the contents of this page.</h3>
                    <button onClick={() => navigate('/login')}>Log In</button>
                </div>
            )}
            {showNotification && currentAppointment && (
                <Notification appointment={currentAppointment} isCancelled={false} />
            )}
            {showModal && (
                <div className="modal-overlay">
                    <div className="modal-container">
                        <div className="modal-header">
                            <h2>Book Appointment with {selectedDoctor?.name}</h2>
                            <button className="close-button" onClick={closeModal}>&times;</button>
                        </div>
                        <div className="modal-content">
                            <div className="form-group">
                                <label>Name:</label>
                                <input
                                    type="text"
                                    className="input-field"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    placeholder="Enter your name"
                                />
                            </div>
                            <div className="form-group">
                                <label>Phone Number:</label>
                                <input
                                    type="tel"
                                    className="input-field"
                                    value={phoneNumber}
                                    onChange={(e) => setPhoneNumber(e.target.value)}
                                    placeholder="Enter your phone number"
                                />
                            </div>
                            {selectedDoctor && (
                                <div className="doctor-availability">
                                    <p>Available on: {selectedDoctor.availability.join(', ')}</p>
                                </div>
                            )}
                            <button className="book-button" onClick={handleAppointment}>Book Now</button>
                        </div>
                    </div>
                </div>
            )}
            <div className="searchpage-container">
                <FindDoctorSearchIC onSearch={handleSearch} />
                <div className="search-results-container">
                    <h2>{doctors.length} doctors are available</h2>
                    <h3>Book appointments with minimum wait-time & verified doctor details</h3>
                    {doctors.map(doctor => (
                        <DoctorCard
                            key={doctor.id}
                            {...doctor}
                            onAppointment={() => openModal(doctor)}
                        />
                    ))}
                </div>
            </div>
            <button onClick={() => navigate('/give-reviews', { state: { doctors } })}>
                Give Reviews
            </button>
        </center>
    );
}

export default InstantConsultation;