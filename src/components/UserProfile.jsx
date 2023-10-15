import React from 'react';
import ProfilePicture from './ProfilePic.jsx';  // Import the external ProfilePic component
import './UserProfile.css';

const UserProfile = ({ avatar, name, username, bio, location, isOwner }) => {
    return (
        <div className="user-profile">
            <ProfilePicture avatar={avatar} />  
            <ProfileInfo name={name} username={username} bio={bio} location={location} />
           
        </div>
    );
}
const ProfileInfo = ({ name, username, bio, location }) => {
    return (
        <div className="profile-info">
            <h1 className="profile-name">{name}</h1>
            <h2 className="profile-username">@{username}</h2>
            <p className="profile-bio">{bio}</p>
            <p className="profile-location">{location}</p>
            <ProfileActions />
        </div>
    );
}


const ProfileActions = () => {
    return (
        <div className="profile-actions">
            <button className="profile-button">Edit Profile</button>
        </div>
    );
}

export default UserProfile;
