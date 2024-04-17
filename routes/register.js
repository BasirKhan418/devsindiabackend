import express from 'express';
import { handleRegister,handlePost } from '../businessLogic/registerfunc.js';
const router = express.Router();
 router.get('/',handleRegister)
 router.post('/post',handlePost)
export default {router};