import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import '../css/lrfLayout.css'
import '../css/Dashboard.css';
import '../css/ForumPage.css';
import '../components/Footer.jsx'
import '../components/Header.jsx'

{/* AuthPages */ }
import Login from './Login.jsx';
import Register from './Register.jsx';
import ForgotPassword from './ForgotPassword.jsx';
import Profile from './Profile.jsx';

{/* Admin */ }
import AdminDashboard from './admin/AdminDashboard.jsx';
import ViewAllAlerts from './admin/Alerts/ViewAllAlerts.jsx';
import AdminAlert from './admin/Alerts/AdminAlert.jsx';
import UpdateAlert from './admin/Alerts/UpdateAlert.jsx';
import ViewAlert from './admin/Alerts/ViewAlert.jsx';
import Message from './admin/Message/Message.jsx';
import Contact from './admin/contact/Contact.jsx';
import ContactDetails from './admin/contact/ContactDetails.jsx';
import AdminTips from "./admin/tips/AdminTips.jsx";
import AdminTipDetails from "./admin/tips/AdminTipDetails.jsx";

import AmberAlert from './AmberAlert.jsx';
import UserDashboard from './UserDashboard.jsx';
import Forum from './Forum.jsx';
import ContactAuthorities from './ContactAuthorities.jsx';
import UserAlerts from './UserAlerts.jsx';
import UserAlertDetails from './UserAlertDetails.jsx';
import UserTips from './UserTips.jsx';


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>

        {/* AuthRoutes */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/profile" element={<Profile />} />

        {/* AdminRoutes */}
        <Route path="/admin-dashboard" element={<AdminDashboard />} />
        <Route path="/admin-view/all/alerts" element={<ViewAllAlerts />} />
        <Route path="/admin-alert" element={<AdminAlert />} />
        <Route path="/update-alert/:alertId/edit" element={<UpdateAlert />} />
        <Route path="/view-alert/:alertId/view" element={<ViewAlert />} />
        <Route path="/admin/message" element={<Message />} />
        <Route path="/admin/contact" element={<Contact />} />
        <Route path="/admin/contact/:id" element={<ContactDetails />} />
        <Route path="/admin/tips" element={<AdminTips />} />
        <Route path="/admin/tips/:tipId" element={<AdminTipDetails />} />

        {/* SortThisRoutesOut */}
        <Route path="/" element={<AmberAlert />} />
        <Route path="/user-dashboard" element={<UserDashboard />} />
        <Route path="/forum" element={<Forum />} />
        <Route path="/contact-authorities" element={<ContactAuthorities />} />
        <Route path="/view/all/alerts" element={<UserAlerts />} />
        <Route path="/alerts/:alertId" element={<UserAlertDetails />} />
        <Route path="/report-tip/:alertId" element={<UserTips />} />

      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
