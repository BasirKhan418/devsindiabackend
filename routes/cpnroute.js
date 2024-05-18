import express from 'express';
import {GetData,PostDataAndValidate,UpdateData,DeleteData} from "../businessLogic/cpnFunction.js"
const router = express.Router();
router.get('/', GetData);
router.post('/', PostDataAndValidate);
router.put('/', UpdateData);
router.delete('/', DeleteData);
export default {router};