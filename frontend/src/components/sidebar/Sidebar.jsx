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
    LogOut,
} from 'lucide-react';

const Sidebar = ({ collapsed, setCollapsed }) => {
    const navigate = useNavigate();
    const [lightMode, setLightMode] = useState(false);
    const [showPlaySubmenu, setShowPlaySubmenu] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [showMobilePlaySubmenu, setShowMobilePlaySubmenu] = useState(false);
    const hoverTimeout = useRef(null);
    const [showSettingsSubmenu, setShowSettingsSubmenu] = useState(false);


    const menuItems = [
        { id: 1, icon: <Play className="w-6 h-6" />, label: 'Play', submenu: true },
        { id: 2, icon: <Puzzle className="w-6 h-6" />, label: 'Puzzles' },
        { id: 3, icon: <BookOpen className="w-6 h-6" />, label: 'Learn' },
        { id: 4, icon: <Eye className="w-6 h-6" />, label: 'Watch' },
        { id: 5, icon: <Newspaper className="w-6 h-6" />, label: 'News' },
        { id: 6, icon: <Users className="w-6 h-6" />, label: 'Social' },
    ];

    const playSubmenuItems = [
        { id: 'online', icon: <Globe className="w-5 h-5" />, label: 'Human Vs Human', action: () => alert('Play Human vs Human') },
        { id: 'computer', icon: <Cpu className="w-5 h-5" />, label: 'Human Vs Bots', action: () => alert('Play vs Bots') },
        { id: 'tournaments', icon: <Trophy className="w-5 h-5" />, label: 'Bots Vs Bots', action: () => alert('Bots Tournament') },
    ];

    const handleToggleTheme = () => setLightMode(!lightMode);

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
        setShowMobilePlaySubmenu(false); // Close submenu when toggling main menu
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

    // Settings submenu handlers
    const handleSettingsMouseEnter = () => {
        clearTimeout(hoverTimeout.current);
        setShowSettingsSubmenu(true);
    };

    const handleSettingsMouseLeave = () => {
        hoverTimeout.current = setTimeout(() => {
            setShowSettingsSubmenu(false);
        }, 200);
    };

    const handleSettingsSubmenuMouseEnter = () => {
        clearTimeout(hoverTimeout.current);
        setShowSettingsSubmenu(true);
    };

    const handleSettingsSubmenuMouseLeave = () => {
        hoverTimeout.current = setTimeout(() => {
            setShowSettingsSubmenu(false);
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
                            <button onClick={() => setCollapsed(!collapsed)} className="flex items-center text-gray-300 hover:bg-gray-800 rounded-lg px-3 py-2 w-full">
                                <ChevronRight className={`w-5 h-5 ${collapsed ? '' : 'rotate-180'} transition-transform`} />
                                {!collapsed && <span className="ml-3">Collapse</span>}
                            </button>
                        </li>
                        <li>
                            <div
                                onMouseEnter={handleSettingsMouseEnter}
                                onMouseLeave={handleSettingsMouseLeave}
                            >
                                <button className="flex items-center text-gray-300 hover:bg-gray-800 rounded-lg px-3 py-2 w-full transition-colors">
                                    <Settings className="w-5 h-5" />
                                    {!collapsed && <span className="ml-3">Settings</span>}
                                </button>
                            </div>

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

            {/* Desktop Play Submenu */}
            {showPlaySubmenu && (
                <div
                    onMouseEnter={handleSubmenuMouseEnter}
                    onMouseLeave={handleSubmenuMouseLeave}
                    className={`hidden md:block fixed top-0 ${collapsed ? "left-[4.2rem]" : "left-40"} h-screen w-50 bg-gray-900 text-gray-200 shadow-lg z-30`}
                >

                    <ul className="space-y-2 p-4">
                        {playSubmenuItems.map((item) => (
                            <li key={item.id}>
                                <button
                                    onClick={item.action}
                                    className="flex items-center w-full text-left text-gray-300 hover:bg-gray-800 rounded-lg px-3 py-2"
                                >
                                    {item.icon}
                                    <span className="ml-3">{item.label}</span>
                                </button>
                            </li>
                        ))}
                    </ul>
                </div>
            )}

            {showSettingsSubmenu && (
                <div
                    onMouseEnter={handleSettingsSubmenuMouseEnter}
                    onMouseLeave={handleSettingsSubmenuMouseLeave}
                    className={`hidden md:block fixed bottom-10 ${collapsed ? " left-[4.2rem]" : "left-40"} left-40 h-23 w-48 bg-gray-900 text-gray-200 shadow-lg z-30`}
                >
                    <ul className="space-y-2 p-4">
                        <li>
                            <button
                                onClick={() => navigate('/settings')}
                                className="flex items-center w-full text-left text-gray-300 hover:bg-gray-800 rounded-lg px-3 py-2"
                            >
                                <Settings className="w-5 h-5" />
                                <span className="ml-3">All Settings</span>
                            </button>
                        </li>
                        <li>
                            <button
                                onClick={() => alert('Logout')}
                                className="flex items-center text-gray-300 hover:bg-gray-800 rounded-lg px-4 py-2 w-full"
                            >
                                <LogOut className="w-5 h-5" />
                                <span className="ml-3">Logout</span>
                            </button>
                        </li>
                    </ul>
                </div>
            )}

            {/* Mobile Sidebar */}
            {isMobileMenuOpen && (
                <div className="md:hidden fixed top-14 left-0 w-40 h-screen bg-black text-white z-40 p-4 shadow-md overflow-y-auto">
                    <ul className="space-y-2">
                        {menuItems.map((item) => (
                            <li key={item.id}>
                                <button
                                    onClick={() => item.submenu ? setShowMobilePlaySubmenu(true) : null}
                                    className="flex items-center w-full text-left text-gray-300 hover:bg-gray-800 rounded-lg px-3 py-2"
                                >
                                    {item.icon}
                                    <span className="ml-3">{item.label}</span>
                                </button>
                            </li>
                        ))}
                    </ul>
                    {/* Search */}
                    <div className="px-4 py-2 mt-20 pt-10">
                        <div className="relative">
                            <input
                                type="text"
                                placeholder="Search"
                                className="w-full bg-gray-800 text-gray-300 rounded-md py-2 pl-8 pr-4"
                            />
                            <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-500" />
                        </div>
                    </div>
                    {/* Light UI & Support */}
                    <div className="border-t border-gray-800 pt-2">
                        <button onClick={handleToggleTheme} className="flex items-center text-gray-300 hover:bg-gray-800 rounded-lg px-3 py-2 w-full">
                            <SunMoon className="w-5 h-5" />
                            <span className="ml-3">Light UI</span>
                        </button>
                        <button onClick={handleToggleTheme} className="flex items-center text-gray-300 hover:bg-gray-800 rounded-lg px-3 py-2 w-full">
                            <Settings className="w-5 h-5" />
                            <span className="ml-3">Settings</span>
                        </button>
                        <a href="#" className="flex items-center text-gray-300 hover:bg-gray-800 rounded-lg px-3 py-2 w-full">
                            <HelpCircle className="w-5 h-5" />
                            <span className="ml-3">Support</span>
                        </a>
                    </div>
                </div>
            )}

            {/* Mobile Play Submenu (to right of main sidebar) */}
            {isMobileMenuOpen && showMobilePlaySubmenu && (
                <div className="md:hidden fixed top-14 left-40 w-55 h-screen bg-gray-900 text-white z-50 p-4 shadow-lg">
                    <div className="flex justify-end mb-4">
                        <button
                            onClick={() => setShowMobilePlaySubmenu(false)}
                            className="text-gray-300 hover:text-white"
                        >
                            <X className="w-5 h-5" />
                        </button>
                    </div>
                    {playSubmenuItems.map((item) => (
                        <button
                            key={item.id}
                            onClick={() => {
                                item.action();
                                setShowMobilePlaySubmenu(false);
                                setIsMobileMenuOpen(false);
                            }}
                            className="flex items-center w-full text-sm text-gray-300 hover:bg-gray-800 rounded-lg px-3 py-2"
                        >
                            {item.icon}
                            <span className="ml-3">{item.label}</span>
                        </button>
                    ))}
                </div>
            )}
        </>
    );
};

export default Sidebar;
