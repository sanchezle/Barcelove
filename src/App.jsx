import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import UserRouter from './userRoute';
import UserProfile from './components/UserProfile'; // Assuming UserProfile.jsx is in the /components directory

const App = () => {
  return (
    <Router>
      <Switch>
        {/* other routes */}
        <Route path="/profile" component={UserProfile} /> 
      </Switch>
    </Router>
  );
};

export default App;
