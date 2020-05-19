const express = require("express");
const helmet = require("helmet");
const session = require('express-session');
const knexStore = require('connect-session-knex')(session);

const apiRouter = require("./api-router");
const knex = require('../database/dbConfig.js')

const server = express();

const sessionConfig = {
    name: 'cookie',
    secret: 'keep it secret, keep it safe',
    resave: false,
    saveUninitialized: true,
    cookie: {
        maxAge: 1000 * 60 * 15,
        secure: false,
        httpOnly: true,
    },
    //set up store so session remains after server restart
    store: new knexStore({
        knex,
        tablename: true,
        sidfieldname: 'sid',
        clearInterval: 1000 * 60 * 15

    })
}

server.use(express.json());
server.use(session(sessionConfig))

server.use("/api", apiRouter);

server.get('/', (req, res) => {
    console.log(req.session)
    res.json({ api: 'is working' })
})

module.exports = server;