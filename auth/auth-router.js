const bcrypt = require("bcryptjs");
const router = require("express").Router();

const Users = require("../users/users-model");

router.post("/register", (req, res) => {
    let user = req.body;

    const hash = bcrypt.hashSync(user.password, 8);

    user.password = hash;

    Users.add(user)
        .then(saved => {
            res.session.loggedIn = true;
            res.status(201).json(saved);
        })
        .catch(err => {
            res.status(500).json(err);
        });
});

router.post("/login", (req, res) => {
    let { username, password } = req.body;

    Users.findBy({ username })
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