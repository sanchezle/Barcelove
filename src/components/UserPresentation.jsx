import React from 'react';
import PropTypes from 'prop-types';

const UserDataPresentation = ({ data }) => {
  if (!data) {
    return 'Loading...';
  }
  
  return (
    <div>
      <h1>Hello {data.username}</h1>
      <h1>Email: {data}</h1>
    </div>
  );
};

UserDataPresentation.propTypes = {
  data: PropTypes.object,
};

export default UserDataPresentation;
