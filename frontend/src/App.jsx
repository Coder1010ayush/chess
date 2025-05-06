import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SignupPage from "./components/signupPage/SignupPage";
import LoginPage from "./components/loginPage/LoginPage";
import Layout from "./Layout";
import ChessHomePage from "./components/home/Home";
import ChessLandingPage from "./components/chessLandingPage/ChessLandingPage";
import ChessBox from "./components/chessBox/ChessBox";
import Settings from "./components/settings/Setting";

function App() {
  const [userLoggedIn, setUserLoggedIn] = useState(false);

  return (
    <Router>
      <Routes>
        <Route path="/signup" element={<SignupPage setUserLoggedIn={setUserLoggedIn} />} />
        <Route path="/login" element={<LoginPage setUserLoggedIn={setUserLoggedIn} />} />

        {userLoggedIn ? (
          <Route path="/" element={<Layout userLoggedIn={userLoggedIn} />}>
            <Route index element={<ChessHomePage />} />
            <Route path="play/human-vs-human" element={<ChessBox />} />
            <Route path="play/human-vs-ai" element={<ChessBox />} />
            <Route path="play/ai-vs-ai" element={<ChessBox />} />
            <Route path="settings" element={<Settings />} />
          </Route>
        ) : (
          <Route path="/*" element={<ChessLandingPage />} />
        )}
      </Routes>
    </Router>
  );
}

export default App;
