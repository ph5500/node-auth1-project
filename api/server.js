const express = require("express");
const helmet = require("helmet");

const cors = require("cors");
const session = require('express-session');
// const knexStore = require('connect-session-knex')(session);

// const apiRouter = require("./api-router");
// const knex = require('../database/dbConfig.js')

const usersRouter = require('../users/users-router')
const authRouter = require('../auth/auth-router')


const server = express();

const sessionConfig = {

    cookie: {
        maxAge: 1000 * 60 * 15,
        secure: process.env.SECURE_COOKIE || false,
        httpOnly: true,
    },
    resave: false,
    saveUninitialized: process.env.USER_ALLOWED_COOKIES || true,
    name: 'session',
    secret: process.env.COOKIE_SECRET || 'keep it secret, keep it safe'
}
server.use(session(sessionConfig));

server.use(helmet());
server.use(express.json());
server.use(cors());

server.use('/api/users', usersRouter);
server.use('/api/auth', authRouter)

server.get('/', (req, res) => {
    // console.log(req.session)

    res.json({ api: 'is working' })
})

module.exports = server;