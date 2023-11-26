const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config();

const TOKEN_KEY = process.env.TOKEN_KEY;

const handleUserSignup = async (req, res) => {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
        return res.status(400).json({ status: 'error', message: 'All input is required' });
    }

    const oldUser = await User.findOne({ email })
    if (oldUser)
        return res.status(409).json({ status: 'error', message: 'User Already Exists' });

    const encryptedUserPassword = await bcrypt.hash(password, 10);

    try {
        await User.create({
            name,
            email,
            password: encryptedUserPassword,
        });
        return res.status(201).json({ status: 'ok', message: 'User registered successfully' });
    } catch (error) {
        return res.status(500).json({ status: 'error', message: 'Some error occurred', error });
    }
}


const handleUserLogin = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });

        if (!user)
            return res.json({ status: 'error', message: 'User Not Found' });

        if (await bcrypt.compare(password, user.password)) {
            const token = jwt.sign({ email: user.email }, TOKEN_KEY);
            return res.json({ status: 'ok', data: token });
        }
        return res.json({ status: 'error', message: 'Invalid credentials' });
    } catch (error) {
        return res.status(500).json({ status: 'error', message: 'Some error occurred', error });
    }
}

const getUserData = async (req, res) => {
    const token = req.header('Authorization').replace('Bearer ', '');

    if (!token)
        return res.status(401).json({ status: 'error', message: 'Access denied. JWT must be provided.' });

    try {
        const user = jwt.verify(token, TOKEN_KEY);
        const userEmail = user.email;
        const userData = await User.findOne({ email: userEmail });

        if (userData)
            res.json({ status: 'ok', data: userData });
        else
            res.json({ status: 'error', message: 'User data not found.' });

    } catch (err) {
        res.status(401).json({ status: 'error', message: 'Invalid JWT.', error: err.message });
    }
};

module.exports = {
    handleUserSignup,
    handleUserLogin,
    getUserData
}