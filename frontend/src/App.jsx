import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SignupPage from "./components/signupPage/SignupPage";
import LoginPage from "./components/loginPage/LoginPage";
import Layout from "./Layout";
import ChessHomePage from "./components/home/Home";
import ChessLandingPage from "./components/chessLandingPage/ChessLandingPage";

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
          </Route>
        ) : (
          <Route path="/*" element={<ChessLandingPage />} />
        )}
      </Routes>
    </Router>
  );
}

export default App;
