import React, { useState } from 'react';
import {
    ChevronRight,
    Play,
    Puzzle,
    Search,
    Users,
    BookOpen,
    Eye,
    Newspaper,
    SunMoon,
    HelpCircle,
    Cpu,
    Trophy,
    Globe,
    X,
} from 'lucide-react';

const SidebarLanding = () => {
    const [lightMode, setLightMode] = useState(false);
    const [showPlaySubmenu, setShowPlaySubmenu] = useState(false);

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

    return (
        <>
            {/* Sidebar */}
            <div className="fixed top-0 left-0 h-screen z-50 w-40 bg-black text-gray-200 flex flex-col transition-all duration-300">
                {/* Logo */}
                <div className="flex items-center p-4 border-b border-gray-800">
                    <div className="w-10 h-10 mr-2 overflow-hidden">
                        <img src="/pieces/chessLogo.png" alt="logo" className="w-full h-full object-cover" />
                    </div>
                    <span className="text-white font-bold text-xl">Chess.in</span>
                </div>

                {/* Menu */}
                <div className="flex-grow overflow-y-auto">
                    <nav className="p-2">
                        <ul className="space-y-2">
                            {menuItems.map((item) => (
                                <li key={item.id}>
                                    <button
                                        onClick={() => item.submenu && setShowPlaySubmenu(true)}
                                        className="flex items-center w-full text-gray-300 hover:bg-gray-800 rounded-lg px-3 py-2 transition-colors"
                                    >
                                        {item.icon}
                                        <span className="ml-3">{item.label}</span>
                                    </button>
                                </li>
                            ))}
                        </ul>

                        {/* Signup and Login Buttons */}
                        <div className="mt-4 space-y-2 px-2">
                            <button className="w-full bg-green-600 hover:bg-green-700 text-white font-medium py-2 rounded-lg transition-all">
                                Sign Up
                            </button>
                            <button className="w-full bg-gray-800 hover:bg-gray-900 text-white font-medium py-2 rounded-lg transition-all">
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
                            className="w-full bg-gray-800 text-gray-300 rounded-md py-2 pl-8 pr-4 focus:outline-none focus:ring-1 focus:ring-gray-700"
                        />
                        <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-500" />
                    </div>
                </div>

                {/* Footer */}
                <div className="border-t border-gray-800 p-2">
                    <ul className="space-y-2">
                        <li>
                            <button onClick={handleToggleTheme} className="flex items-center text-gray-300 hover:bg-gray-800 rounded-lg px-3 py-2 w-full transition-colors">
                                <SunMoon className="w-5 h-5" />
                                <span className="ml-3">Light UI</span>
                            </button>
                        </li>
                        <li>
                            <a href="#" className="flex items-center text-gray-300 hover:bg-gray-800 rounded-lg px-3 py-2 transition-colors">
                                <HelpCircle className="w-5 h-5" />
                                <span className="ml-3">Support</span>
                            </a>
                        </li>
                    </ul>
                </div>
            </div>

            {/* Submenu */}
            {showPlaySubmenu && (
                <div className="fixed left-40 h-screen w-88 bg-gray-800 text-gray-200 transition-all duration-300 shadow-lg flex flex-col z-40">
                    <button onClick={() => setShowPlaySubmenu(false)} className="p-3 text-gray-300 hover:text-white hover:bg-gray-700 flex items-center justify-end">
                        <X className="w-5 h-5" />
                    </button>
                    <ul className="p-2">
                        {playSubmenuItems.map((subItem) => (
                            <li key={subItem.id}>
                                <button onClick={subItem.action} className="flex items-center w-full text-gray-300 hover:bg-gray-700 rounded-lg px-3 py-2 transition-colors">
                                    {subItem.icon}
                                    <span className="ml-3">{subItem.label}</span>
                                </button>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </>
    );
};

export default SidebarLanding;
