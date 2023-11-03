import express from 'express';
import * as bookController from '../controllers/bookController.js'
import isAdmin from "../middleware/is-admin.js";
import isLoggedIn from "../middleware/is-logged-in.js";
const router = express.Router();

router.get('', bookController.getAllBooks);
router.get('/:isbn', bookController.getBookByIsbn);
router.get('/:isbn/bids', bookController.getAllBidsForBook);
router.post('/:isbn/bids',isLoggedIn, bookController.placeBid);
router.post('',isLoggedIn, isAdmin, bookController.addBook);
router.put('/:isbn', isLoggedIn, isAdmin, bookController.modifyBook)
router.delete('/:isbn',isLoggedIn, isAdmin, bookController.deleteBook);

export default router;
