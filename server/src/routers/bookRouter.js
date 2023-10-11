import express from 'express';
import * as bookController from '../controllers/bookController.js'
const router = express.Router();


router.get('', bookController.getAllBooks);

router.get('/:isbn', bookController.getBookByIsbn);

export default router;
