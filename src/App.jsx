import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import UserProfile from './components/UserProfile'; // Assuming UserProfile.jsx is in the /components directory

const App = () => {
  return (
    <Router>
      <Routes>
        {/* other routes */}
        <Route path="/profile" component={UserProfile} /> 
      </Routes>
    </Router>
  );
};

export default App;