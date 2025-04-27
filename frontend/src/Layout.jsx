import React, { useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import Sidebar from "./components/sidebar/Sidebar";
import SidebarLanding from "./components/sidebarLanding/SidebarLanding";

function Layout({ userLoggedIn, setUserLoggedIn }) {
    const [collapsed, setCollapsed] = useState(false);
    const navigate = useNavigate();

    const handleLogout = () => {
        setUserLoggedIn(false); // Set userLoggedIn state to false on logout
        navigate("/login"); // Redirect to login page
    };

    return (
        <div className="flex min-h-screen">
            {/* Render Sidebar for logged in users, SidebarLanding for guests */}
            {userLoggedIn ? (
                <Sidebar collapsed={collapsed} setCollapsed={setCollapsed} />
            ) : (
                <SidebarLanding />
            )}
            <main className={`flex-1 overflow-y-auto mt-10 md:mt-0 md:ml-40 p-4 bg-gray-900 text-white transition-all duration-300`}>
                {/* Include logout button if user is logged in */}
                {userLoggedIn && (
                    <button
                        onClick={handleLogout}
                        className="absolute top-5 right-5 bg-red-500 text-white px-4 py-2 rounded">
                        Log Out
                    </button>
                )}
                <Outlet />
            </main>
        </div>
    );
}

export default Layout;
