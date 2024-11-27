import React, { useState } from 'react';
import './AppointmentForm.css';

const AppointmentForm = ({ doctorName, onSubmit }) => {
    const [isFormVisible, setIsFormVisible] = useState(false);
    const [name, setName] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [date, setDate] = useState('');
    const [timeSlot, setTimeSlot] = useState('');
    const [error, setError] = useState('');

    const handleFormSubmit = (e) => {
        e.preventDefault();
        if (!name || !phoneNumber || !date || !timeSlot) {
            setError('All fields are required.');
            return;
        }
        onSubmit({ name, phoneNumber, date, timeSlot });
        setName('');
        setPhoneNumber('');
        setDate('');
        setTimeSlot('');
        setError('');
    };

    return (
        <div className="appointment-form-container">
            <div className="doctor-header">
                <h2>{doctorName}</h2>
                <p className="specialty">Dentist</p>
                <button className="book-appointment-btn" onClick={showForm}>Book Appointment</button>
                <p className="experience">24 years experience</p>
                <div className="ratings">
                    {'★★★★☆'}
                </div>
            </div>
            <form onSubmit={handleFormSubmit} className="appointment-form">
                {error && <p className="error-message">{error}</p>}
                <div className="form-group">
                    <label htmlFor="name">Name:</label>
                    <input
                        type="text"
                        id="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Enter your name"
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="phoneNumber">Phone Number:</label>
                    <input
                        type="tel"
                        id="phoneNumber"
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value)}
                        placeholder="Enter your phone number"
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="date">Date of Appointment:</label>
                    <input
                        type="date"
                        id="date"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                        min={new Date().toISOString().split('T')[0]}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="timeSlot">Book Time Slot:</label>
                    <select
                        id="timeSlot"
                        value={timeSlot}
                        onChange={(e) => setTimeSlot(e.target.value)}
                        required
                    >
                        <option value="">Select a time slot</option>
                        <option value="09:00">09:00 AM</option>
                        <option value="10:00">10:00 AM</option>
                        <option value="11:00">11:00 AM</option>
                        <option value="14:00">02:00 PM</option>
                        <option value="15:00">03:00 PM</option>
                        <option value="16:00">04:00 PM</option>
                    </select>
                </div>
                <button type="submit" className="book-now-btn">Book Now</button>
            </form>
        </div>
    )
}

}
export default AppointmentForm;