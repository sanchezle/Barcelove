const loginForm = document.getElementById('login-form');

loginForm.addEventListener('submit', async (event) => {
  event.preventDefault();

  const formData = new FormData(loginForm);
  const username = formData.get('username');
  const password = formData.get('password');

  try {
    // Make the login request to the server
    const response = await axios.post('/auth/login', { username, password });

    // Extract the token from the response
    const token = response.data.token;

    // Save the token in local storage or cookie (client-side storage)
    localStorage.setItem('jwtToken', token);

    // Redirect to the page specified in the server's response
    window.location.href = response.data.redirectTo;
  } catch (error) {
    // Handle login error, e.g., show an error message on the login form
    console.error(error);
  }
});

