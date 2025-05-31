// context/UserContext.jsx
import React, { createContext, useContext, useState, useEffect } from 'react';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const res = await fetch("http://localhost:9092/auth/me", {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    credentials: "include",
                });

                if (res.ok) {
                    const data = await res.json();
                    setUser(data.user);
                    localStorage.setItem("user", JSON.stringify(data.user));
                } else {
                    setUser(null);
                    localStorage.removeItem("user");
                }
            } catch (error) {
                console.error("Failed to fetch user:", error);
                const storedUser = localStorage.getItem("user");
                if (storedUser) {
                    setUser(JSON.parse(storedUser));
                } else {
                    setUser(null);
                }
            }
        };

        fetchUser();
    }, []);

    const login = (userData) => {
        localStorage.setItem("user", JSON.stringify(userData));
        setUser(userData);
    };

    const logout = async () => {
        try {
            const res = await fetch("http://localhost:9092/auth/logout", {
                method: "POST",
                credentials: "include",
            });
            if (res.ok) {
                localStorage.removeItem("user");
                setUser(null);
            } else {
                console.error("Logout failed:", res.statusText);
            }
        } catch (err) {
            console.error("Logout error:", err);
        }
    };

    return (
        <UserContext.Provider value={{ user, setUser, login, logout }}>
            {children}
        </UserContext.Provider>
    );
};

export const useUser = () => useContext(UserContext);
