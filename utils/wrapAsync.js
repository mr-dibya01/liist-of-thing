function wrapasync(fn){
    return function(req,res,next){
       fn(req,res,next).catch((err)=>next(err));
    }
}

module.exports = wrapasync;


// async (req,res)=>{
//     let { id }=req.params;
//     let Listing=await listing.findById(id); 
//     res.render("listing/dettails.ejs",{ Listing });
// }


