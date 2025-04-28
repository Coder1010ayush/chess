import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    Play,
    Puzzle,
    BookOpen,
    Eye,
    Newspaper,
    Users,
    Menu,
    X,
    Globe,
    Cpu,
    Trophy,
    Search,
    SunMoon,
    HelpCircle,
} from 'lucide-react';

const SidebarLanding = () => {
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
        {
            id: 'online',
            icon: <Globe className="w-5 h-5" />,
            label: 'Human Vs Human',
            action: () => alert('Navigating to Online Play!'),
        },
        {
            id: 'computer',
            icon: <Cpu className="w-5 h-5" />,
            label: 'Human Vs Bots',
            action: () => alert('Starting a game Vs Computer!'),
        },
        {
            id: 'tournaments',
            icon: <Trophy className="w-5 h-5" />,
            label: 'Bots Vs Bots',
            action: () => alert('Opening Tournaments!'),
        },
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
                {!isMobileMenuOpen && (
                    <div className="space-x-2">
                        <button
                            onClick={() => navigate('/signup')}
                            className="text-sm bg-green-600 px-3 py-1 rounded"
                        >
                            Sign Up
                        </button>
                        <button
                            onClick={() => navigate('/login')}
                            className="text-sm bg-gray-700 px-3 py-1 rounded"
                        >
                            Log In
                        </button>
                    </div>
                )}
            </div>

            {/* Desktop Sidebar */}
            <div className="hidden md:flex fixed top-0 left-0 h-screen w-40 bg-black text-gray-200 flex-col z-40">
                <div className="flex items-center justify-center h-16 border-b border-gray-800">
                    <img src="/pieces/chessLogo.png" className="w-10 h-10" alt="logo" />
                    <span className="text-white font-bold text-xl">Chess.in</span>
                </div>
                <ul className="flex-1 space-y-1 mt-4 px-2">
                    {menuItems.map((item) => (
                        <li
                            key={item.id}
                            onMouseEnter={item.submenu ? handlePlayMouseEnter : null}
                            onMouseLeave={item.submenu ? handlePlayMouseLeave : null}
                        >
                            <button className="flex items-center w-full text-left text-gray-300 hover:bg-gray-800 rounded-lg px-3 py-2">
                                {item.icon}
                                <span className="ml-3">{item.label}</span>
                            </button>
                        </li>
                    ))}
                </ul>
                <div className="space-y-2 px-4 py-4 mb-20">
                    <div className="relative">
                        <input
                            type="text"
                            placeholder="Search"
                            className="w-full bg-gray-800 text-gray-300 rounded-md py-2 pl-8 pr-4"
                        />
                        <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-500" />
                    </div>
                    <button
                        onClick={() => navigate('/signup')}
                        className="w-full bg-green-600 text-white py-2 rounded-lg"
                    >
                        Sign Up
                    </button>
                    <button
                        onClick={() => navigate('/login')}
                        className="w-full bg-gray-800 text-white py-2 rounded-lg"
                    >
                        Log In
                    </button>


                </div>

                <div className='mt-8 pt-10 mb-2 px-2'>
                    <button
                        onClick={handleToggleTheme}
                        className="flex items-center w-full text-gray-300 hover:bg-gray-800 rounded-lg px-3 py-2"
                    >
                        <SunMoon className="w-5 h-5" />
                        <span className="ml-3">Light UI</span>
                    </button>
                    <a
                        href="#"
                        className="flex items-center text-gray-300 hover:bg-gray-800 rounded-lg px-3 py-2"
                    >
                        <HelpCircle className="w-5 h-5" />
                        <span className="ml-3">Support</span>
                    </a>
                </div>
            </div>

            {/* Desktop Hover Submenu */}
            {showPlaySubmenu && (
                <div
                    onMouseEnter={handleSubmenuMouseEnter}
                    onMouseLeave={handleSubmenuMouseLeave}
                    className="hidden md:block fixed left-40 h-screen bg-gray-900 text-gray-200 w-42 shadow-xl px-3 py-2 z-30"
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

            {/* Mobile Sidebar */}
            {isMobileMenuOpen && (
                <div className="md:hidden fixed top-14 left-0 w-40 h-screen bg-black text-white z-40 p-4 shadow-md space-y-4">
                    <ul className="space-y-2">
                        {menuItems.map((item) => (
                            <li key={item.id}>
                                {item.label === 'Play' ? (
                                    <button
                                        onClick={() => setShowMobilePlaySubmenu(true)}
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
                    <div className="space-y-2 mb-4 ">
                        <div className="relative">
                            <input
                                type="text"
                                placeholder="Search"
                                className="w-full bg-gray-800 text-gray-300 rounded-md py-2 pl-8 pr-4"
                            />
                            <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-500" />
                        </div>
                        <button
                            onClick={() => navigate('/signup')}
                            className="w-full bg-green-600 text-white py-2 rounded-lg"
                        >
                            Sign Up
                        </button>
                        <button
                            onClick={() => navigate('/login')}
                            className="w-full bg-gray-800 text-white py-2 rounded-lg"
                        >
                            Log In
                        </button>


                    </div>
                    <div className='mt-4 pt-14 mr-4'>
                        <button
                            onClick={handleToggleTheme}
                            className="flex items-center w-full text-gray-300 hover:bg-gray-800 rounded-lg px-3 py-2"
                        >
                            <SunMoon className="w-5 h-5" />
                            <span className="ml-3">Light UI</span>
                        </button>
                        <a
                            href="#"
                            className="flex items-center text-gray-300 hover:bg-gray-800 rounded-lg px-3 py-2"
                        >
                            <HelpCircle className="w-5 h-5" />
                            <span className="ml-3">Support</span>
                        </a>
                    </div>
                </div>
            )}

            {/* Mobile Play Submenu (right of main sidebar) */}
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

export default SidebarLanding;
