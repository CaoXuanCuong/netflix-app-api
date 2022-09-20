// import jwt from 'jsonwebtoken';
// import * as argon2 from 'argon2';
// import User from '../models/User.js';

const jwt = require('jsonwebtoken');
const argon2 = require('argon2');
const User = require('../models/User');

class AuthController {
    // [GET] /user
    async getUser(req, res) {
        try {
            const user = await User.findById(req.userId).select('-password -role');
            if (user) {
                return res.status(200).json({
                    success: true,
                    user,
                });
            } else {
                return res.status(400).json({
                    success: false,
                    message: 'User not found',
                });
            }
        } catch (error) {
            return res.status(500).json({
                success: false,
                message: 'Internal server error',
            });
        }
    }

    // [POST] /register
    async register(req, res) {
        const { fullname, email, password } = req.body;

        if (!email || !password || !fullname) {
            return res.status(400).json({
                success: false,
                message: 'Mising parameters !!!',
            });
        }

        try {
            const existEmail = await User.findOne({ email });
            if (existEmail) { 
                return res.status(400).json({
                    success: false,
                    message: 'Email address is already registered',
                });
            }

            const hashPassword = await argon2.hash(password);

            const newUser = new User({
                fullname,
                email,
                password: hashPassword,
                avatar: 'https://res.cloudinary.com/api-media/image/upload/v1662806808/MovieApp/default/user-default_tntbwe.jpg',
            });

            await newUser.save();

            const accessToken = jwt.sign(
                {
                    userId: newUser._id,
                },
                process.env.ACCESS_TOKEN_SECRET,
                { expiresIn: 60 * 60 * 24 },
            );

            return res.status(203).json({
                success: true,
                message: 'Register success !!!',
                accessToken,
            });
        } catch (error) {
            console.log(error);
            return res.status(500).json({
                success: false,
                message: 'Register failed !!!',
            });
        }
    }

    // [POST] /login
    async login(req, res) {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: 'Mising parameters !!!',
            });  
        }

        try {
            const verifyEmail = await User.findOne({ email });
            if (!verifyEmail) {
                return res.status(400).json({
                    success: false,
                    message: 'User not found!!!',
                });
            }

            const verifyPassword = await argon2.verify(verifyEmail.password, password);

            if (!verifyPassword) {
                return res.status(400).json({
                    success: false,
                    message: 'Password was wrong !!!',
                });
            }

            const accessToken = jwt.sign(
                {
                    userId: verifyEmail._id,
                },
                process.env.ACCESS_TOKEN_SECRET,
                { expiresIn: 60 * 60 * 24 },
            );

            return res.status(200).json({
                success: true,
                message: 'Login success !!!',
                accessToken,
            });
        } catch (error) {
            console.log(error);
            return res.status(500).json({
                success: false,
                message: 'Login failed !!!',
            });
        }
    }
}

// export default new AuthController();
module.exports = new AuthController();