import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // ✅ for navigation

const SignupPage = () => {
    const [form, setForm] = useState({
        username: "",
        email: "",
        fullName: "",
        password: "",
        avatar: "",
    });

    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const [uploading, setUploading] = useState(false);
    const navigate = useNavigate(); // ✅ navigation hook

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleImageUpload = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        const formData = new FormData();
        formData.append("file", file);
        formData.append("upload_preset", "your_upload_preset"); // 🔁 Replace with Cloudinary preset
        setUploading(true);

        try {
            const res = await axios.post(
                "https://api.cloudinary.com/v1_1/your_cloud_name/image/upload", // 🔁 Replace
                formData
            );
            const url = res.data.secure_url;
            setForm((prev) => ({ ...prev, avatar: url }));
            setUploading(false);
        } catch (err) {
            console.error("Image upload failed", err);
            setError("Image upload failed.");
            setUploading(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setSuccess("");

        try {
            const res = await axios.post("http://localhost:9092/signup", form);
            setSuccess("Signup successful!");
            localStorage.setItem("token", res.data.token);
            // Optional: Navigate to dashboard or login
            navigate("/login");
        } catch (err) {
            setError(err.response?.data?.error || "Signup failed.");
        }
    };

    return (
        <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center">
            <div className="w-full max-w-md p-4">
                {/* Back Button */}
                <button
                    onClick={() => navigate(-1)}
                    className="text-sm text-blue-400 hover:underline mb-4"
                >
                    ← Back
                </button>

                <form
                    onSubmit={handleSubmit}
                    className="bg-gray-800 p-8 rounded shadow-md w-full space-y-4"
                >
                    <h2 className="text-2xl font-bold text-center">Sign Up</h2>

                    <input
                        type="text"
                        name="username"
                        placeholder="Username"
                        value={form.username}
                        onChange={handleChange}
                        className="w-full px-4 py-2 rounded bg-gray-700 focus:outline-none"
                        required
                    />

                    <input
                        type="text"
                        name="fullName"
                        placeholder="Full Name"
                        value={form.fullName}
                        onChange={handleChange}
                        className="w-full px-4 py-2 rounded bg-gray-700 focus:outline-none"
                        required
                    />

                    <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        value={form.email}
                        onChange={handleChange}
                        className="w-full px-4 py-2 rounded bg-gray-700 focus:outline-none"
                        required
                    />

                    <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        value={form.password}
                        onChange={handleChange}
                        className="w-full px-4 py-2 rounded bg-gray-700 focus:outline-none"
                        required
                    />

                    <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageUpload}
                        className="w-full px-4 py-2 rounded bg-gray-700 text-gray-400 focus:outline-none"
                    />

                    {uploading && <p className="text-yellow-400 text-sm">Uploading image...</p>}

                    {form.avatar && (
                        <img
                            src={form.avatar}
                            alt="Avatar Preview"
                            className="w-20 h-20 rounded-full object-cover mx-auto"
                        />
                    )}

                    {error && <p className="text-red-400 text-sm">{error}</p>}
                    {success && <p className="text-green-400 text-sm">{success}</p>}

                    <button
                        type="submit"
                        className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded"
                    >
                        Sign Up
                    </button>

                    {/* Link to Login */}
                    <p className="text-center text-sm text-gray-400 mt-2">
                        Already have an account?{" "}
                        <button
                            onClick={() => navigate("/login")}
                            type="button"
                            className="text-blue-400 hover:underline"
                        >
                            Log In
                        </button>
                    </p>
                </form>
            </div>
        </div>
    );
};

export default SignupPage;
