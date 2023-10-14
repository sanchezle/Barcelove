import React, { useState, useEffect } from 'react';
import defaultAvatar from '../assets/avatardefault_.png';

function ProfilePicture() {
  const [profilePicture, setProfilePicture] = useState(defaultAvatar);



useEffect(() => {
  const fetchProfilePicture = async () => {
      try {
          const response = await fetch('/api/profile');
          const data = await response.json();

          // Adding the conditional check here
          if (data && data.profile && data.profile.picture) {
              setProfilePicture(data.profile.picture);
          }
      } catch (error) {
          console.error('Failed to fetch profile picture:', error);
      }
  };

    fetchProfilePicture();
}, []);


  const handlePictureChange = async (e) => {
    const file = e.target.files[0];
    const base64 = await toBase64(file);

    await updateProfilePicture(base64);
  };

  const toBase64 = (file) => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });

  const updateProfilePicture = async (base64Image) => {
    try {
      const response = await fetch('/api/profile/picture', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ newPictureBase64: base64Image }),
      });

      const data = await response.json();

      if (data.message === 'Profile picture updated') {
        setProfilePicture(base64Image);
      }
    } catch (error) {
      console.error('Failed to update profile picture:', error);
    }
  };

  return (
    <div style={{ position: 'relative' }}>
      <img src={profilePicture} alt="Profile" style={{ width: '100px', height: '100px' }} />
      <input type="file" accept="image/*"
        style={{ position: 'absolute', bottom: 0, right: 0, opacity: 0 }}
        onChange={handlePictureChange}
      />
      <button 
        style={{ position: 'absolute', bottom: 0, right: 0 }}
        onClick={() => document.querySelector('input[type="file"]').click()}
      >
        Edit
      </button>
    </div>
  );
}

export default ProfilePicture;
