const handleRegister =(req,res)=>{
res.send('Register route from business logic');
}
const handlePost = (req,res)=>{
console.log(req.body);
res.status(200).json({Message:"Post route from business logic",data:req.body})
}
export {handleRegister,handlePost};
