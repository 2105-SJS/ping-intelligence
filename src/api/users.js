const express = require('express');
const usersRouter = express.Router();
const bcrypt = require('bcrypt')
const SALT_COUNT = 10;

const jwt = require('jsonwebtoken');
const { JWT_SECRET } = process.env;

const { createUser, getUserByUsername, getUser, getUserById } = require('../db/users');
const { getPublicRoutinesByUser, getAllPublicRoutines } = require('../db/routines');
const { requireUser } = require('./util');

// POST /api/users/register
usersRouter.post('/register', async (req, res, next) => {
    const { username, password } = req.body;
    try {
        const _user = await getUserByUsername({ username });
        if (_user) {
            next({
                name: 'UserExistsError',
                message: 'A user by that username already exists'
            });
        } else if (password.length < 8) {
            next({
                name: 'Error',
                message: 'Password is too short'
            })
        } else {
            const user = await createUser({
                username,
                password
            });
            res.send({
                message: "Thank you for signing up",
                user
            });
        }
    } catch (error) {
        next(error);
    }
})

//POST /api/users/login
usersRouter.post('/login', async (req, res, next) => {
    const { username, password } = req.body;
    try {
        const user = await getUserByUsername({ username });
        const hashedPassword = await bcrypt.hash(password, SALT_COUNT)
        const passwordMatch = await bcrypt.compare(password, hashedPassword)
        if (user && passwordMatch) {
            const token = jwt.sign({ id: user.id, username }, process.env.JWT_SECRET);
    
            res.send({
                message: "You're logged in!",
                token
            });
        } else {
            next({
                name: 'IncorrectCredentialsError',
                message: 'Username or password is incorrect'
            });
        }
    } catch (error) {
        console.log(error)
        next(error);
    }
});

// GET /api/users/me
usersRouter.get('/me', requireUser, async (req, res, next) => {
    const { id } = req.user
    try {
        const user = await getUserById( id )
        if(user) {
            res.send(user)
        }
    } catch (error) {
        next(error);
    }
});

module.exports = usersRouter;