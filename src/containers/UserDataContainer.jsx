import React, { useState, useEffect } from 'react';

const UserDataContainer = ({ children }) => {
  const [userData, setUserData] = useState(null);

  // Simulating fetching user data
  useEffect(() => {
    fetch('/api/profile')
      .then((response) => response.json())
      .then((data) => setUserData(data))
      .catch((error) => console.error('Error fetching user data:', error));
  }, []);

  // Call the child function and pass the user data
  return children(userData);
};

export default UserDataContainer;
