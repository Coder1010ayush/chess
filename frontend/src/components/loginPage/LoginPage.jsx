import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const LoginPage = ({ setUserLoggedIn }) => {
    const navigate = useNavigate();

    const [form, setForm] = useState({
        email: "",
        password: "",
    });

    const [error, setError] = useState("");

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        try {
            const res = await axios.post("http://localhost:9092/auth/login", form); // correct endpoint
            localStorage.setItem("token", res.data.token);
            setUserLoggedIn(true); // Update userLoggedIn state to true
            navigate("/"); // after login, go to Home
        } catch (err) {
            console.error(err);
            setError(err.response?.data?.error || "Login failed.");
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
                    <h2 className="text-2xl font-bold text-center">Log In</h2>

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

                    {error && <p className="text-red-400 text-sm">{error}</p>}

                    <button
                        type="submit"
                        className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
                    >
                        Log In
                    </button>

                    {/* Link to Signup */}
                    <p className="text-center text-sm text-gray-400 mt-2">
                        Don’t have an account?{" "}
                        <button
                            onClick={() => navigate("/signup")}
                            type="button"
                            className="text-blue-400 hover:underline"
                        >
                            Sign Up
                        </button>
                    </p>
                </form>
            </div>
        </div>
    );
};

export default LoginPage;
