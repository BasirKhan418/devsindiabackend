import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import mongoose from 'mongoose';
const server = express();
import routes from './routes/register.js';
server.use(express.json());

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