import React, { useState } from 'react';

const ChessHomePage = () => {
    const [showWelcome, setShowWelcome] = useState(true);

    return (
        <div className="bg-gray-900 min-h-screen text-white">
            {/* Header */}
            <header className="flex justify-between items-center p-4 border-b border-gray-800">
                <div className="flex items-center">
                    <img
                        src="https://comicvine.gamespot.com/a/uploads/scale_medium/11176/111765968/9057023-dceusuperman.jpg"
                        alt="User avatar"
                        className="w-10 h-10 mr-3 rounded-full"
                    />
                    <h1 className="text-xl font-bold">RISHABH-JNU</h1>
                    <img
                        src="https://static.vecteezy.com/system/resources/previews/004/757/123/original/india-flag-free-vector.jpg"
                        alt="India flag"
                        className="ml-2 w-6 h-4"
                    />
                </div>
                <div className="flex space-x-4">
                    <button className="text-gray-400 hover:text-white">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                        </svg>
                    </button>
                </div>
            </header>

            {/* Welcome banner */}
            {showWelcome && (
                <div className="bg-blue-500 p-6 flex justify-between items-center relative">
                    <div>
                        <h2 className="text-4xl font-bold mb-2">We're so glad you're here!</h2>
                        <p className="text-2xl">Tell us how you heard about us and what brought you in</p>
                    </div>
                    <button className="bg-white text-gray-800 px-6 py-3 rounded-md text-xl font-bold">
                        Start Now!
                    </button>
                </div>
            )}

            {/* Features menu */}
            <div className="p-4 grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                    { title: 'Play', description: 'Start a game', color: 'amber-200' },
                    { title: 'Puzzles', description: 'Solve challenges', color: 'amber-600' },
                    { title: 'Lessons', description: 'Improve skills', color: 'blue-400' },
                    { title: 'Game Review', description: 'Analyze games', color: 'green-400' },
                ].map((item, index) => (
                    <div key={index} className="flex items-center bg-gray-800 p-4 rounded-md">
                        <div className={`p-2 rounded-md bg-gray-700 mr-3`}>
                            <svg viewBox="0 0 24 24" className={`h-10 w-10 text-${item.color}`} fill="currentColor">
                                <rect x="4" y="4" width="4" height="4" />
                                <rect x="12" y="4" width="4" height="4" />
                                <rect x="4" y="12" width="4" height="4" />
                                <rect x="12" y="12" width="4" height="4" />
                            </svg>
                        </div>
                        <div>
                            <h3 className="text-xl font-bold">{item.title}</h3>
                            <p className="text-gray-400">{item.description}</p>
                        </div>
                    </div>
                ))}
            </div>

            {/* Chess Boards */}
            <div className="p-4 grid grid-cols-1 md:grid-cols-3 gap-4">
                <ChessBoard title="Human - Human" imageUrl="https://th.bing.com/th/id/OIP.NHEQMuNBcdTwSyCgw4osrQHaE_?rs=1&pid=ImgDetMain" />
                <ChessBoard title="Human - AI" imageUrl="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b0/Chess_board_opening.svg/800px-Chess_board_opening.svg.png" />
                <ChessBoard title="AI - AI" imageUrl="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2c/Chess_kasparov.png/800px-Chess_kasparov.png" />
            </div>

        </div>
    );
};

// ChessBoard Component
const ChessBoard = ({ title, imageUrl }) => {
    return (
        <div className="bg-gray-800 rounded-md overflow-hidden">
            <div className="p-4">
                <div className="w-full h-64 bg-gray-600 flex items-center justify-center">
                    <img src={imageUrl} alt={`${title} Chess Board`} className="w-full h-full object-cover" />
                </div>
            </div>
            <div className="p-4 text-center">
                <button className="font-bold text-lg">{title}</button>
            </div>
        </div>
    );
};


export default ChessHomePage;
