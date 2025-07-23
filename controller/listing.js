const {listing}=require("../models/listing");
const {categoryEnum}=require("../models/listing");

module.exports.index=async (req,res)=>{
   let allListings=await listing.find({});  
   res.render("listing/index.ejs",{ allListings });
};


module.exports.renderNewFrom=(req,res)=>{
    res.render("listing/new.ejs",{ categories:categoryEnum });    
}; 

module.exports.createListing=async (req,res,next)=>{ 
    console.log(req.body);
    let Newlisting=new listing( req.body ); 
    console.log(Newlisting);
    Newlisting.owner=req.user._id;
    Newlisting.image={url:req.file.path,filename:req.file.filename};
    await Newlisting.save();  
    req.flash("success","new listing added");
    res.redirect("/listings"); 
};

// module.exports.createListing=async (req,res,next)=>{ 
//     console.log(req.body);
//     console.log(req.file);
//     res.send("done");
// }

module.exports.showListing=async (req,res)=>{
    let { id }=req.params;
    let Listing=await listing.findById(id)
    .populate({
        path:"reviews" ,
        populate: {
            path:"author",
        },
    })
    .populate("owner"); 
    console.log(Listing);
    if(!Listing){
        req.flash("remove","Listing you requested for does not exist!");
        res.redirect("/listings");
    }
    res.render("listing/dettails.ejs",{ Listing });
};

module.exports.renderEditFrom=async (req,res)=>{
    let { id }=req.params;
    let Listing=await listing.findById(id); 
    if(!Listing){
        req.flash("remove","Listing you requested for does not exist!");
        res.redirect("/listings");
    }
    let originalImageUrl=Listing.image.url;

    originalImageUrl=originalImageUrl.replace("/upload" , "/upload/h_300,w_250");
    res.render("listing/edit.ejs",{ Listing,originalImageUrl,categories:categoryEnum });
};

module.exports.updateListing=async (req,res)=>{
    let { id }=req.params;
    let result=await listing.findByIdAndUpdate(id,req.body);
    console.log(result);
    if(typeof req.file !=="undefined"){
        result.image={url:req.file.path,filename:req.file.filename};
        await result.save();
    }
    req.flash("success","listing updated");
    res.redirect(`/listings/${id}`); 
};

module.exports.deleteListing=async (req,res)=>{
    let { id }=req.params;
    await listing.findByIdAndDelete(id);
    req.flash("success","listing Deleted");
    res.redirect(`/listings`);
 }


