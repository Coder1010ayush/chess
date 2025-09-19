// context/UserContext.jsx
import React, { createContext, useContext, useState, useEffect } from "react";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    // Fetch user session from backend when app loads or refreshes
    useEffect(() => {
        const fetchUser = async () => {
            try {
                const res = await fetch("http://localhost:9092/auth/me", {
                    method: "GET",
                    credentials: "include", // important for cookies
                });

                if (res.ok) {
                    const data = await res.json();
                    setUser(data.user);
                } else {
                    setUser(null);
                }
            } catch (err) {
                console.error("Auth check failed:", err);
                setUser(null);
            } finally {
                setLoading(false);
            }
        };

        fetchUser();
    }, []);

    // Called after successful login/signup
    const login = (userData) => {
        setUser(userData);
    };

    // Logout and clear session on backend + frontend
    const logout = async () => {
        try {
            await fetch("http://localhost:9092/auth/logout", {
                method: "POST",
                credentials: "include",
            });
        } catch (err) {
            console.error("Logout failed:", err);
        } finally {
            setUser(null);
        }
    };

    // Don’t render app until we know if user is logged in or not
    if (loading) {
        return <div className="text-center text-white p-6">Loading...</div>;
    }

    return (
        <UserContext.Provider value={{ user, login, logout, loading }}>
            {children}
        </UserContext.Provider>
    );
};

export const useUser = () => useContext(UserContext);
