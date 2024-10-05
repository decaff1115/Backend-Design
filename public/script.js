const API_URL = 'http://localhost:3000/api/users'; 

// Function to register a new user
async function register() {
    const username = document.getElementById('register-username').value;
    const password = document.getElementById('register-password').value;
    const email = document.getElementById('register-email').value;

    try {
        // Send POST request to register the user
        const response = await fetch(`${API_URL}/register`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password, email })
        });

        const data = await response.json();
        alert(data.message); 
    } catch (error) {
        console.error('Error during registration:', error);
        alert('Registration failed. Please try again.'); 
    }
}

// Function to log in an existing user
async function login() {
    const username = document.getElementById('login-username').value;
    const password = document.getElementById('login-password').value;

    try {
        // Send POST request to log in the user
        const response = await fetch(`${API_URL}/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password })
        });

        if (response.ok) {
            const data = await response.json();
            localStorage.setItem('token', data.token); // Store the JWT token
            alert('Login successful!'); 
            console.log('Login successful, token:', data.token);
            document.getElementById('register-section').style.display = 'none'; // Hide registration section
            getUserProfile(); 
        } else {
            const errorData = await response.json();
            alert(`Login failed: ${errorData.message}`); 
            console.error('Login failed:', errorData);
        }
    } catch (error) {
        console.error('Error during login:', error);
        alert('An error occurred. Please try again.'); 
    }
}

// Function to retrieve and display the user profile
async function getUserProfile() {
    const token = localStorage.getItem('token'); // Retrieve token from local storage

    // Send GET request to fetch user profile
    const response = await fetch(`${API_URL}/profile`, {
        method: 'GET',
        headers: { 'Authorization': token }
    });

    if (response.ok) {
        const user = await response.json();
        // Display user profile information
        document.getElementById('profile-data').innerHTML = `
            <p><strong>Username:</strong> ${user.username}</p>
            <p><strong>Email:</strong> ${user.email}</p>
            <p><strong>User ID:</strong> ${user.id}</p>
        `;
        document.getElementById('login-section').style.display = 'none'; // Hide login section
        document.getElementById('profile-section').style.display = 'block'; // Show profile section
    } else {
        console.error('Failed to fetch profile:', await response.json());
        alert('Failed to fetch profile. Please log in again.'); 
    }
}

// Function to log out the user
function logout() {
    localStorage.removeItem('token'); // Remove token from local storage
    document.getElementById('profile-section').style.display = 'none'; 
    document.getElementById('login-section').style.display = 'block'; 
    document.getElementById('register-section').style.display = 'block'; 
}
