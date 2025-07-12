import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useContext } from 'react';

import Home from './pages/Home';
import Login from './pages/Login';
import Profile from './pages/Profile';
import MyRequests from './pages/MyRequests';
import CreateRequest from './pages/CreateRequest';
import SwapRequest from './pages/SwapRequest';

import { AuthContext } from './context/AuthContext';

// Simple private route wrapper
const PrivateRoute = ({ children }) => {
  const { user } = useContext(AuthContext);
  return user ? children : <Navigate to="/login" replace />;
};

const App = () => {
  return (
    <Router>
      <Routes>
        {/* ✅ Public route */}
        <Route path="/" element={<Home />} />

        {/* ✅ Public route */}
        <Route path="/login" element={<Login />} />

        {/* ✅ Protected routes */}
        <Route
          path="/profile"
          element={
            <PrivateRoute>
              <Profile />
            </PrivateRoute>
          }
        />
        <Route
          path="/create-request"
          element={
            <PrivateRoute>
              <CreateRequest />
            </PrivateRoute>
          }
        />
        <Route
          path="/my-requests"
          element={
            <PrivateRoute>
              <MyRequests />
            </PrivateRoute>
          }
        />
        <Route
          path="/swap/:userId"
          element={
            <PrivateRoute>
              <SwapRequest />
            </PrivateRoute>
          }
        />

        {/* fallback route */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
};

export default App;
