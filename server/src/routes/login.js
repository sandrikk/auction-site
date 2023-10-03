// login.js
import express from 'express';
import isLoggedIn from '../middleware/is-logged-in.js';

const router = express.Router();

router.get('', (req, res) => {
    // Authentication succeeded, you can perform further actions here
    res.status(200).send('helooo');
});

router.post('', isLoggedIn, (req, res) => {
    // Authentication succeeded, you can perform further actions here
    res.status(200).send('Login successful');
});

export default router;
