const mongoose = require('mongoose');
const dotenv = require('dotenv');

// Load environment variables from .env file
dotenv.config();

// Use the environment variable for MongoDB URI
const mongoDBUri = process.env.MONGODB_URI;

mongoose.connect(mongoDBUri)
    .then(() => {
        console.log('Connected to MongoDB');
    })
    .catch((error) => {
        console.error('Error connecting to MongoDB:', error.message);
    });
