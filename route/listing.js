const express=require("express");
const router=express.Router();
const wrapasync=require("../utils/wrapAsync.js");
const { listing }=require("../models/listing");
const { isLoggedIn,isOwner,validationlisting }=require("../middleware.js");
const listingController=require("../controller/listing.js");
const multer  = require('multer');
const { storage }= require("../cloudconfig.js");
const upload = multer({ storage });

router.get("/" ,wrapasync(listingController.index));

router.route("/")
   .post(isLoggedIn ,
      upload.single('image') ,
      validationlisting,
      wrapasync(listingController.createListing )
   );
   
  router.get("/search",wrapasync( async(req,res)=>{
   console.log("done");
   let searchquery=req.query.search;
   let searchlisting=await listing.find({location:searchquery});
   res.render("listing/searchlisting.ejs",{searchlisting});
}));    
   
// New Route 
router.get("/new" ,isLoggedIn ,listingController.renderNewFrom );



router
   .route("/:id")
   .get(wrapasync(listingController.showListing))
   .put(isLoggedIn ,isOwner ,upload.single('image')  ,wrapasync(listingController.updateListing))
   .delete(isLoggedIn ,isOwner ,wrapasync(listingController.deleteListing));

 
// edit route
router.get("/:id/edit",isLoggedIn ,isOwner ,wrapasync(listingController.renderEditFrom));

router.get("/category/:categoryname",wrapasync(async (req,res)=>{
   let { categoryname }=req.params;
   let categories =await listing.find({category:categoryname});
   res.json({categories});
}));



module.exports=router;

