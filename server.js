const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();
app.use(bodyParser.json());

// Connect to MongoDB (replace 'your_database_url' with your actual MongoDB connection string)
mongoose.connect('mongodb://localhost:27017/healthcareDB', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

// Define a patient schema
const patientSchema = new mongoose.Schema({
    patientId: String,
    surname: String,
    otherNames: String,
    gender: String,
    phoneNumber: String,
    address: String,
    emergencyName: String,
    emergencyContact: String,
    relationship: String
});

// Create a Patient model using the schema
const Patient = mongoose.model('Patient', patientSchema);

// API endpoint for patient registration
app.post('/register', async (req, res) => {
    const {
        patientId,
        surname,
        otherNames,
        gender,
        phoneNumber,
        address,
        emergencyName,
        emergencyContact,
        relationship
    } = req.body;

    try {
        // Check if the patient already exists
        const existingPatient = await Patient.findOne({ patientId });
        if (existingPatient) {
            return res.status(400).json({ error: 'Patient already exists' });
        }

        // Register the new patient
        const newPatient = new Patient({
            patientId,
            surname,
            otherNames,
            gender,
            phoneNumber,
            address,
            emergencyName,
            emergencyContact,
            relationship
        });

        await newPatient.save();
        res.status(201).json({ message: 'Patient registered successfully', patient: newPatient });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// API endpoint for starting an encounter
app.post('/start-encounter', async (req, res) => {
    const { patientId, dateAndTime, encounterType } = req.body;

    try {
        // Check if the patient exists
        const patient = await Patient.findOne({ patientId });
        if (!patient) {
            return res.status(404).json({ error: 'Patient not found' });
        }

        // Start the encounter
        const encounter = {
            patientId,
            dateAndTime,
            encounterType
        };

        res.status(201).json({ message: 'Encounter started successfully', encounter });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Start the server
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});