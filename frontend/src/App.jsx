import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ChessLandingPage from "./components/chessLandingPage/ChessLandingPage";
import SignupPage from "./components/signupPage/SignupPage";
import LoginPage from "./components/loginPage/LoginPage";
import Layout from "./Layout";
import ChessHomePage from "./components/home/Home";

function App() {
  const [userLoggedIn, setUserLoggedIn] = useState(false); // Manage auth state

  return (
    <Router>
      <Routes>
        <Route path="signup" element={<SignupPage setUserLoggedIn={setUserLoggedIn} />} /> {/* Pass login handler */}
        <Route path="login" element={<LoginPage setUserLoggedIn={setUserLoggedIn} />} /> {/* Pass login handler */}

        {/* For unauthenticated users, show the ChessLandingPage */}
        <Route path="/" element={userLoggedIn ? <Layout userLoggedIn={userLoggedIn} setUserLoggedIn={setUserLoggedIn} /> : <ChessLandingPage />} >
          <Route index element={<ChessHomePage />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
