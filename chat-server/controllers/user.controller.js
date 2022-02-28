const { Router } = require('express');
const router = Router();
const bcyrpt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { NotFoundError, UnauthorizedError, InternalServerError } = require('../utils/error');
const { OKSuccess, CreatedSuccess } = require('../utils/success');
const chatService = require('../services/chat.service');


router.post('/login', async (req, res) => {
    try {
        const { username, password } = req.body;

        const user =  await chatService.getUser({ username });
        if (!user) res.status(401).send(new UnauthorizedError('Unable to login. Wrong email or password'))
        console.log(user)
        // const passwordCheck = await bcyrpt.compare(password, user.password);
        // if (!passwordCheck) res.status(401).send(new UnauthorizedError('Unable to login. Wrong email or password'))

        const token = jwt.sign(
            { username },
            process.env.JWT_SECRET
        );
        res.send(new OKSuccess('Logged in successfully.', token))

    }
    catch (error) {
        console.log(error)
        res.status(500).send(new InternalServerError(error.message))
    }

});


router.post('/register', async (req, res) => {
    try {

        const { username, password } = req.body;

        const userExist = await chatService.getUser({ username });
        if (userExist) return res.status(409).send(new ConflictError('username already exists.'))

        const passwordHash = await bcyrpt.hash(password, 10);
        
        const newUser = await chatService.saveUser({ username, password: passwordHash});

        const token = jwt.sign(
            { username },
            process.env.JWT_SECRET
        );
        return res.status(201).send(new OKSuccess('Logged in successfully.', token))
    }
    catch (error) {
        res.status(500).send(new InternalServerError(error.message))
        console.log(error);
    }
})

module.exports = router;