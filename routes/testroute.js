import express from 'express';
import { AddTesthandler ,GetAllTests} from '../businessLogic/addTest.js';
const router = express.Router();
router.get('/',GetAllTests);
router.post('/',AddTesthandler);
export default {router};