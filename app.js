if(process.env.NODE_ENV != "production"){
    require('dotenv').config();
}

const express=require("express" );
const app=express();
const mongoose=require("mongoose");
const methodOverride=require("method-override");
const path=require("path");
const expressError=require("./utils/expressError"); 
const ejsmate=require("ejs-mate");   
const session = require('express-session');
const MongoStore = require('connect-mongo');
const flash = require('connect-flash');  
const passport=require("passport");
const LocalStrategy=require("passport-local"); 
const User=require("./models/user.js");
const dbUrl=process.env.ATLASDB_URL;
const listingController=require("./controller/listing.js");

const listingRoute=require("./route/listing.js");
const reviewRoute=require("./route/review.js");
const userRoute=require("./route/user.js");

main()
.then(()=>{
    console.log("connected");
})
.catch((err)=>{
    console.log(err);
}); 

async function main() {
    await mongoose.connect(dbUrl);
} 

const store = MongoStore.create({
    mongoUrl:dbUrl,
    crypto :{
        secret:process.env.SECRET,
    },
    touchAfter: 24 * 3600,
});

store.on("error", ()=>{
    console.log("ERROE in MONGO SESSION STORE",err);
});

const sessionoptions ={
    store,
    secret: process.env.SECRET,
    resave:false, 
    saveUninitialized:true,
    cookie:{
       expires: Date.now() + 1000 * 660 *60 *24 *3,//ms 1s=1000ms  , 60: Seconds in a minute , 60: Minutes in an hour , 24: Hours in a day , 7: Number of days (7 days)
       maxAge: 1000 * 60 * 60 * 24 *3, //7daya expires
       httpOnly:true, 
    }
};


const wrapasync = require('./utils/wrapAsync.js');
app.set("views",path.join(__dirname,"views"));
app.set("view engine","ejs");
app.engine('ejs', ejsmate);
app.use(express.static(path.join(__dirname,"/public")));
app.use(express.urlencoded({extended:true}));    
app.use(methodOverride('_method'));

app.use(session( sessionoptions  ));
app.use(flash());

app.use(passport.initialize());  // app.use(passport.initialize());
// Iska matlab hai ki tum Passport ko apne Express application mein initialize kar rahe ho. 
// Yeh line Express ko batati hai ki Passport ko set up karo, taaki tum authentication ke liye use kar sako.
// Jab tum yeh line likhte ho, Passport apne internal configurations ko set kar leta hai taaki user ko authenticate kiya ja sake.
app.use(passport.session());

// app.use(passport.session());
// Yeh line session management ke liye hai. Jab koi user successfully authenticate ho jata hai, toh uska session create hota hai, 
// taaki user ko baar baar login na karna pade. Yeh line session ko manage karti hai, taaki tum login status ko track kar sako.
// Jab user ko login kiya jata hai, Passport uske session ko handle karta hai, taaki next time jab user aaye, wo already logged in ho.

passport.use(new LocalStrategy(User.authenticate()));
  
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser()); 

app.use((req,res,next)=>{
   res.locals.error=req.flash("error");
   res.locals.success=req.flash("success");
   res.locals.currUser=req.user;    
   next();
});

app.use((req,res,next)=>{
    console.log(req.originalUrl);
    next(); 
})

app.use("/",wrapasync(listingController.index));

app.use("/listings",listingRoute);
app.use("/listings/:id/reviews",reviewRoute);
app.use("/",userRoute); 

//  Invalid Route
app.all("*",(req,res,next)=>{ 
    next(new expressError(401,"Page Not Found!"));
});

app.use((err,req,res,next)=>{
    console.log("Error Haldseler",err,"-------");
    let { status=403,message="Went Something Error!" }=err;
    console.log("sstatys=s",status,message);
    res.status(status).render("error.ejs", {message});
});

app.listen("8080",()=>{
    console.log("server is listening at 8080");
});
 

