import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./components/sidebar/Sidebar";

function Layout() {
    return (
        <div className="flex min-h-screen">
            <Sidebar />
            <main className="flex-1 overflow-y-auto p-4 bg-gray-900 text-white">
                <Outlet />
            </main>
        </div>
    );
}

export default Layout;
