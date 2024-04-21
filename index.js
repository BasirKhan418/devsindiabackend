import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
const server = express();
import routes from './routes/register.js';
import internroutes from './routes/internroute.js';
import payment from './routes/payment.js';
import postpayment from './routes/postpayment.js';
server.use(express.json());
server.use(cors());
server.use(express.urlencoded({ extended: true }));
server.listen(8080,()=>{
    console.log('Server is running on port 8080 http://localhost:8080/');
});
(async () => {
    try{
     await mongoose.connect(process.env.MONGO_URI);
        console.log('Connected to the database');
    }
    catch(err){
        console.log('Error connecting to the database');
        console.log(err);
    }
})();
server.use("/api/register",routes.router);
server.use("/api/intern",internroutes.router);
server.use("/api/payment",payment.router);
server.use("/api/postpayment",postpayment.router);
