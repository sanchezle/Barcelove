import React, { useEffect, useState } from 'react';

const UserProfile = () => {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    // Fetch user data from /api/profile
    fetch('/api/profile', {
      headers: {
        'Authorization': 'your-jwt-token-here',  // Include JWT token here if you are using JWT for authentication
      }
    })
    .then(res => res.json())
    .then(data => setUserData(data))
    .catch(error => console.error('Error fetching data:', error));
  }, []); // Empty dependency array means this useEffect runs once when the component mounts

  if (!userData) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>{userData.username}'s Profile</h1>
      <img src={userData.profilePicture} alt={`${userData.username}'s profile`} />
      <p>Email: {userData.email}</p>
      <p>Profile Info: {userData.profile}</p>
      <p>Description: {userData.description}</p>
    </div>
  );

};

export default UserProfile;

