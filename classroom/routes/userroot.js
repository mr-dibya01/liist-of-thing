const express=require("express")
const Router=express.Router();






// user index route
Router.get("/",(req,res)=>{
    res.send("I am the root of user");
});
 
 // user post route
Router.post("/:id",(req,res)=>{
    res.send("user post root");
});
  
 // user delete route
Router.delete("/:id",(req,res)=>{
    res.send("user dlt root");
});
 
module.exports=Router;