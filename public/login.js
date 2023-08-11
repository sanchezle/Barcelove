const loginForm = document.getElementById('login-form');
const errorMessageDiv = document.getElementById('errorMessage');

loginForm.addEventListener('submit', async (event) => {
    event.preventDefault();

    const formData = new FormData(loginForm);
    const username = formData.get('username');
    const password = formData.get('password');

    try {
        const response = await axios.post('/auth/login', { username, password });

        if (response.status === 200) {
            const token = response.data.token;
            localStorage.setItem('jwtToken', token);
            if (response.data.redirectTo) {
                window.location.href = response.data.redirectTo;
            }
        } else {
            console.error(response.data.message);
            errorMessageDiv.innerHTML = `${response.data.message}.`;
        }
    } catch (error) {
        if (error.response && error.response.data && error.response.data.message) {
            errorMessageDiv.innerHTML = `${error.response.data.message}. `;
        } else {
            console.error(error);
            errorMessageDiv.innerHTML = `An error occurred.`;
        }
    }
});
