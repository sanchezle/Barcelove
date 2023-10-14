import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Username() {
    const [username, setUsername] = useState('');
    const [newUsername, setNewUsername] = useState(''); // For the new username
    const [showUpdateField, setShowUpdateField] = useState(false);
    const [errorMessage, setErrorMessage] = useState(''); // To display errors

    useEffect(() => {
        axios.get('/username')
            .then(response => {
                setUsername(response.data.username);
            })
            .catch(error => {
                console.error("Error fetching username:", error);
            });
    }, []);

    const handleUsernameUpdate = () => {
        axios.put('/username', { username: newUsername })
            .then(response => {
                setUsername(response.data.username);
                setShowUpdateField(false); // Hide the input field after updating
            })
            .catch(error => {
                console.error("Error updating username:", error);
                if (error.response && error.response.data && error.response.data.message) {
                    setErrorMessage(error.response.data.message); // Display the error from server
                } else {
                    setErrorMessage('An error occurred while updating the username.');
                }
            });
    };

    return (
        <div>
            <h1>{username.username}</h1>
            {errorMessage && <div style={{ color: 'red' }}>{errorMessage}</div>}
            <button onClick={() => setShowUpdateField(!showUpdateField)}>Update Username</button>
            
            {showUpdateField && (
                <div>
                    <input
                        type="text"
                        placeholder="Enter new username"
                        value={newUsername}
                        onChange={e => setNewUsername(e.target.value)}
                    />
                    <button onClick={handleUsernameUpdate}>Save</button>
                </div>
            )}
        </div>
    );
}

export default Username;
