import express from 'express';
import * as tokenController from '../controllers/tokenController.js'
const router = express.Router();

router.post('', tokenController.addToken);

export default router;
