import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./components/sidebar/Sidebar";
import SidebarLanding from "./components/sidebarLanding/SidebarLanding";

function Layout() {
    const [collapsed, setCollapsed] = useState(false);

    return (
        <div className="flex min-h-screen">
            <SidebarLanding />
            {/* <Sidebar collapsed={collapsed} setCollapsed={setCollapsed} /> */}
            <main className={`flex-1 overflow-y-auto mt-10 md:mt-0 md:ml-40 p-4 bg-gray-900 text-white transition-all duration-300 `}>
                <Outlet />
            </main>
        </div>
    );
}

export default Layout;
