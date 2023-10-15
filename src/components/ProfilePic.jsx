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

    return (
        <div>
            <img className="avatar" src={profilePicture} alt="Profile" style={{ width: '100px', height: '100px', }} />
        </div>
    );
}

export default ProfilePicture;

