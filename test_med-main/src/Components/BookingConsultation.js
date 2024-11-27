import React, { useState } from 'react';
import DoctorCard from './DoctorCard/DoctorCard';
import FindDoctorSearch from './FindDoctorSearch/FindDoctorSearch';
import './BookingConsultation.css';

const doctorData = [
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

const BookingConsultation = () => {
    const [doctors, setDoctors] = useState(doctorData);

    const handleSearch = (searchTerm) => {
        if (!searchTerm.trim()) {
            setDoctors(doctorData);
            return;
        }

        const filteredDoctors = doctorData.filter(doctor => 
            doctor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            doctor.speciality.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setDoctors(filteredDoctors);
    };

    return (
        <div className="booking-consultation-container">
            <FindDoctorSearch onSearch={handleSearch} />
            <div className="doctor-cards-container">
                {doctors.map(doctor => (
                    <DoctorCard 
                        key={doctor.id}
                        {...doctor}
                    />
                ))}
            </div>
        </div>
    );
}

export default BookingConsultation;