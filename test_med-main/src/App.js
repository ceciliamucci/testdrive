import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom'; // Importa las dependencias necesarias
import Navbar from './Components/Navbar/Navbar';
import LandingPage from './Components/LandingPage/LandingPage';
import SignUp from './Components/SignUp/SignUp';
import Login from './Components/Login/Login'; // Asegúrate de tener este componente
import InstantConsultation from './Components/InstantConsultation/InstantConsultation'; // Import the component
import FindDoctorSearch from './Components/FindDoctorSearch/FindDoctorSearch';
import BookingConsultation from './Components/BookingConsultation'; // Import the new BookingConsultation component
import Notification from './Components/Notification/Notification';
import Confirmation from './Components/Confirmation/Confirmation';
import ReviewForm from './Components/ReviewForm/ReviewForm';
import Appointments from './Components/Appointments/Appointments';
import ReportsLayout from './Components/ReportsLayout/ReportsLayout'; // Import the ReportsLayout component
import ProfileCard from './Components/ProfileCard/ProfileCard'; // Import the ProfileCard component

import './App.css';

function App() {
    const [appointments, setAppointments] = useState([]);

    return (
        <div className="App">
            <BrowserRouter>
                <Navbar appointments={appointments} />
                <Routes>
                    {/* Definir las rutas de la aplicación */}
                    <Route path="/" element={<LandingPage />} /> {/* Ruta principal, página de inicio */}
                    <Route path="/landing-page" element={<LandingPage />} /> {/* Ruta para Home */}
                    <Route path="/sign-up" element={<SignUp />} /> {/* Ruta para el formulario de registro */}
                    <Route path="/login" element={<Login />} /> {/* Ruta para el formulario de login */}
                    <Route path="/instant-consultation" element={<InstantConsultation setAppointments={setAppointments} />} />
                    <Route path="/finddoctorsearch" element={<FindDoctorSearch />} />
                    <Route path="/booking-consultation" element={<BookingConsultation />} /> {/* Ruta para BookingConsultation */}
                    <Route path="/notification" element={<Notification />} />
                    <Route path="/confirmation" element={<Confirmation />} />
                    <Route path="/reviewform" element={<ReviewForm />} />
                    <Route path="/appointments" element={<Appointments appointments={appointments} setAppointments={setAppointments} />} />
                    <Route path="/reports" element={<ReportsLayout />} /> {/* Route for Reports */}
                    <Route path="/profile" element={<ProfileCard />} /> {/* Route for Profile */}
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;