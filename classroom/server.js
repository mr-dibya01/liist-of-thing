// const express=require("express");

<script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
// const app=express();
// const Posts=require("./routes/postroot");
// const Users=require("./routes/userroot");
// const cookieParser = require('cookie-parser');
// const session = require('express-session');
// const flash = require('connect-flash');
// const path=require("path");
// // const { console } = require("inspector");
// // const { console } = require("inspector");

// app.set("views",path.join(__dirname,"views"));
// app.set("view engine","ejs");

// const sessionoptions ={
//     secret: "mysecretcode",
//     resave:false ,
//     saveUninitialized:true,
// };



// app.use(session( sessionoptions  ));
// app.use(flash());

// app.get("/register",(req,res)=>{
//    let { name="anynumos" }=req.query;
//    req.session.name=name;
//    if (req.session.name == "anynumos"){
//       req.flash("error","register not completed");
//    }
//    else {
//       req.flash("success","register completed");
//    }
//    res.redirect("/succ");
// });

// app.get("/succ",(req,res)=>{
//     res.render("succes.ejs",{ name:req.session.name , succ:req.flash('success'),err:req.flash('error')});
// });

// app.get("/",(req,res)=>{
//     res.send(`Hello ${req.session.name}`);
// });

// // app.get("/reqcount",(req,res)=>{
// //    if(req.session.count){
// //      req.session.count++;
// //    }
// //    else{
// //      req.session.count=1;
// //    }
   
// //    res.send(`you sent a request ${req.session.count} times`);
// // });

// app.listen(3000,()=>{
//     console.log("server listening at 3000");      
// }
$(".filter").click(function(){
    const category = $(this).data("category");
    console.log(category);
});
