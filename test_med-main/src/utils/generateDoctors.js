// src/utils/generateDoctors.js
const specialties = [
    "Dentist",
    "Gynecologist/obstetrician",
    "General Physician",
    "Dermatologist",
    "Ear-nose-throat (ent) Specialist",
    "Homeopath",
    "Ayurveda"
];

const getRandomInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

const generateRandomDoctor = () => {
    const names = [
        "Dr. John Doe",
        "Dr. Jane Smith",
        "Dr. Emily Johnson",
        "Dr. Michael Brown",
        "Dr. Sarah Davis",
        "Dr. David Wilson"
    ];
    
    const name = names[getRandomInt(0, names.length - 1)];
    const specialty = specialties[getRandomInt(0, specialties.length - 1)];
    const experience = getRandomInt(1, 30); // Random experience between 1 and 30 years
    const ratings = "⭐".repeat(getRandomInt(1, 5)); // Random ratings between 1 and 5 stars

    return {
        id: Date.now() + Math.random(), // Unique ID
        name,
        speciality: specialty,
        experience,
        ratings,
        image: "src/default-doctor-image.png", // Placeholder image
        availability: ["Monday", "Wednesday", "Friday"] // Example availability
    };
};

export const generateDoctors = (count) => {
    const doctors = [];
    for (let i = 0; i < count; i++) {
        doctors.push(generateRandomDoctor());
    }
    return doctors;
};