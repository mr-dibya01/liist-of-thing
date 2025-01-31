const express=require("express")
const Router=express.Router();

// post index route
Router.get("/",(req,res)=>{
    console.dir(req.cookies);
    res.send("I am the root of post");
 });
 
 // post route
 Router.post("/:id",(req,res)=>{
     res.send(" post root");
 });
  
 // delete route
 Router.delete("/",(req,res)=>{
     res.send("post dlt root");
 });
  module.exports=Router;