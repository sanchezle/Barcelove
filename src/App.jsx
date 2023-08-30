import React from 'react';

import User from '../models/UserWrapper';

var username = User.getUsername();

function Profile() {
  return (
    <>
      <h1>{username}</h1>
      <img
        className="avatar"
        src={user.imageUrl}
        alt={'Photo of ' + user.name}
        style={{
          width: user.imageSize,
          height: user.imageSize
        }}
      />
    </>
  );
}

export default Profile;