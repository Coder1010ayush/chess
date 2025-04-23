import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ChessLandingPage from "./components/chessLandingPage/ChessLandingPage";
import SignupPage from "./components/signupPage/SignupPage";
import Layout from "./Layout";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="signup" element={<SignupPage />} />

        <Route path="/" element={<Layout />}>
          <Route index element={<ChessLandingPage />} />
          {/* <Route path="signup" element={<SignupPage />} /> */}
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
