import express from 'express';
import * as tokenController from '../controllers/tokenController.js'
const router = express.Router();

router.post('', tokenController.addToken);
//router.get('', tokenController.getToken);

export default router;
