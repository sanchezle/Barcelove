import React from 'react';
import UserDataContainer from './containers/UserDataContainer';
import UserDataPresentation from './components/UserPresentation';

const App = () => {
  return (
    <div>
      <h1>My App</h1>
      <UserDataContainer>
        {(userData) => <UserDataPresentation data={userData} />}
      </UserDataContainer>
    </div>
  );
};

export default App;
