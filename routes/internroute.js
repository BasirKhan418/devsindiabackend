import express from 'express';
const router = express.Router();
import { handleAllInternshipDetails,FetchAllInternshipDetails ,DeleteOneInternShip,UpdateInternShip} from '../businessLogic/internfunc.js';
router.get('/',FetchAllInternshipDetails);
router.post('/',handleAllInternshipDetails);
router.delete('/:id',DeleteOneInternShip);
router.put('/:id',UpdateInternShip);
export default {router};
