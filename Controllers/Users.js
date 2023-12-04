const userModels = require('../Models/Users');
require('dotenv').config();
const jwt = require('jsonwebtoken');


// make algorithm login models (username password))
const login = async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await userModels.findOne({
            where: {
                username: username,
                password: password
            }
        });
        if (user) {
            const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: '30d' });
            res.status(200).json({
                status: 200,
                message: "Login successful",
                data: {
                    username: user.username,
                    token: token
                }
            });
        } else {
            res.status(400).json({
                status: 400,
                message: "Login failed"
            });
        }
    } catch (error) {
        res.status(500).json({
            status: 500,
            message: "Internal server error",
            error: error
        });
    }
}

// make algorithm signup models (username password))
const signup = async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await userModels.create({
            username: username,
            password: password
        });
        if (user) {
            res.status(200).json({
                status: 200,
                message: "Signup success",
                data: user
            });
        } else {
            res.status(400).json({
                message: "Signup failed",
            });
        }
    } catch (error) {
        if (error.name === 'SequelizeUniqueConstraintError') {
            res.status(400).json({
                message: "Username already exists",
            });
        } else {
            res.status(500).json({
                message: "Internal server error",
                error: error
            });
        }
    }
}

module.exports = {
    login,
    signup
}