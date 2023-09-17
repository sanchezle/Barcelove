const IndexPage = () => {
  
    const handleLogout = async () => {
      try {
        const response = await axios.post('/logout'); // Using axios for HTTP requests
        if (response.status === 200) {
          window.location.href = '/login'; // Redirect to login page after successful logout
        } else {
          console.error('Logout failed');
        }
      } catch (error) {
        console.error('Error during logout:', error);
      }
    };
  
    return (
      <div className="container" id="container">
        <h1 id="title">B A R C E L O V E &#x2764;</h1>
        <div>
          <a href="login.html">Login</a>
          <a href="register.html">Register</a>
          <button id="logout-button" onClick={handleLogout}>Logout</button>
          <a href="/profile">Profile</a>
        </div>
      </div>
    );
  };
  
  export default IndexPage;
  