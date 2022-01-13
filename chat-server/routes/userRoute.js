const { Router } = require('express');
const router = Router();
const User = require('../models/User');
const bcyrpt = require('bcrypt');
const jwt = require('jsonwebtoken');

router.post('/login', async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(404).json({
                message: "No user found."
            });
        }
        const passwordCheck = await bcyrpt.compare(password, user.password);
        if (!passwordCheck) {
            return res.status(401).json({
                message: 'wrong password'
            });
        }
        const token = await jwt.sign(
            { username },
            process.env.JWT_SECRET
        );

        return res.status(200).json({
            id: user._id,
            username: user.username,
            avatar: user.avatar,
            chat: user.chats,
            token,
        })
    }
    catch (error) {
        res.status(500).json({
            message: "Error occured during login",
            error
        });
        console.log(error);
    }
});

router.post('/signup', async (req, res) => {
    try {

        const { username, password } = req.body;

        const userExist = await User.findOne({ username });
        if (userExist) {
            return res.status(409).json({
                message: "username already in use."
            });
        }
        const passwordHash = await bcyrpt.hash(password, 10);
        const newUser = await new User({
            username,
            password: passwordHash
        }).save();

        const token = await jwt.sign(
            { username },
            process.env.JWT_SECRET
        );
        return res.status(200).json({
            id: newUser._id,
            username: newUser.username,
            avatar: newUser.avatar,
            chats: newUser.chats,
            token,
        })
    }
    catch (error) {
        res.status(500).json({
            message: "Error occured during signup",
            error
        });
        console.log(error);
    }
})

module.exports = router;