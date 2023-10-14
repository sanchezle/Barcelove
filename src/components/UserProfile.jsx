import React, { useState, useEffect } from 'react';
import ProfilePic from './ProfilePic';  // Make sure to adjust the import to your file structure
import Username from './Username';

import './UserProfile.css'; // Importing the CSS


export default function UserProfile() {
  const [userData, setUserData] = useState({});

  useEffect(() => {
    // Fetch current profile data from /api/profile
    fetch('/api/profile')
      .then((response) => response.json())
      .then((data) => {
        setUserData(data);
      })
      .catch((error) => {
        console.error('Error fetching user data:', error);
      });
  }, []);

  return (
    <div>
      <Username />
      <h2>{userData.email}</h2>
      <p>{userData.description}</p>
      <ProfilePic />
    </div>
  );
}

