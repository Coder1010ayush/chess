import React from "react";
import Sidebar from "../sidebar/Sidebar";
import SidebarLanding from "../sidebarLanding/SidebarLanding";

const ChessLandingPage = () => {
    return (
        <div className="bg-gray-900 md:ml-40 text-white font-sans min-h-screen">
            {/* Sidebar for logged in users */}
            <SidebarLanding />
            {/* Hero Section */}
            <section className="flex flex-col md:flex-row mt-8 md:mt-0 items-center justify-between px-6 md:px-16 py-10 bg-[#312e2b]">
                <div className="w-full md:w-1/2">
                    <img src="/standardboard.1d6f9426.png" alt="Chess board" className="rounded-lg shadow-lg h-80 w-90" />
                </div>
                <div className="w-full md:w-1/2 mt-8 md:mt-0 text-center md:text-left">
                    <h1 className="text-5xl font-bold leading-snug">Play Chess Online on the Highest Rated Plateform</h1>
                    <p className="text-gray-400 mt-2 font-semibold text-base ">1,867 Games Today • 164 Playing Now</p>
                    <div className="mt-6 space-y-4 flex flex-col md:flex-row md:space-y-0 md:space-x-4">
                        <button className="w-full md:w-auto bg-green-500 text-white px-6 py-3 rounded-lg font-semibold shadow-md 
                                          hover:bg-green-600 hover:shadow-lg 
                                          active:scale-95 
                                          transition-all duration-200 ease-in-out 
                                          focus:outline-none focus:ring-2 focus:ring-green-400">
                            Play Online
                        </button>

                        <button className="w-full md:w-auto bg-gray-700 text-white px-6 py-3 rounded-lg font-semibold shadow-md 
                                          hover:bg-gray-600 hover:shadow-lg 
                                          active:scale-95 
                                          transition-all duration-200 ease-in-out 
                                          focus:outline-none focus:ring-2 focus:ring-gray-400">
                            Play Computer
                        </button>
                    </div>

                </div>
            </section>

            {/* Puzzle Section */}
            <section className="flex flex-col md:flex-row bg-[#312e2b] p-6 md:p-12 mt-8">
                {/* Content (Left on Desktop) */}
                <div className="w-full md:w-1/2 space-y-10 mt-6 md:mt-0 md:pr-8 flex flex-col">
                    <h2 className="text-4xl font-bold order-1">Solve Chess Puzzles</h2>

                    {/* Image (Mobile View Only) */}
                    <div className="flex justify-center md:hidden order-2">
                        <img
                            src="/board-puzzles.png"
                            alt="Puzzle"
                            className="rounded shadow-md w-full max-w-md object-cover"
                        />
                    </div>

                    {/* Quote (Mobile & Desktop) */}
                    <div className="flex items-center gap-4 order-3">
                        <img
                            src="https://gknow.in/wp-content/uploads/2024/04/Dommaraju-Gukesh-chess-1024x768.jpeg"
                            alt="Hikaru"
                            className="w-32 h-32 rounded-lg"
                        />
                        <p className="text-gray-300 text-lg">
                            "I kind of believe in Fischer's quote. I believe in good moves."
                            <br />
                            <strong> GM Gukesh D</strong>
                        </p>
                    </div>

                    {/* Button */}
                    <div className="order-4">
                        <button className="w-full md:w-auto bg-green-500 text-white px-6 py-3 rounded-lg font-bold shadow-md 
                                          hover:bg-green-600 hover:shadow-lg 
                                          active:scale-95 
                                          transition-all duration-200 ease-in-out 
                                          focus:outline-none focus:ring-2 focus:ring-green-400 text-3xl ">
                            Solve Puzzles
                        </button>
                    </div>
                </div>

                {/* Image (Right on Desktop) */}
                <div className="w-full md:w-1/2 hidden md:flex justify-center">
                    <img
                        src="/board-puzzles.png"
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
