import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

import Landing from "./pages/Landing";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Events from "./pages/Events";
import EventDetails from "./pages/EventDetails";
import MyEvents from "./pages/MyEvents";
import ReportIssue from "./pages/ReportIssue";
import Complaints from "./pages/Complaints";
import ComplaintDetails from "./pages/ComplaintDetails";
import Announcements from "./pages/Announcements";
import Profile from "./pages/Profile";

const ProtectedRoute = ({ children }) => {
  const isAuthenticated = localStorage.getItem("campusflow_logged_in") === "true";

  return isAuthenticated ? children : <Navigate to="/login" replace />;
};

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
        <Route path="/events" element={<ProtectedRoute><Events /></ProtectedRoute>} />
        <Route path="/events/:id" element={<ProtectedRoute><EventDetails /></ProtectedRoute>} />
        <Route path="/my-events" element={<ProtectedRoute><MyEvents /></ProtectedRoute>} />
        <Route path="/report-issue" element={<ProtectedRoute><ReportIssue /></ProtectedRoute>} />
        <Route path="/complaints" element={<ProtectedRoute><Complaints /></ProtectedRoute>} />
        <Route path="/complaints/:id" element={<ProtectedRoute><ComplaintDetails /></ProtectedRoute>} />
        <Route path="/announcements" element={<ProtectedRoute><Announcements /></ProtectedRoute>} />
        <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;