
const isAdmin = (req, res, next) => {

    if (req.user && req.user.isAdmin === true) {
        next();
    } else {
        return res.status(403).json({ error: 'You are not an admin.' });
    }
};

export default isAdmin;
