// module.export = (req, res, next) => {
//     if (req.session && req.session.loggedIn) {
//         next();
//     } else {
//         res.status(401).json({ error: 'You have Invalid credentials' })
//     }
// }