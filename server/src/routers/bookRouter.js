import express from 'express';
import * as bookController from '../controllers/bookController.js'
const router = express.Router();


router.get('', bookController.getAllBooks);
router.get('/:isbn/bids', bookController.getAllBidsForBook);
router.post('/:isbn/bids', bookController.placeBid);
router.get('/:isbn', bookController.getBookByIsbn);
router.get('/category', bookController.getBooksByCategory);

export default router;
