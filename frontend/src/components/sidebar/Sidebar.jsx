import React, { useState } from 'react';
import {
    ChevronRight,
    Play,
    Puzzle,
    Search,
    Settings,
    User,
    Users,
    BookOpen,
    Eye,
    Newspaper,
    MoreHorizontal,
    Diamond,
    SunMoon,
    HelpCircle,
    Cpu,
    Trophy,
    Globe,
    X
} from 'lucide-react';

const Sidebar = () => {
    const [collapsed, setCollapsed] = useState(false);
    const [lightMode, setLightMode] = useState(false);
    const [showPlaySubmenu, setShowPlaySubmenu] = useState(false);

    // Sidebar Main Menu Items
    const menuItems = [
        { id: 1, icon: <Play className="w-6 h-6" />, label: 'Play', submenu: true },
        { id: 2, icon: <Puzzle className="w-6 h-6" />, label: 'Puzzles' },
        { id: 3, icon: <BookOpen className="w-6 h-6" />, label: 'Learn' },
        { id: 4, icon: <Eye className="w-6 h-6" />, label: 'Watch' },
        { id: 5, icon: <Newspaper className="w-6 h-6" />, label: 'News' },
        { id: 6, icon: <Users className="w-6 h-6" />, label: 'Social' },
        // { id: 7, icon: <MoreHorizontal className="w-6 h-6" />, label: 'More' },
        // { id: 8, icon: <Diamond className="w-6 h-6 text-blue-400" />, label: 'Free Trial' },
    ];

    // Play Submenu Items
    const playSubmenuItems = [
        { id: 'online', icon: <Globe className="w-5 h-5" />, label: 'Human Vs Human', action: () => alert('Navigating to Online Play!') },
        { id: 'computer', icon: <Cpu className="w-5 h-5" />, label: 'Human Vs Bots', action: () => alert('Starting a game Vs Computer!') },
        { id: 'tournaments', icon: <Trophy className="w-5 h-5" />, label: 'Bots Vs Bots', action: () => alert('Opening Tournaments!') },
    ];

    const handleToggleCollapse = () => setCollapsed(!collapsed);
    const handleToggleTheme = () => setLightMode(!lightMode);
    const handleSettings = () => alert('Navigating to Settings Page!');

    return (
        <div className="flex h-screen">
            {/* Main Sidebar */}
            <div className={`relative flex flex-col ${collapsed ? 'w-16' : 'w-60'} bg-gray-900 text-gray-200 transition-all duration-300`}>
                {/* Logo Section */}
                <div className="flex items-center p-4 border-b border-gray-800">
                    <div className="w-10 h-10 mr-2 overflow-hidden ">
                        <img
                            src="../public/pieces/chessLogo.png"
                            alt="logo"
                            className="w-full h-full object-cover"
                        />
                    </div>
                    {!collapsed && <span className="text-white font-bold text-xl">Chess.in</span>}
                </div>


                {/* Main Menu */}
                <div className="flex-grow overflow-y-auto">
                    <nav className="p-2">
                        <ul className="space-y-2">
                            {menuItems.map((item) => (
                                <li key={item.id}>
                                    <button
                                        onClick={() => item.submenu && setShowPlaySubmenu(true)}
                                        className={`flex items-center w-full ${item.id === 8 ? 'text-blue-400' : 'text-gray-300'}
                      hover:bg-gray-800 rounded-lg px-3 py-2 transition-colors`}
                                    >
                                        <div className="relative">{item.icon}</div>
                                        {!collapsed && <span className="ml-3">{item.label}</span>}
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </nav>
                </div>

                {/* Search Bar */}
                {!collapsed && (
                    <div className="px-4 py-2">
                        <div className="relative">
                            <input
                                type="text"
                                placeholder="Search"
                                className="w-full bg-gray-800 text-gray-300 rounded-md py-2 pl-8 pr-4 focus:outline-none focus:ring-1 focus:ring-gray-700"
                            />
                            <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-500" />
                        </div>
                    </div>
                )}

                {/* Bottom Controls */}
                <div className="border-t border-gray-800 p-2">
                    <ul className="space-y-2">
                        <li>
                            <button
                                onClick={handleToggleTheme}
                                className="flex items-center text-gray-300 hover:bg-gray-800 rounded-lg px-3 py-2 w-full transition-colors"
                            >
                                <SunMoon className="w-5 h-5" />
                                {!collapsed && <span className="ml-3">Light UI</span>}
                            </button>
                        </li>
                        <li>
                            <button
                                onClick={handleToggleCollapse}
                                className="flex items-center text-gray-300 hover:bg-gray-800 rounded-lg px-3 py-2 w-full transition-colors"
                            >
                                <ChevronRight className={`w-5 h-5 ${collapsed ? '' : 'rotate-180'} transition-transform`} />
                                {!collapsed && <span className="ml-3">Collapse</span>}
                            </button>
                        </li>
                        {/* Settings Button (NEW) */}
                        <li>
                            <button
                                onClick={handleSettings}
                                className="flex items-center text-gray-300 hover:bg-gray-800 rounded-lg px-3 py-2 w-full transition-colors"
                            >
                                <Settings className="w-5 h-5" />
                                {!collapsed && <span className="ml-3">Settings</span>}
                            </button>
                        </li>
                        {/* Support Button */}
                        <li>
                            <a
                                href="#"
                                className="flex items-center text-gray-300 hover:bg-gray-800 rounded-lg px-3 py-2 transition-colors"
                            >
                                <HelpCircle className="w-5 h-5" />
                                {!collapsed && <span className="ml-3">Support</span>}
                            </a>
                        </li>
                    </ul>
                </div>
            </div>

            {/* Play Submenu Sidebar */}
            {showPlaySubmenu && (
                <div className="h-screen w-55 bg-gray-800 text-gray-200 transition-opacity duration-300 shadow-lg flex flex-col">
                    {/* Close Button */}
                    <button
                        onClick={() => setShowPlaySubmenu(false)}
                        className="p-3 text-gray-300 hover:text-white hover:bg-gray-700 flex items-center justify-end"
                    >
                        <X className="w-5 h-5" />
                    </button>

                    <ul className="p-2">
                        {playSubmenuItems.map((subItem) => (
                            <li key={subItem.id}>
                                <button
                                    onClick={subItem.action}
                                    className="flex items-center w-full text-gray-300 hover:bg-gray-700 rounded-lg px-3 py-2 transition-colors"
                                >
                                    {subItem.icon}
                                    <span className="ml-3">{subItem.label}</span>
                                </button>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
};

export default Sidebar;
