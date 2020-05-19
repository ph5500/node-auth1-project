const bcrypt = require("bcryptjs");
const router = require("express").Router();

const Users = require("../users/users-model");

const { isValid } = require('../users/users-router')//need to look at




router.post("/register", (req, res) => {
    let user = req.body;
    if (isValid(user)) {
        //need to figure out what rounds does again
        const rounds = process.env.BCRYPT_ROUNDS || 12;
        const hash = bcryptjs.hashSync(credentials.password, rounds);
        //this hashes the password
        credentials.password = hash;

        //saves the user to database
        Users.add(users)
            .then(user => {
                req.session.loggedIn === true;
                res.status(201).json({ data: user })
            })
            .catch(err => {
                res.status(500).json({ message: err.message })
            })
    } else {
        res.status(400).json({
            message: 'please provide username and password'
        })
    }

})


router.post("/login", (req, res) => {
    let { username, password } = req.body;
    if (isValid(req.body)) {
        Users.findBy({ username: username })
            .first()
            .then(user => {
                if (user && bcrypt.compareSync(password, user.password)) {
                    req.session.loggedIn = true;
                    req.session.user = user.username;

                    res.status(200).json({ message: `Welcome ${user.username}!` });
                } else {
                    res.status(401).json({ message: "You shall not pass!" });
                }
            })
            .catch(err => {
                res.status(500).json(err);
            });
    }

});

router.get("/logout", (req, res) => {
    if (req.session) {
        req.session.destroyer(err => {
            if (err) {
                res.status(500).json({ message: 'unable to log out' })
            } else {
                res.status(200).json({ message: 'logged out successfully' })
            }
        })
    } else {
        res.status(200).json({ message: 'no session' })
    }
})

module.exports = router;