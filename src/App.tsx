import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AppProvider, useAppContext } from './context/AppContext';
import MainLayout from './layouts/MainLayout';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Profile from './pages/Profile';
import QRID from './pages/QRID';
import Journey from './pages/Journey';
import Ministries from './pages/Ministries';
import HeartLink from './pages/HeartLink';
import ISU from './pages/ISU';
import Attendance from './pages/Attendance';
import Events from './pages/Events';
import AdminDashboard from './pages/AdminDashboard';
import AdminAttendance from './pages/AdminAttendance';
import AdminCRM from './pages/AdminCRM';
import CRM from './pages/CRM';

const ProtectedRoute = ({ children, allowedRoles }: { children: React.ReactNode, allowedRoles?: string[] }) => {
  const { currentUser } = useAppContext();
  
  if (!currentUser) {
    return <Navigate to="/login" replace />;
  }
  
  if (allowedRoles && !allowedRoles.includes(currentUser.role)) {
    return <Navigate to="/dashboard" replace />;
  }
  
  return <>{children}</>;
};

function AppRoutes() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        
        <Route path="/" element={<ProtectedRoute><MainLayout /></ProtectedRoute>}>
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="profile" element={<Profile />} />
          <Route path="qr" element={<QRID />} />
          <Route path="journey" element={<Journey />} />
          <Route path="ministries" element={<Ministries />} />
          <Route path="heartlink" element={<HeartLink />} />
          <Route path="isu" element={<ISU />} />
          <Route path="attendance" element={<Attendance />} />
          <Route path="events" element={<Events />} />
          <Route path="crm" element={<ProtectedRoute><CRM /></ProtectedRoute>} />
          <Route path="admin" element={<ProtectedRoute allowedRoles={['Admin', 'Pastor', 'Inner Core']}><AdminDashboard /></ProtectedRoute>} />
          <Route path="admin/attendance" element={<ProtectedRoute allowedRoles={['Admin', 'Pastor', 'Inner Core']}><AdminAttendance /></ProtectedRoute>} />
          <Route path="admin/crm" element={<ProtectedRoute allowedRoles={['Admin', 'Pastor', 'Inner Core']}><AdminCRM /></ProtectedRoute>} />
        </Route>
      </Routes>
    </Router>
  );
}

export default function App() {
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark' || (!savedTheme)) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, []);

  return (
    <AppProvider>
      <AppRoutes />
    </AppProvider>
  );
}
