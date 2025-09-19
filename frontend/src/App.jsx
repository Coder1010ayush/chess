import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SignupPage from "./components/signupPage/SignupPage";
import LoginPage from "./components/loginPage/LoginPage";
import Layout from "./Layout";
import ChessHomePage from "./components/home/Home";
import ChessLandingPage from "./components/chessLandingPage/ChessLandingPage";
import ChessBox from "./components/chessBox/ChessBox";
import Settings from "./components/settings/Setting";
import { ThemeProvider } from "./themecontext/ThemeContext";
import { ThemeWrapper } from "./components/ThemeWrapper";
import { useUser } from "./context/UserContext";  // ✅ import context

function App() {
  const { user, loading } = useUser(); // ✅ read user from context

  if (loading) {
    return <div className="text-center text-white p-6">Loading...</div>; // prevent flicker
  }

  return (
    <ThemeProvider>
      <ThemeWrapper>
        <Router>
          <Routes>
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/login" element={<LoginPage />} />

            {user ? ( // ✅ if user exists, show home layout
              <Route path="/" element={<Layout />}>
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
      </ThemeWrapper>
    </ThemeProvider>
  );
}

export default App;
