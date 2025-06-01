import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const CLOUD_NAME = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
const UPLOAD_PRESET = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;

const SignupPage = ({ setUserLoggedIn }) => {
    const [form, setForm] = useState({
        username: "",
        email: "",
        fullName: "",
        password: "",
        avatar: "", // Cloudinary URL
    });

    const [error, setError] = useState("");
    const [uploading, setUploading] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleImageUpload = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        const formData = new FormData();
        formData.append("file", file);
        formData.append("upload_preset", UPLOAD_PRESET);
        setUploading(true);

        try {
            const res = await axios.post(
                `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`,
                formData
            );
            setForm((prev) => ({ ...prev, avatar: res.data.secure_url }));
        } catch (err) {
            console.error(err);
            setError("Image upload failed.");
        } finally {
            setUploading(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        try {
            await axios.post("http://localhost:9092/auth/signup", form, {
                withCredentials: true, // Enables cookie handling
            });

            // Optionally, you can call /auth/me to get user info
            // const meRes = await axios.get("http://localhost:9092/auth/me", {
            //     withCredentials: true,
            // });
            // setUser(meRes.data.user); // if you store full user info

            setUserLoggedIn(true); // basic boolean state is fine too
            navigate("/");
        } catch (err) {
            console.error(err);
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

                <form onSubmit={handleSubmit} className="space-y-4 bg-gray-800 p-6 rounded">
                    <h2 className="text-xl font-bold text-center">Sign Up</h2>

                    <input
                        type="text"
                        name="username"
                        placeholder="Username"
                        value={form.username}
                        onChange={handleChange}
                        className="w-full p-2 rounded bg-gray-700"
                        required
                    />
                    <input
                        type="text"
                        name="fullName"
                        placeholder="Full Name"
                        value={form.fullName}
                        onChange={handleChange}
                        className="w-full p-2 rounded bg-gray-700"
                        required
                    />
                    <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        value={form.email}
                        onChange={handleChange}
                        className="w-full p-2 rounded bg-gray-700"
                        required
                    />
                    <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        value={form.password}
                        onChange={handleChange}
                        className="w-full p-2 rounded bg-gray-700"
                        required
                    />
                    <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageUpload}
                        className="w-full p-2 bg-gray-700 text-gray-400"
                    />

                    {uploading && <p className="text-yellow-400">Uploading avatar...</p>}
                    {form.avatar && (
                        <img
                            src={form.avatar}
                            alt="Avatar Preview"
                            className="w-16 h-16 rounded-full object-cover mx-auto"
                        />
                    )}
                    {error && <p className="text-red-400">{error}</p>}

                    <button
                        type="submit"
                        className="w-full bg-green-500 hover:bg-green-600 py-2 rounded font-bold"
                        disabled={uploading}
                    >
                        {uploading ? "Uploading..." : "Sign Up"}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default SignupPage;
