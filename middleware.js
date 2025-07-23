const {listing}=require("./models/listing.js");
const review=require("./models/review.js");

const expressError=require("./utils/expressError");
const { listingSchema,reviewSchema }=require("./scema.js");


module.exports.isLoggedIn=(req,res,next)=>{
    if(!req.isAuthenticated()){
        req.session.redirectUrl=req.originalUrl;
        req.flash("error","you must be logged in to create listing");
        return res.redirect("/login");
    }
     next();
};

module.exports.saveRedirectUrl=(req,res,next)=>{
    if(req.session.redirectUrl){
        res.locals.redirectUrl=req.session.redirectUrl;
    }
    next();
} ;

module.exports.isOwner=async (req,res,next)=>{
    let { id }=req.params;
    let Listing=await listing.findById(id);      
   if(!Listing.owner._id.equals(req.user._id)){
      req.flash("error","You are not this listing Owner");
      return res.redirect(`/listings/${id}`);
   }
   next();
};

module.exports.isReviewAuthor=async (req,res,next)=>{
    let { id,reviewId }=req.params; 
    let Review=await review.findById(reviewId);
    console.log(req.user._id);       
   if(!Review.author._id.equals(req.user._id)){
      req.flash("error","You are not this listing Owner");
      return res.redirect(`/listings/${id}`);
   }
   next();
};


module.exports.validationlisting=(req,res,next)=>{
    let  result =listingSchema.validate(req.body);
    console.log("validationlisting",result,"-------");
    if(result.error){
        next(new expressError(400,  result.error.message )); 
    }else{
        next();
    } 
};

module.exports.validationreview=(req,res,next)=>{
    let result=reviewSchema.validate(req.body);
    if(result.error){
        next(new expressError(400,result.error.message));
    }
    next();
};