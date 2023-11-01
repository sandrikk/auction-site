
const isAdmin = (req, res, next) => {

    if (req.user && req.user.isAdmin === true) {
        next();
    } else {
        return res.status(403).json({ message: 'Forbidden - Admin access required' });
    }
};

export default isAdmin;
