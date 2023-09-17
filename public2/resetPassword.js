document.addEventListener("DOMContentLoaded", function() {
    try {
        function getParameterByName(name, url) {
            if (!url) url = window.location.href;
            name = name.replace(/[\[\]]/g, '\\$&');
            let regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
                results = regex.exec(url);
            if (!results) return null;
            if (!results[2]) return '';
            return decodeURIComponent(results[2].replace(/\+/g, ' '));
        }

        function getTokenFromPath() {
            let pathSegments = window.location.pathname.split('/');
            return pathSegments[pathSegments.length - 1];
        }

        let token = getParameterByName('token');
    
        if (!token) {
            token = getTokenFromPath();
        }

        if (token) {
            const tokenInput = document.querySelector("input[name='token']");
            
            if (tokenInput) {
                tokenInput.value = token;
            }
        } else {
            alert("Invalid or missing token. Please use a valid reset password link.");
        }
    } catch (error) {
        console.error('Error encountered in resetPassword.js:', error);
        // Optionally redirect to an error page or show an error message.
    }
});
