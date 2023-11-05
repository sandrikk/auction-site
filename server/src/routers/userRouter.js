import express from 'express';
import * as userController from '../controllers/userController.js'
import isAdmin from "../middleware/is-admin.js";
import isLoggedIn from "../middleware/is-logged-in.js";

const router = express.Router();

router.post('', userController.addUser);
router.get('', isLoggedIn, isAdmin, userController.getAllUsers);
router.get('/me/won', isLoggedIn, userController.getWonAuctions);
router.delete('/:id', isLoggedIn, isAdmin, userController.deleteUser)

export default router;
