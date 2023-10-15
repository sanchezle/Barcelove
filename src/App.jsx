// App.jsx
import React, { useState, useEffect } from 'react';
import UserProfile from './components/UserProfile';

export default function App() {
    const [userData, setUserData] = useState({});

    useEffect(() => {
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
        <UserProfile 
            avatar={userData.avatar}
            name={userData.name}
            username={userData.username}
            bio={userData.bio}
            location={userData.location}
            isOwner={userData.isOwner}
        />
    );
}
