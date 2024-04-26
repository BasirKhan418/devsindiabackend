import express from 'express';
import { handleAuth,GetAllAdmins,DeleteOneAdmin } from '../businessLogic/authfunc.js';
const router = express.Router();
router.post('/',handleAuth);
router.get('/',GetAllAdmins);
router.delete('/:id',DeleteOneAdmin);
export default {router};