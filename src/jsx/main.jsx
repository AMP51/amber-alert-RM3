import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import '../css/lrfLayout.css'
import '../css/Dashboard.css';
import '../css/ForumPage.css';
import '../components/Footer.jsx'
import '../components/Header.jsx'

import AmberAlert from './AmberAlert.jsx';
import Login from './Login.jsx';
import Register from './Register.jsx';
import ForgotPassword from './ForgotPassword.jsx';
import AdminDashboard from './AdminDashboard.jsx';
import UserDashboard from './UserDashboard.jsx';
import CreateAnAlert from './CreateAnAlert.jsx';
import Profile from './Profile.jsx';
import Forum from './Forum.jsx';
import ReportingTip from './ReportingTip.jsx';
import ContactAuthorities from './ContactAuthorities.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AmberAlert />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/admin-dashboard" element={<AdminDashboard />} />
        <Route path="/user-dashboard" element={<UserDashboard />} />
        <Route path="/create-an-alert" element={<CreateAnAlert />} />
        <Route path="/forum" element={<Forum />} />
        <Route path="/reporting-tip" element={<ReportingTip />} />
        <Route path="/contact-authorities" element={<ContactAuthorities />} />


      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
