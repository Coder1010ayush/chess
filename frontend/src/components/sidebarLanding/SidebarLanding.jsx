import React, { useState, useRef } from 'react';
import { useNavigate } from "react-router-dom";
import {
    Menu, X, Play, Puzzle, Search, Users, BookOpen, Eye, Newspaper,
    SunMoon, HelpCircle, Cpu, Trophy, Globe
} from 'lucide-react';

const SidebarLanding = () => {
    const navigate = useNavigate();
    const [lightMode, setLightMode] = useState(false);
    const [showPlaySubmenu, setShowPlaySubmenu] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const hoverTimeout = useRef(null);

    const menuItems = [
        { id: 1, icon: <Play className="w-6 h-6" />, label: 'Play', submenu: true },
        { id: 2, icon: <Puzzle className="w-6 h-6" />, label: 'Puzzles' },
        { id: 3, icon: <BookOpen className="w-6 h-6" />, label: 'Learn' },
        { id: 4, icon: <Eye className="w-6 h-6" />, label: 'Watch' },
        { id: 5, icon: <Newspaper className="w-6 h-6" />, label: 'News' },
        { id: 6, icon: <Users className="w-6 h-6" />, label: 'Social' },
    ];

    const playSubmenuItems = [
        { id: 'online', icon: <Globe className="w-5 h-5" />, label: 'Human Vs Human', action: () => alert('Navigating to Online Play!') },
        { id: 'computer', icon: <Cpu className="w-5 h-5" />, label: 'Human Vs Bots', action: () => alert('Starting a game Vs Computer!') },
        { id: 'tournaments', icon: <Trophy className="w-5 h-5" />, label: 'Bots Vs Bots', action: () => alert('Opening Tournaments!') },
    ];

    const handleToggleTheme = () => setLightMode(!lightMode);
    const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

    const handlePlayMouseEnter = () => {
        clearTimeout(hoverTimeout.current);
        setShowPlaySubmenu(true);
    };

    const handlePlayMouseLeave = () => {
        hoverTimeout.current = setTimeout(() => {
            setShowPlaySubmenu(false);
        }, 200);
    };

    const handleSubmenuMouseEnter = () => {
        clearTimeout(hoverTimeout.current);
        setShowPlaySubmenu(true);
    };

    const handleSubmenuMouseLeave = () => {
        hoverTimeout.current = setTimeout(() => {
            setShowPlaySubmenu(false);
        }, 200);
    };

    return (
        <>
            {/* Mobile Navbar */}
            <div className="md:hidden fixed top-0 left-0 w-full z-50 bg-black text-white flex items-center justify-between px-4 py-3 shadow-md">
                <div className="flex items-center space-x-3">
                    <button onClick={toggleMobileMenu}>
                        {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                    <div className="flex items-center space-x-2">
                        <img src="/pieces/chessLogo.png" className="w-8 h-8" alt="logo" />
                        <span className="text-xl font-bold">Chess.in</span>
                    </div>
                </div>

                {!isMobileMenuOpen && (
                    <div className="space-x-2">
                        <button
                            onClick={() => navigate("/signup")}
                            className="text-sm bg-green-600 px-3 py-1 rounded"
                        >
                            Sign Up
                        </button>
                        <button
                            onClick={() => navigate("/login")}
                            className="text-sm bg-gray-700 px-3 py-1 rounded"
                        >
                            Log In
                        </button>
                    </div>
                )}
            </div>


            {/* Desktop Sidebar */}
            <div className="hidden md:flex fixed top-0 left-0 h-screen w-40 bg-black text-gray-200 flex-col z-40">
                <div className="flex items-center p-4 border-b border-gray-800">
                    <img src="/pieces/chessLogo.png" alt="logo" className="w-10 h-10 mr-2 object-cover" />
                    <span className="text-white font-bold text-xl">Chess.in</span>
                </div>

                <div className="flex-grow overflow-y-auto">
                    <nav className="p-2">
                        <ul className="space-y-2">
                            {menuItems.map((item) => (
                                <li key={item.id}>
                                    {item.label === "Play" ? (
                                        <button
                                            onMouseEnter={handlePlayMouseEnter}
                                            onMouseLeave={handlePlayMouseLeave}
                                            className="flex items-center w-full text-gray-300 hover:bg-gray-800 rounded-lg px-3 py-2"
                                        >
                                            {item.icon}
                                            <span className="ml-3">{item.label}</span>
                                        </button>
                                    ) : (
                                        <button className="flex items-center w-full text-gray-300 hover:bg-gray-800 rounded-lg px-3 py-2">
                                            {item.icon}
                                            <span className="ml-3">{item.label}</span>
                                        </button>
                                    )}
                                </li>
                            ))}
                        </ul>
                        <div className="mt-4 space-y-2 px-2">
                            <button
                                onClick={() => navigate("/signup")}
                                className="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded-lg"
                            >
                                Sign Up
                            </button>
                            <button
                                onClick={() => navigate("/login")}
                                className="w-full bg-gray-800 hover:bg-gray-900 text-white py-2 rounded-lg"
                            >
                                Log In
                            </button>
                        </div>
                    </nav>
                </div>

                {/* Search */}
                <div className="px-4 py-2">
                    <div className="relative">
                        <input
                            type="text"
                            placeholder="Search"
                            className="w-full bg-gray-800 text-gray-300 rounded-md py-2 pl-8 pr-4"
                        />
                        <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-500" />
                    </div>
                </div>

                {/* Footer */}
                <div className="border-t border-gray-800 p-2">
                    <ul className="space-y-2">
                        <li>
                            <button
                                onClick={handleToggleTheme}
                                className="flex items-center w-full text-gray-300 hover:bg-gray-800 rounded-lg px-3 py-2"
                            >
                                <SunMoon className="w-5 h-5" />
                                <span className="ml-3">Light UI</span>
                            </button>
                        </li>
                        <li>
                            <a href="#" className="flex items-center text-gray-300 hover:bg-gray-800 rounded-lg px-3 py-2">
                                <HelpCircle className="w-5 h-5" />
                                <span className="ml-3">Support</span>
                            </a>
                        </li>
                    </ul>
                </div>
            </div>

            {/* Mobile Sidebar Dropdown */}
            {isMobileMenuOpen && (
                <div className="md:hidden fixed top-14 left-0 w-40 h-screen bg-black text-white z-40 p-4 space-y-4 shadow-md">
                    <ul className="space-y-2">
                        {menuItems.map((item) => (
                            <li key={item.id}>
                                {item.label === "Play" ? (
                                    <>
                                        <button
                                            onClick={() => setShowPlaySubmenu(!showPlaySubmenu)}
                                            className="flex items-center w-full text-gray-300 hover:bg-gray-800 rounded-lg px-3 py-2"
                                        >
                                            {item.icon}
                                            <span className="ml-3">{item.label}</span>
                                        </button>
                                        {showPlaySubmenu && (
                                            <div className="pl-6 pt-1 space-y-2">
                                                {playSubmenuItems.map((subItem) => (
                                                    <button
                                                        key={subItem.id}
                                                        onClick={() => {
                                                            subItem.action();
                                                            setIsMobileMenuOpen(false);
                                                        }}
                                                        className="flex items-center w-full text-sm text-gray-300 hover:bg-gray-800 rounded-lg px-3 py-1"
                                                    >
                                                        {subItem.icon}
                                                        <span className="ml-2">{subItem.label}</span>
                                                    </button>
                                                ))}
                                            </div>
                                        )}
                                    </>
                                ) : (
                                    <button className="flex items-center w-full text-gray-300 hover:bg-gray-800 rounded-lg px-3 py-2">
                                        {item.icon}
                                        <span className="ml-3">{item.label}</span>
                                    </button>
                                )}
                            </li>
                        ))}
                    </ul>

                    {/* Mobile Additions */}
                    <button
                        onClick={() => {
                            navigate("/signup");
                            setIsMobileMenuOpen(false);
                        }}
                        className="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded-lg"
                    >
                        Sign Up
                    </button>

                    <button
                        onClick={() => {
                            navigate("/login");
                            setIsMobileMenuOpen(false);
                        }}
                        className="w-full bg-gray-800 hover:bg-gray-900 text-white py-2 rounded-lg"
                    >
                        Log In
                    </button>

                    <div className="space-y-2">
                        <div className="relative">
                            <input
                                type="text"
                                placeholder="Search"
                                className="w-full bg-gray-800 text-gray-300 rounded-md py-2 pl-8 pr-4"
                            />
                            <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-500" />
                        </div>
                        <button
                            onClick={handleToggleTheme}
                            className="flex items-center w-full text-gray-300 hover:bg-gray-800 rounded-lg px-3 py-2"
                        >
                            <SunMoon className="w-5 h-5" />
                            <span className="ml-3">Light UI</span>
                        </button>
                        <a href="#" className="flex items-center text-gray-300 hover:bg-gray-800 rounded-lg px-3 py-2">
                            <HelpCircle className="w-5 h-5" />
                            <span className="ml-3">Support</span>
                        </a>
                    </div>
                </div>
            )}

            {/* Desktop Submenu */}
            {showPlaySubmenu && (
                <div
                    onMouseEnter={handleSubmenuMouseEnter}
                    onMouseLeave={handleSubmenuMouseLeave}
                    className="hidden md:block fixed left-40 top-4 h-auto bg-gray-900 text-gray-200 w-56 shadow-xl px-3 py-2 z-30"
                >
                    {playSubmenuItems.map((subItem) => (
                        <button
                            key={subItem.id}
                            onClick={subItem.action}
                            className="flex items-center w-full text-gray-300 hover:bg-gray-800 rounded-lg px-4 py-2"
                        >
                            {subItem.icon}
                            <span className="ml-3">{subItem.label}</span>
                        </button>
                    ))}
                </div>
            )}
        </>
    );
};

export default SidebarLanding;
