const router = require("express").Router();

const Users = require('./users-model')

function restricted(req, res, next) {
    if (req.session && req.session.loggedIn) {
        next();
    } else {
        res.status(401).json({ message: 'Restricted' })
    }
}

router.use(restricted);
//this is the restricted section
router.get('/', (req, res) => {
    Users.find()
        .then(users => {
            res.json(users);
        }).catch(err => res.send(err))
})

module.exports = router;