import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ChessLandingPage from "./components/chessLandingPage/ChessLandingPage";
import Layout from "./Layout";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<ChessLandingPage />} /> {/* default route under Layout */}
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
