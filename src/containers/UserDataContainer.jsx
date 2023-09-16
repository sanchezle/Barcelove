import React, { useState, useEffect } from 'react';

export default function UserDataContainer() {
  const [userData, setUserData] = useState({});

  useEffect(() => {
    fetch('/api/profile')
      .then(response => response.json())
      .then(data => {
        setUserData(data);
      })
      .catch(error => {
        console.log(error);
      });
  }, []);

  return (
    <UserDataPresentational userData={userData} />
  );
}

function UserDataPresentational({ userData }) {
  return (
    <div>
      <h2>{userData.username}</h2>
      <p>{userData.email}</p>
      <img src={userData.picture} alt="Profile Picture" />
      <p>{userData.description}</p>
    </div>
  );
}



// Path: barcelove/src/containers/UserDataContainer.jsx