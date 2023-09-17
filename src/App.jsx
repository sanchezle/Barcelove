import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import axios from 'axios';
import UserProfile from './containers/UserDataContainer';
import IndexPage from './components/IndexPage';
import LoginComponent from './components/LoginComponent';

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    axios.get('/api/profile')
      .then((response) => {
        setIsAuthenticated(true);
      })
      .catch((error) => {
        setIsAuthenticated(false);
      });
  }, []);

  return (
    <Router>
      <div className="App">
        <Routes>
          {/* Check authentication and redirect to login if not authenticated */}
          {!isAuthenticated && <Navigate to="/login" replace />}

          {/* Protected route */}
          <Route path="/profile" element={isAuthenticated ? <UserProfile /> : <Navigate to="/login" />} />

          {/* Login route */}
          <Route path="/login" element={<LoginComponent />} />

          {/* Other routes */}
          <Route path="/" element={<IndexPage />} />
          {/* ...other routes here... */}
        </Routes>
      </div>
    </Router>
  );
};

export default App;
