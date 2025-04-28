import React, { useState } from "react";
import Sidebar from "../sidebar/Sidebar";
import ChessLandingPage from "./ChessLandingPage";
import ChessHomePage from "../home/Home"; // Import the Home component

const ChessLayout = () => {
    const [collapsed, setCollapsed] = useState(false); //  state created here

    return (
        <div className="flex">
            {/* passing both collapsed and setCollapsed */}
            <Sidebar collapsed={collapsed} setCollapsed={setCollapsed} />

            <div className={`transition-all duration-300 flex-1 ${collapsed ? "ml-16" : "ml-60"}`}>
                <ChessHomePage />
            </div>
        </div>
    );
};

export default ChessLayout;
