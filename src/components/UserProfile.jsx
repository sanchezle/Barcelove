// Inside your App.jsx or Profile component file
import React, { useEffect, useState } from 'react';

function Profile(props) {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    fetch('/api/profile')  // replace with your actual API endpoint
      .then(response => response.json())
      .then(data => setUserData(data))
      .catch(error => console.error('There was an error fetching user data:', error));
  }, []); // The empty dependency array ensures this runs once when the component mounts

  if (!userData) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <h1>{userData.username}</h1>
      <img src={userData.profile.picture} alt="Profile" />
      <p>{userData.profile.description}</p>
    </div>
  );
}

export default Profile;
