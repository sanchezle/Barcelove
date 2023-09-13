import React from 'react';
import PropTypes from 'prop-types';

const UserDataPresentation = ({ data }) => {
  if (!data) {
    return 'Loading...';
  }
  
  return (
    <div>
      <h1>{data.username}</h1>
      <p>Email: {data.email}</p>
    </div>
  );
};

UserDataPresentation.propTypes = {
  data: PropTypes.object,
};

export default UserDataPresentation;
