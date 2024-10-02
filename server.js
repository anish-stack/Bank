const express = require('express');
const app = express();
const dotenv = require('dotenv');
dotenv.config()
const cors = require('cors');
const connectDb = require('./config/db');
const router = require('./routes/route');

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));  
app.use(cors());

//Database connection
connectDb()


// Routes
app.get('/', (req, res) => {
    res.send('I am from the API');
});

app.use('/api/v1/bank',router)

// Handle undefined routes
app.use((req, res, next) => {
    res.status(404).json({ message: "Route not found" });
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: "Internal server error" });
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (err, promise) => {
    console.log(`Logged Error: ${err.message}`);
    // Close the server & exit process
    server.close(() => process.exit(1));
});

// Start the server
const PORT = process.env.PORT || 5000;
const server = app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
