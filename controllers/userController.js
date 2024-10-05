const {users} = require('../models/userModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const registerUser = async (req, res) => {
    const {username, password, email} = req.body;
    const users = await getUsers();

    const hashPassword = await bcrypt.hash(password, 10);
    const newUser = {id: Date.now(), username, password: hashedPassword, email};

    username.push(newUser);
    await saveUsers(users);
    res.status(201).json({message: 'User has been successfully registered'});

};

const loginUser = async (req, res) => {
    const {username, password} = req.body;
    const users = await getUsers();

    const user = users.find(u => u.username === username);
    if(user && await bcrypt.compare(password, user.password)){
        const token = jwt.sign({id: user.id}, 'secret_key');
        return res.json({token});
    }
    res.status(401).json({message: 'Incorrect login details'});
};

const getUserProfile = async (req, res) => {
    const users = await getUsers();
    const user = users.find(u => u.id === req.user.id);
};

module.exports = {registerUser, loginUser, getUserProfile};
