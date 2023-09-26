import express from 'express';
import isLoggedIn from '../middleware/is-logged-in.js';

const router = express.Router();


router.post('/login', isLoggedIn, (req, res) => {

});


export default router;