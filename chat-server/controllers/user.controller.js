const { Router } = require('express');
const router = Router();
const bcyrpt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { UnauthorizedError, InternalServerError, NotFoundError } = require('../utils/error');
const { OKSuccess } = require('../utils/success');
const userService = require('../services/user.service');
const authenticate = require('../middleware/authenticate');


router.post('/login', async (req, res) => {
    try {
        const { username, password } = req.body;

        const user = await userService.getUser({ username });
        if (!user) return res.status(401).send(new UnauthorizedError('Unable to login. Wrong email or password'))


        const passwordCheck = await bcyrpt.compare(password, user.password);
        if (!passwordCheck) return res.status(401).send(new UnauthorizedError('Unable to login. Wrong email or password'))

        const token = jwt.sign(
            { username },
            process.env.JWT_SECRET
        );
        return res.send(new OKSuccess('Logged in successfully.', token))

    }
    catch (error) {
        console.log(error)
        return res.status(500).send(new InternalServerError(error.message))
    }

});


router.post('/register', async (req, res) => {
    try {

        const { username, password } = req.body;

        const userExist = await userService.getUser({ username });
        if (userExist) return res.status(409).send(new ConflictError('username already exists.'))

        const passwordHash = await bcyrpt.hash(password, 10);

        await userService.saveUser({ username, password: passwordHash });

        const token = jwt.sign(
            { username },
            process.env.JWT_SECRET
        );
        return res.status(201).send(new OKSuccess('Logged in successfully.', token))
    }
    catch (error) {
        console.log(error);
        return res.status(500).send(new InternalServerError(error.message))
    }
})

router.get('/user', authenticate, async (req, res) => {
    try {
        const { username } = req;
        console.log(username)
        const user = await userService.getUser({ username }, { password: 0});
        if(!user) return res.status(404).send(new NotFoundError('Could not found user.'))

        return res.status(200).send(new OKSuccess('User found.', user))
    }
    catch(error){
        console.log(error);
        return res.status(500).send(new InternalServerError(error.message))
    }

})

module.exports = router;