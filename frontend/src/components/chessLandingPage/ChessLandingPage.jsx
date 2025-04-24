import React from "react";
import Sidebar from "../sidebar/Sidebar";
import SidebarLanding from "../sidebarLanding/SidebarLanding";

const ChessLandingPage = () => {
    return (
        <div className="bg-gray-900 text-white font-sans min-h-screen">
            {/* Hero Section */}
            <section className="flex flex-col md:flex-row items-center justify-between px-6 md:px-16 py-10 bg-gray-800">
                <div className="w-full md:w-1/2">
                    <img src="https://th.bing.com/th/id/OIP.NHEQMuNBcdTwSyCgw4osrQHaE_?rs=1&pid=ImgDetMain" alt="Chess board" className="rounded-lg shadow-lg" />
                </div>
                <div className="w-full md:w-1/2 mt-8 md:mt-0 text-center md:text-left">
                    <h1 className="text-4xl font-bold leading-snug">Play Chess Online on the Highest Rated Plateform</h1>
                    <p className="text-gray-400 mt-2 text-sm">1,867 Games Today • 164 Playing Now</p>
                    <div className="mt-6 space-y-4">
                        <button className="w-full md:w-auto bg-green-500 text-white px-6 py-3 rounded font-semibold shadow hover:bg-green-600">Play Online</button>
                        <button className="w-full md:w-auto bg-gray-700 text-white px-6 py-3 rounded font-semibold hover:bg-gray-600">Play Computer</button>
                    </div>
                </div>
            </section>

            {/* Puzzle Section */}
            {/* Puzzle Section */}
            <section className="flex flex-col md:flex-row bg-gray-800 p-6 md:p-12 mt-8">
                {/* Content (Left on Desktop) */}
                <div className="w-full md:w-1/2 space-y-4 mt-6 md:mt-0 md:pr-8 flex flex-col">
                    <h2 className="text-2xl font-semibold order-1">Solve Chess Puzzles</h2>

                    {/* Image (Mobile View Only) */}
                    <div className="flex justify-center md:hidden order-2">
                        <img
                            src="https://th.bing.com/th/id/OIP.NHEQMuNBcdTwSyCgw4osrQHaE_?rs=1&pid=ImgDetMain"
                            alt="Puzzle"
                            className="rounded shadow-md w-full max-w-md object-cover"
                        />
                    </div>

                    {/* Quote (Mobile & Desktop) */}
                    <div className="flex items-center gap-4 order-3">
                        <img
                            src="https://th.bing.com/th/id/OIP.NHEQMuNBcdTwSyCgw4osrQHaE_?rs=1&pid=ImgDetMain"
                            alt="Hikaru"
                            className="w-16 h-16 rounded-lg"
                        />
                        <p className="text-gray-300 text-sm">
                            "Puzzles are the best way to improve pattern recognition, and no site does it better."
                            <br />
                            <strong>GM Hikaru Nakamura</strong>
                        </p>
                    </div>

                    {/* Button */}
                    <div className="order-4">
                        <button className="bg-green-500 px-6 py-2 rounded text-white font-bold hover:bg-green-600">
                            Solve Puzzles
                        </button>
                    </div>
                </div>

                {/* Image (Right on Desktop) */}
                <div className="w-full md:w-1/2 hidden md:flex justify-center">
                    <img
                        src="https://th.bing.com/th/id/OIP.NHEQMuNBcdTwSyCgw4osrQHaE_?rs=1&pid=ImgDetMain"
                        alt="Puzzle"
                        className="rounded shadow-md w-full max-w-md object-cover"
                    />
                </div>
            </section>



            {/* Lesson Section */}
            <section className="flex flex-col md:flex-row bg-gray-800 p-6 md:p-12 mt-8">
                <div className="w-full md:w-1/2 flex justify-center">
                    <img src="https://th.bing.com/th/id/OIP.NHEQMuNBcdTwSyCgw4osrQHaE_?rs=1&pid=ImgDetMain" alt="Lesson" className="rounded shadow-md" />
                </div>
                <div className="w-full md:w-1/2 space-y-4 mt-6 md:mt-0">
                    <h2 className="text-2xl font-semibold">Take Chess Lessons</h2>
                    <div className="flex items-center mt-4">
                        <img src="https://th.bing.com/th/id/OIP.NHEQMuNBcdTwSyCgw4osrQHaE_?rs=1&pid=ImgDetMain" alt="Anna Rudolf" className="w-16 h-16 rounded-lg mr-4" />
                        <p className="text-gray-300 text-sm">"Chess.com lessons make it easy to learn to play, then challenge you to continue growing."<br /><strong>IM Anna Rudolf</strong></p>
                    </div>
                    <button className="bg-green-500 px-6 py-2 rounded text-white font-bold hover:bg-green-600">Start Lessons</button>

                </div>
            </section>

            {/* News Section */}
            <section className="bg-gray-900 p-6 md:p-12">
                <h2 className="text-2xl font-bold text-center mb-8">Follow what’s happening in Chess Today.</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-gray-800 p-4 rounded shadow">
                        <img src="https://th.bing.com/th/id/OIP.NHEQMuNBcdTwSyCgw4osrQHaE_?rs=1&pid=ImgDetMain" className="rounded mb-2" alt="Ju Wenjun" />
                        <h3 className="font-semibold">Ju Wenjun Wins 5th Women's World Chess Championship</h3>
                        <p className="text-sm text-gray-400">Colin McGourty</p>
                    </div>
                    <div className="bg-gray-800 p-4 rounded shadow">
                        <img src="https://th.bing.com/th/id/OIP.NHEQMuNBcdTwSyCgw4osrQHaE_?rs=1&pid=ImgDetMain" className="rounded mb-2" alt="Magnus Carlsen" />
                        <h3 className="font-semibold">Carlsen Wins Paris Freestyle Chess Grand Slam: 7 Conclusions</h3>
                        <p className="text-sm text-gray-400">Colin McGourty</p>
                    </div>
                    <div className="bg-gray-800 p-4 rounded shadow">
                        <img src="https://th.bing.com/th/id/OIP.NHEQMuNBcdTwSyCgw4osrQHaE_?rs=1&pid=ImgDetMain" className="rounded mb-2" alt="Banusz" />
                        <h3 className="font-semibold">The Key Concepts And Methods This GM Teaches To Thousands</h3>
                        <p className="text-sm text-gray-400">Nathaniel Green</p>
                    </div>
                    <div className="bg-gray-800 p-4 rounded shadow">
                        <img src="https://th.bing.com/th/id/OIP.NHEQMuNBcdTwSyCgw4osrQHaE_?rs=1&pid=ImgDetMain" className="rounded mb-2" alt="Jan's Four Knights" />
                        <h3 className="font-semibold">Rare Fourth Moves</h3>
                        <p className="text-sm text-gray-400">GM JanistanTV</p>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default ChessLandingPage;
