import express from 'express';
const router = express.Router();
import { AddTestquestionhandler,GetOneTestquestionhandler } from '../businessLogic/addTestqs.js';
router.get('/',GetOneTestquestionhandler);
router.post('/',AddTestquestionhandler);
export default {router};