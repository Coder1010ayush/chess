const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");

dotenv.config();

const authRoutes = require("./routes/auth");
const userRoutes = require("./routes/user");

const app = express();
const PORT = process.env.PORT || 9092;

const cookieParser = require("cookie-parser");
app.use(cookieParser());


const authRoutes = require("./routes/auth");
app.use("/auth", authRoutes);



// Middleware
// Allow credentials from specific origin
app.use(cors({
    origin: "http://localhost:5173", // <-- Frontend origin
    credentials: true               // <-- Allow cookies and auth headers
}));
app.use(express.json());

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log("MongoDB connected"))
    .catch((err) => console.error("MongoDB connection error:", err));


// Custom Sample Endpoint from your old code
app.post("/send-data", (req, res) => {
    console.log("Received Data:", req.body);
    res.json({ message: "Data received successfully!" });
});


// Test Endpoint
app.get("/", (req, res) => {
    res.send("Chess backend API is running successfully!");
});

// Routes
app.use("/auth", require("./routes/auth")); 

app.use("/auth", authRoutes);
app.use("/user", userRoutes);

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
