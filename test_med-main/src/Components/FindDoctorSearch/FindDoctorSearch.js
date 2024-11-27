import React, { useState, useRef } from 'react';
import './FindDoctorSearch.css';

const specialties = [
    "Dentist",
    "Gynecologist/obstetrician",
    "General Physician",
    "Dermatologist",
    "Ear-nose-throat (ent) Specialist",
    "Homeopath"
];

function FindDoctorSearch() {
    const [searchTerm, setSearchTerm] = useState('');
    const [isFocused, setIsFocused] = useState(false);
    const searchRef = useRef(null);

    const handleFocus = () => {
        setIsFocused(true);
    };

    const handleBlur = (event) => {
        if (searchRef.current && !searchRef.current.contains(event.target)) {
            setIsFocused(false);
        }
    };

    const handleChange = (event) => {
        setSearchTerm(event.target.value);
    };

    return (
        <div className="find-doctor-search" ref={searchRef} onBlur={handleBlur}>
            <input
                type="text"
                placeholder="Search doctors, clinics, hospitals, etc."
                value={searchTerm}
                onChange={handleChange}
                onFocus={handleFocus}
            />
            {isFocused && (
                <ul className="specialty-list">
                    {specialties.filter(specialty => specialty.toLowerCase().includes(searchTerm.toLowerCase())).map((specialty, index) => (
                        <li key={index}>{specialty}</li>
                    ))}
                </ul>
            )}
        </div>
    );
}

export default FindDoctorSearch;
