const express = require("express");
const cors = require("cors");

const app = express();
const PORT = 9092;

// Middleware
app.use(cors()); // Allow requests from frontend
app.use(express.json()); // Parse JSON data

// Sample API Endpoint
app.post("/send-data", (req, res) => {
    console.log("Received Data:", req.body);
    res.json({ message: "Data received successfully!" });
});

// Start Server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
