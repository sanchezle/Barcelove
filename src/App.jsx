import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import UserRouter from './userRoute';  // Assuming UserRouter.js is in the same directory

const App = () => {
  return (
    <Router>
      <Switch>
        {/* other routes */}
        <Route path="/profile" component={UserRouter} />
      </Switch>
    </Router>
  );
};

export default App;
