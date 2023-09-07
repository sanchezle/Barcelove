import React, { useEffect, useState } from 'react';

function Profile(props) {
  const [userData, setUserData] = useState(null);
  const [loadingError, setLoadingError] = useState(false);

  useEffect(() => {
    fetch('/api/profile')
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        console.log('Data fetched:', data);
        setUserData(data);
      })
      .catch(error => {
        console.error('There was an error fetching user data:', error);
        setLoadingError(true);
      });
  }, []);

  if (loadingError) {
    return <p>There was an error loading the profile.</p>;
  }

  if (!userData) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <h1>{userData.username}</h1>
      
      {userData.picture ? (
        <img src={userData.picture} alt="Profile" />
      ) : (
        <p>No profile picture available.</p>
      )}

      {userData.description ? (
        <p>{userData.description}</p>
      ) : (
        <p>No profile description available.</p>
      )}
    </div>
  );
}

export default Profile;
