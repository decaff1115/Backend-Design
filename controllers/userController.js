const { getUsers, saveUsers } = require('../models/userModel'); 
const bcrypt = require('bcryptjs'); 
const jwt = require('jsonwebtoken'); 

// Register a new user
const registerUser = async (req, res) => {
    const { username, password, email } = req.body; 
    const users = getUsers(); 

    // Check if the username is already taken
    if (users.find(user => user.username === username)) {
        return res.status(400).json({ message: 'Username already exists' });
    }

    // Hash the password for secure storage
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = { id: Date.now(), username, password: hashedPassword, email }; // Create new user object

    users.push(newUser); // Add new user to the list
    saveUsers(users); // Save the updated user list
    res.status(201).json({ message: 'User registered successfully' });
};

// Log in an existing user
const loginUser = async (req, res) => {
    const { username, password } = req.body; 
    const users = getUsers(); 

    // Find user by username
    const user = users.find(u => u.username === username);
    // Validate password and generate a token if successful
    if (user && await bcrypt.compare(password, user.password)) {
        const token = jwt.sign({ id: user.id }, 'secret_key'); // Create JWT
        return res.json({ token }); 
    }
    res.status(401).json({ message: 'Invalid credentials' }); 
};

// Retrieve user profile
const getUserProfile = async (req, res) => {
    const users = getUsers(); 
    // Find the user by ID from the token
    const user = users.find(u => u.id === req.user.id);
    res.json(user); 
};

module.exports = { registerUser, loginUser, getUserProfile }; 
