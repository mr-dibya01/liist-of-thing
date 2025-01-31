const express=require("express");
const router=express.Router({ mergeParams:true });
const wrapasync=require("../utils/wrapAsync");
const Review=require("../models/review.js");
const { validationreview,isLoggedIn,isReviewAuthor }=require("../middleware.js");
const reviewController=require("../controller/review.js");



// review route
router.post("/",isLoggedIn ,validationreview ,wrapasync(reviewController.createReview));

// delete review route
router.delete("/:reviewId" ,isLoggedIn ,isReviewAuthor ,wrapasync(reviewController.destroyReview));

module.exports=router;