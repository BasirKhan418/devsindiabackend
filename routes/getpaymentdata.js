import InternUser from "../models/InternUser.js";
import express from "express";
import { handleGetPayemntData } from "../businessLogic/getpaymentdatafunc.js";
const router = express.Router();
router.get("/", (req, res) => {
  res.send("getallPayment Route");
});
router.post("/", handleGetPayemntData );
export default { router };