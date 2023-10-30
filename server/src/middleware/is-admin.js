/*
const isAdmin = (req, res, next) => {
    if (!req.user) {
        return res.status(401).json({ message: 'Unauthorized' });
    }

    // Check if the user is an admin
    if (req.user.isAdmin === true) {
        // User is an admin, proceed to the next middleware
        next();
    } else {
        return res.status(403).json({ message: 'Forbidden - Admin access required' });
    }
};

export default isAdmin;

 */

import isLoggedIn from "../middleware/is-logged-in.js";

export const isAdmin = (req, res, next) => {
    isLoggedIn(req, res, () => {
        if(req.user && req.user.isAdmin){
            next();
        } else {
            res.status(403).send("Unauthorized: You are not an admin");
        }
    });
};

export default isAdmin;
