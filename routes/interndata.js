import express from "express";
import { AllInternData,SearchInternData} from "../businessLogic/interndata.js";
const router = express.Router();
router.get("/", AllInternData);
router.post("/", SearchInternData);
export default { router };