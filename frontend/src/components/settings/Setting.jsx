import React, { useState, useEffect } from 'react';

const Setting = () => {
    // State to store user data (would come from database in a real app)
    const [userData, setUserData] = useState({
        username: '',
        firstName: '',
        lastName: '',
        email: '',
        location: '',
        country: 'India',
        showBadges: true,
        language: 'English',
        contentLanguage: 'English + My Language',
        timezone: '(UTC +05:30) Asia/Kolkata',
        otbRating: '--',
        otbRatingValue: 0,
        aboutMe: '',
        joinDate: 'Mar 6, 2025',
    });

    // State for form inputs
    const [formData, setFormData] = useState({ ...userData });
    const [activeTab, setActiveTab] = useState('Profile'); // State to track active sidebar tab

    // Simulate fetching data from database
    useEffect(() => {
        // In a real app, this would be an API call
        const fetchUserData = async () => {
            // Simulating API response
            const response = {
                username: 'AYUSH-JNU',
                firstName: 'Ayush',
                lastName: '',
                email: 'r***0@g***l.com',
                location: '',
                country: 'India',
                showBadges: true,
                language: 'English',
                contentLanguage: 'English + My Language',
                timezone: '(UTC +05:30) Asia/Kolkata',
                otbRating: '--',
                otbRatingValue: 0,
                aboutMe: '',
                joinDate: 'Mar 6, 2025',
            };

            setUserData(response);
            setFormData(response);
        };

        fetchUserData();
    }, []);

    // Handle input changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    // Handle toggle switch
    const handleToggle = () => {
        setFormData({
            ...formData,
            showBadges: !formData.showBadges
        });
    };

    // Handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();
        // In a real app, this would be an API call to update data
        console.log('Saving data:', formData);
        setUserData(formData);
        alert('Settings saved successfully!');
    };

    return (
        <div className="min-h-screen bg-[#312e2b] text-white p-6">
            <div className='flex'>
                {/* Sidebar */}
                <div className="w-64 bg-[#262421] rounded-lg p-4 mr-6">
                    <div className="mb-6">
                        <div className="relative">
                            <input
                                type="text"
                                placeholder="Search settings"
                                className="w-full bg-[#3a3633] text-white p-2 pl-8 rounded"
                            />
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-4 w-4 text-gray-400 absolute left-2 top-3"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                                />
                            </svg>
                        </div>
                    </div>

                    <nav>
                        <ul className="space-y-1">
                            <li>
                                <button
                                    onClick={() => setActiveTab('Board & Pieces')}
                                    className={`w-full text-left p-2 rounded flex items-center ${activeTab === 'Board & Pieces' ? 'bg-[#3a3633] text-white' : 'text-gray-300 hover:bg-[#3a3633]'}`}
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                                    </svg>
                                    Board & Pieces
                                </button>
                            </li>
                            <li>
                                <button
                                    onClick={() => setActiveTab('Gameplay')}
                                    className={`w-full text-left p-2 rounded flex items-center ${activeTab === 'Gameplay' ? 'bg-[#3a3633] text-white' : 'text-gray-300 hover:bg-[#3a3633]'}`}
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                                    </svg>
                                    Gameplay
                                </button>
                            </li>
                            <li>
                                <button
                                    onClick={() => setActiveTab('Profile')}
                                    className={`w-full text-left p-2 rounded flex items-center ${activeTab === 'Profile' ? 'bg-[#3a3633] text-white' : 'text-gray-300 hover:bg-[#3a3633]'}`}
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                    </svg>
                                    Profile
                                </button>
                            </li>
                            <li>
                                <button
                                    onClick={() => setActiveTab('Interface')}
                                    className={`w-full text-left p-2 rounded flex items-center ${activeTab === 'Interface' ? 'bg-[#3a3633] text-white' : 'text-gray-300 hover:bg-[#3a3633]'}`}
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                    </svg>
                                    Interface
                                </button>
                            </li>
                            <li>
                                <button
                                    onClick={() => setActiveTab('Social')}
                                    className={`w-full text-left p-2 rounded flex items-center ${activeTab === 'Social' ? 'bg-[#3a3633] text-white' : 'text-gray-300 hover:bg-[#3a3633]'}`}
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                                    </svg>
                                    Social
                                </button>
                            </li>
                            <li>
                                <button
                                    onClick={() => setActiveTab('Coach')}
                                    className={`w-full text-left p-2 rounded flex items-center ${activeTab === 'Coach' ? 'bg-[#3a3633] text-white' : 'text-gray-300 hover:bg-[#3a3633]'}`}
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                                    </svg>
                                    Coach
                                </button>
                            </li>
                            <li>
                                <button
                                    onClick={() => setActiveTab('Notification')}
                                    className={`w-full text-left p-2 rounded flex items-center ${activeTab === 'Notification' ? 'bg-[#3a3633] text-white' : 'text-gray-300 hover:bg-[#3a3633]'}`}
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                                    </svg>
                                    Notification
                                </button>
                            </li>
                            <li>
                                <button
                                    onClick={() => setActiveTab('Account')}
                                    className={`w-full text-left p-2 rounded flex items-center ${activeTab === 'Account' ? 'bg-[#3a3633] text-white' : 'text-gray-300 hover:bg-[#3a3633]'}`}
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                    </svg>
                                    Account
                                </button>
                            </li>
                            <li>
                                <button
                                    onClick={() => setActiveTab('Membership')}
                                    className={`w-full text-left p-2 rounded flex items-center ${activeTab === 'Membership' ? 'bg-[#3a3633] text-white' : 'text-gray-300 hover:bg-[#3a3633]'}`}
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                    Membership
                                </button>
                            </li>
                        </ul>
                    </nav>
                </div>

                {/* Main Content */}
                <div className="flex-1">
                    <div className="flex flex-col items-start">
                        {/* setting icon */}
                        <div className="flex justify-start items-center mb-6">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-400 mr-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <circle cx="12" cy="12" r="3"></circle>
                                <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9A1.65 1.65 0 0 0 10.34 3v-.09a2 2 0 1 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 1 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"></path>
                            </svg>
                            <h1 className="text-lg font-bold text-gray-200">Settings</h1>
                        </div>
                        <div className="bg-black text-white p-6 w-full">
                            {/* Profile Header */}
                            <div className="flex items-start mb-6">
                                <div className="relative mr-4">
                                    <div className="bg-gray-700 w-20 h-20 rounded-sm flex items-center justify-center">
                                        <div className="text-gray-400">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" viewBox="0 0 20 20" fill="currentColor">
                                                <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                                            </svg>
                                        </div>
                                    </div>
                                    <button className="absolute bottom-0 left-0 bg-blue-500 text-white text-xs p-1 rounded-sm">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                                            <path fillRule="evenodd" d="M4 5a2 2 0 00-2 2v8a2 2 0 002 2h12a2 2 0 002-2V7a2 2 0 00-2-2h-1.586a1 1 0 01-.707-.293l-1.121-1.121A2 2 0 0011.172 3H8.828a2 2 0 00-1.414.586L6.293 4.707A1 1 0 015.586 5H4zm6 9a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd" />
                                        </svg>
                                    </button>
                                </div>
                                <div className="flex-1">
                                    <div className="flex items-center">
                                        <h1 className="text-xl font-bold text-gray-200">{userData.username} 🇮🇳</h1>
                                        <button className="ml-2 bg-blue-600 hover:bg-blue-700 text-white text-xs py-1 px-2 rounded">Add Flair</button>
                                    </div>
                                    <p className="text-gray-400">{userData.firstName}</p>
                                    <p className="text-gray-400 text-sm mt-1">Enter a status here</p>
                                </div>
                            </div>

                            {/* Membership Banner */}
                            <div className="bg-blue-600 flex justify-between items-center rounded mb-6 p-3">
                                <div className="font-bold">BASIC MEMBER</div>
                                <div className="flex items-center">
                                    <span className="mr-1">Membership Plans</span>
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                                    </svg>
                                </div>
                            </div>

                            {/* Settings Form */}
                            <form onSubmit={handleSubmit}>
                                <div className="grid gap-4">
                                    {/* Username */}
                                    <div className="flex justify-between items-center">
                                        <label className="text-sm">Username</label>
                                        <div className="flex items-center">
                                            <span className="text-gray-300 mr-2">{userData.username}</span>
                                            <button type="button" className="text-blue-400 text-xs">Change</button>
                                        </div>
                                    </div>

                                    {/* First Name */}
                                    <div className="flex justify-between items-center">
                                        <label htmlFor="firstName" className="text-sm">First Name</label>
                                        <input
                                            type="text"
                                            id="firstName"
                                            name="firstName"
                                            value={formData.firstName}
                                            onChange={handleChange}
                                            className="bg-gray-800 text-gray-300 p-2 rounded w-64"
                                        />
                                    </div>

                                    {/* Last Name */}
                                    <div className="flex justify-between items-center">
                                        <label htmlFor="lastName" className="text-sm">Last Name</label>
                                        <input
                                            type="text"
                                            id="lastName"
                                            name="lastName"
                                            value={formData.lastName}
                                            onChange={handleChange}
                                            className="bg-gray-800 text-gray-300 p-2 rounded w-64"
                                        />
                                    </div>

                                    {/* Email Address */}
                                    <div className="flex justify-between items-center">
                                        <label className="text-sm">Email Address</label>
                                        <div className="flex items-center">
                                            <span className="text-gray-300 mr-2">{userData.email}</span>
                                            <button type="button" className="text-blue-400 text-xs">Change</button>
                                        </div>
                                    </div>

                                    {/* Location */}
                                    <div className="flex justify-between items-center">
                                        <label htmlFor="location" className="text-sm">Location</label>
                                        <input
                                            type="text"
                                            id="location"
                                            name="location"
                                            value={formData.location}
                                            onChange={handleChange}
                                            className="bg-gray-800 text-gray-300 p-2 rounded w-64"
                                        />
                                    </div>

                                    {/* Country */}
                                    <div className="flex justify-between items-center">
                                        <label htmlFor="country" className="text-sm">Country</label>
                                        <select
                                            id="country"
                                            name="country"
                                            value={formData.country}
                                            onChange={handleChange}
                                            className="bg-gray-800 text-gray-300 p-2 rounded w-64"
                                        >
                                            <option value="India">India</option>
                                            <option value="USA">USA</option>
                                            <option value="UK">New Zealand</option>
                                            <option value="Canada">Australia</option>
                                        </select>
                                    </div>

                                    {/* Show Membership Badges */}
                                    <div className="flex justify-between items-center">
                                        <label className="text-sm">Show Membership Badges</label>
                                        <div
                                            onClick={handleToggle}
                                            className={`w-12 h-6 flex items-center rounded-full p-1 cursor-pointer ${formData.showBadges ? 'bg-green-500' : 'bg-gray-700'}`}
                                        >
                                            <div className={`bg-white w-4 h-4 rounded-full shadow-md transform duration-300 ease-in-out ${formData.showBadges ? 'translate-x-6' : ''}`}></div>
                                        </div>
                                    </div>

                                    {/* Language */}
                                    <div className="flex justify-between items-center">
                                        <label htmlFor="language" className="text-sm">Language</label>
                                        <select
                                            id="language"
                                            name="language"
                                            value={formData.language}
                                            onChange={handleChange}
                                            className="bg-gray-800 text-gray-300 p-2 rounded w-64"
                                        >
                                            <option value="English">English</option>
                                            <option value="Hindi">Hindi</option>
                                            <option value="Spanish">Spanish</option>
                                        </select>
                                    </div>

                                    {/* Content Language */}
                                    <div className="flex justify-between items-center">
                                        <label htmlFor="contentLanguage" className="text-sm">Content Language</label>
                                        <select
                                            id="contentLanguage"
                                            name="contentLanguage"
                                            value={formData.contentLanguage}
                                            onChange={handleChange}
                                            className="bg-gray-800 text-gray-300 p-2 rounded w-64"
                                        >
                                            <option value="English + My Language">English + My Language</option>
                                            <option value="English Only">English Only</option>
                                            <option value="My Language Only">My Language Only</option>
                                        </select>
                                    </div>

                                    {/* Timezone */}
                                    <div className="flex justify-between items-center">
                                        <label htmlFor="timezone" className="text-sm">Timezone</label>
                                        <select
                                            id="timezone"
                                            name="timezone"
                                            value={formData.timezone}
                                            onChange={handleChange}
                                            className="bg-gray-800 text-gray-300 p-2 rounded w-64"
                                        >
                                            <option value="(UTC +05:30) Asia/Kolkata">(UTC +05:30) Asia/Kolkata</option>
                                            <option value="(UTC +00:00) GMT">(UTC +00:00) GMT</option>
                                            <option value="(UTC -05:00) America/New_York">(UTC -05:00) America/New_York</option>
                                        </select>
                                    </div>

                                    {/* OTB Rating */}
                                    <div className="flex justify-between items-center">
                                        <label htmlFor="otbRating" className="text-sm">OTB Rating</label>
                                        <div className="flex items-center">
                                            <select
                                                id="otbRating"
                                                name="otbRating"
                                                value={formData.otbRating}
                                                onChange={handleChange}
                                                className="bg-gray-800 text-gray-300 p-2 rounded mr-2 w-16"
                                            >
                                                <option value="--">--</option>
                                                <option value="FIDE">FIDE</option>
                                                <option value="USCF">USCF</option>
                                            </select>
                                            <input
                                                type="number"
                                                id="otbRatingValue"
                                                name="otbRatingValue"
                                                value={formData.otbRatingValue}
                                                onChange={handleChange}
                                                className="bg-gray-800 text-gray-300 p-2 rounded w-20"
                                            />
                                        </div>
                                    </div>

                                    {/* About Me */}
                                    <div>
                                        <label htmlFor="aboutMe" className="text-sm block mb-2">About Me</label>
                                        <textarea
                                            id="aboutMe"
                                            name="aboutMe"
                                            value={formData.aboutMe}
                                            onChange={handleChange}
                                            className="bg-gray-800 text-gray-300 p-2 rounded w-full h-32 resize-none"
                                        ></textarea>
                                    </div>

                                    {/* Save Button */}
                                    <div className="mt-4">
                                        <button
                                            type="submit"
                                            className="bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-8 rounded"
                                        >
                                            Save
                                        </button>
                                    </div>

                                    {/* Terms and Conditions */}
                                    <div className="text-sm text-gray-400 mt-4 flex justify-between">
                                        <div>
                                            Your account is subject to the site <a href="#" className="text-blue-400">Terms and Conditions</a>.
                                        </div>
                                        <div>
                                            Joined {userData.joinDate} <a href="#" className="text-blue-400">Manage Account</a>
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Setting;