import React, { useState } from 'react';
import axios from 'axios';

const UserProfile = ({ user }) => {
  const [formData, setFormData] = useState({
    name: user.profile.name,
    description: user.profile.description,
    picture: user.profile.picture || 'defaultAvatar1.jpg'
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (field) => {
    try {
      const response = await axios.put(`/api/user/${user._id}/update`, {
        [field]: formData[field],
      });
      if (response.status === 200) {
        alert("Update successful");
      } else {
        alert("Update failed");
      }
    } catch (error) {
      console.error("There was an error updating the user", error);
    }
  };

  return (
    <div>
      <h1>{formData.name}</h1>
      <img src={formData.picture} alt="User Avatar" />
      <p>{formData.description}</p>
      
      {/* Update Name */}
      <form onSubmit={(e) => { e.preventDefault(); handleSubmit('name'); }}>
        <input type="text" name="name" value={formData.name} onChange={handleInputChange} />
        <button type="submit">Update Name</button>
      </form>
      
      {/* Update Description */}
      <form onSubmit={(e) => { e.preventDefault(); handleSubmit('description'); }}>
        <input type="text" name="description" value={formData.description} onChange={handleInputChange} />
        <button type="submit">Update Description</button>
      </form>
      
      {/* Update Picture */}
      <form onSubmit={(e) => { e.preventDefault(); handleSubmit('picture'); }}>
        <input type="text" name="picture" value={formData.picture} onChange={handleInputChange} />
        <button type="submit">Update Picture</button>
      </form>
    </div>
  );
};

export default UserProfile;
