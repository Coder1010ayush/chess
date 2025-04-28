import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    ChevronRight,
    Play,
    Puzzle,
    Search,
    Settings,
    Users,
    BookOpen,
    Eye,
    Newspaper,
    SunMoon,
    HelpCircle,
    Cpu,
    Trophy,
    Globe,
    Menu,
    X,
} from 'lucide-react';

const Sidebar = ({ collapsed, setCollapsed }) => {
    const navigate = useNavigate();
    const [lightMode, setLightMode] = useState(false);
    const [showPlaySubmenu, setShowPlaySubmenu] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [showMobilePlaySubmenu, setShowMobilePlaySubmenu] = useState(false);
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

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
        setShowMobilePlaySubmenu(false);
    };

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
            {/* Mobile Top Bar */}
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

                {/* Icons instead of Sign Up / Log In */}
                {!isMobileMenuOpen && (
                    <div className="flex items-center space-x-4">
                        <button className="text-gray-400 hover:text-white">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                            </svg>
                        </button>
                        <button className="flex items-center text-gray-400 hover:text-white">
                            <Settings className="w-5 h-5" />
                        </button>
                    </div>
                )}
            </div>


            {/* Desktop Sidebar */}
            <div className={`hidden md:flex fixed top-0 left-0 h-screen ${collapsed ? 'w-16' : 'w-40'} bg-black text-gray-200 flex-col z-40 transition-all duration-300`}>
                {/* Logo */}
                <div className="flex items-center p-4 border-b border-gray-800">
                    <div className="w-10 h-10 mr-2 overflow-hidden">
                        <img src="/pieces/chessLogo.png" alt="logo" className="w-full h-full object-cover" />
                    </div>
                    {!collapsed && <span className="text-white font-bold text-xl">Chess.in</span>}
                </div>

                {/* Menu */}
                <ul className="flex-1 mt-4 px-2 space-y-2">
                    {menuItems.map((item) => (
                        <li
                            key={item.id}
                            onMouseEnter={item.submenu ? handlePlayMouseEnter : null}
                            onMouseLeave={item.submenu ? handlePlayMouseLeave : null}
                        >
                            <button className="flex items-center w-full text-left text-gray-300 hover:bg-gray-800 rounded-lg px-3 py-2">
                                {item.icon}
                                {!collapsed && <span className="ml-3">{item.label}</span>}
                            </button>
                        </li>
                    ))}
                </ul>

                {/* Search */}
                {!collapsed && (
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
                )}

                {/* Footer */}
                <div className="border-t border-gray-800 p-2">
                    <ul className="space-y-2">
                        <li>
                            <button onClick={handleToggleTheme} className="flex items-center text-gray-300 hover:bg-gray-800 rounded-lg px-3 py-2 w-full">
                                <SunMoon className="w-5 h-5" />
                                {!collapsed && <span className="ml-3">Light UI</span>}
                            </button>
                        </li>
                        <li>
                            <button onClick={() => setCollapsed && setCollapsed(!collapsed)} className="flex items-center text-gray-300 hover:bg-gray-800 rounded-lg px-3 py-2 w-full">
                                <ChevronRight className={`w-5 h-5 ${collapsed ? '' : 'rotate-180'} transition-transform`} />
                                {!collapsed && <span className="ml-3">Collapse</span>}
                            </button>
                        </li>
                        <li>
                            <button onClick={handleToggleTheme} className="flex items-center text-gray-300 hover:bg-gray-800 h-6 rounded-lg px-3 py-2 w-full transition-colors">
                                <Settings className="w-5 h-5" />
                                {!collapsed && <span className="ml-3">Settings</span>}
                            </button>
                        </li>
                        <li>
                            <a href="#" className="flex items-center text-gray-300 hover:bg-gray-800 rounded-lg px-3 py-2">
                                <HelpCircle className="w-5 h-5" />
                                {!collapsed && <span className="ml-3">Support</span>}
                            </a>
                        </li>
                    </ul>
                </div>
            </div>

            {/* Desktop Hover Submenu */}
            {showPlaySubmenu && (
                <div
                    onMouseEnter={handleSubmenuMouseEnter}
                    onMouseLeave={handleSubmenuMouseLeave}
                    className="hidden md:block fixed top-0 left-40 h-screen w-50 bg-gray-900 text-gray-200 shadow-lg z-30"
                >
                    <ul className="space-y-2 p-4">
                        {playSubmenuItems.map((subItem) => (
                            <li key={subItem.id}>
                                <button onClick={subItem.action} className="flex items-center w-full text-left text-gray-300 hover:bg-gray-800 rounded-lg px-3 py-2">
                                    {subItem.icon}
                                    <span className="ml-3">{subItem.label}</span>
                                </button>
                            </li>
                        ))}
                    </ul>
                </div>
            )}

            {/* Mobile Sidebar */}
            {isMobileMenuOpen && (
                <div className="md:hidden fixed top-14 left-0 w-40 h-screen bg-black text-white z-40 p-4 shadow-md space-y-4">
                    <ul className="space-y-2">
                        {menuItems.map((item) => (
                            <li key={item.id}>
                                <button
                                    onClick={() => item.submenu ? setShowMobilePlaySubmenu(!showMobilePlaySubmenu) : null}
                                    className="flex items-center w-full text-left text-gray-300 hover:bg-gray-800 rounded-lg px-3 py-2"
                                >
                                    {item.icon}
                                    <span className="ml-3">{item.label}</span>
                                </button>
                            </li>
                        ))}
                    </ul>

                    {showMobilePlaySubmenu && (
                        <div className="pl-4 mt-2 space-y-2">
                            {playSubmenuItems.map((subItem) => (
                                <button
                                    key={subItem.id}
                                    onClick={subItem.action}
                                    className="flex items-center w-full text-gray-300 hover:bg-gray-700 rounded-lg px-2 py-1"
                                >
                                    {subItem.icon}
                                    <span className="ml-2">{subItem.label}</span>
                                </button>
                            ))}
                        </div>
                    )}

                    {/* <div className="mt-6">
                        <button onClick={() => navigate('/signup')} className="w-full bg-green-600 text-white py-2 rounded-lg mb-2">
                            Sign Up
                        </button>
                        <button onClick={() => navigate('/login')} className="w-full bg-gray-700 text-white py-2 rounded-lg">
                            Log In
                        </button>
                    </div> */}

                    <div className="mt-10 pt-20">
                        <button onClick={handleToggleTheme} className="flex items-center w-full text-gray-300 hover:bg-gray-800 rounded-lg px-3 py-2">
                            <SunMoon className="w-5 h-5" />
                            <span className="ml-3">Light UI</span>
                        </button>
                        <button onClick={handleToggleTheme} className="flex items-center text-gray-300 hover:bg-gray-800 h-6 rounded-lg px-3 py-2 w-full transition-colors">
                            <Settings className="w-5 h-5" />
                            {<span className="ml-3">Settings</span>}
                        </button>
                        <a href="#" className="flex items-center text-gray-300 hover:bg-gray-800 rounded-lg px-3 py-2">
                            <HelpCircle className="w-5 h-5" />
                            <span className="ml-3">Support</span>
                        </a>
                    </div>
                </div>
            )}
        </>
    );
};

export default Sidebar;
