const { listing }=require("../models/listing");
const Review=require("../models/review.js");


module.exports.createReview=async (req ,res)=>{
    console.log(req.params.id);
    let Listing=await listing.findById(req.params.id);
    let newreview=new Review( req.body );
    console.log(newreview);
    newreview.author=req.user._id;
    Listing.reviews.push(newreview);
    await Listing.save();
    await newreview.save();
    req.flash("success","new review added");
    res.redirect(`/listings/${req.params.id}`);
};

module.exports.destroyReview=async (req,res)=>{
    let { id,reviewId }=req.params;
    await listing.findByIdAndUpdate(id,{$pull:{reviews:reviewId}});
    await Review.findByIdAndDelete(reviewId);
    req.flash("error","review Deleted");
    res.redirect(`/listings/${id}`);
}