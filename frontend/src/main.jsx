import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import Setting from './components/settings/setting.jsx'
import Home from './components/home/Home.jsx'
import Sidebar from './components/sidebar/Sidebar.jsx'
import ChessLandingPage from './components/chessLandingPage/ChessLandingPage.jsx'
import ChessBox from './components/chessBox/ChessBox.jsx'
import SignupPage from './components/signupPage/SignupPage.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
    {/* <Setting /> */}
    {/* <Home /> */}
    {/* <Sidebar /> */}
    {/* <ChessLandingPage /> */}
    {/* <ChessBox /> */}
    {/* < SignupPage /> */}
  </StrictMode>,
)
