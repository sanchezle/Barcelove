// Example client-side code (assuming you have an HTML form with id="login-form")
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

    // Redirect to /index page after successful login
    window.location.href = '/index';
  } catch (error) {
    // Handle login error, e.g., show an error message on the login form
    console.error(error);
  }
});
