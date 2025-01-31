const mongoose=require("mongoose");
const review = require("./review.js");
const { ref, required } = require("joi");
const user=require("./user.js");
// const { ref } = require("joi");

const categoryEnum = [
    "Farms",
    "Beachfront",
    "Room",
    "Arctic",
    "Treecity",
    "Trending",
    "Boats",
    "Breakfast",
    "Game",
    "Riads",
    "Towers",
    "Pools",
  ];

const listingschema=new mongoose.Schema({
    title:{
       type:String,
       required:true
    },
    description:String,
    image:{
        url:String,
        filename:String
    },
    price:Number,
    location:String,
    country:String,
    reviews:[
        {
        type: mongoose.Schema.ObjectId,
        ref:"Review",
    }],
    owner:{
        type: mongoose.Schema.ObjectId,
        ref:"User",                                                                                                                                 
    }, 
    category :{
        type:String,
        enum:categoryEnum,  
        default:"Trending",
    } ,
});

listingschema.post("findOneAndDelete",async (listing)=>{
    if(listing){
        await review.deleteMany({_id: { $in : listing.reviews}});//List delete[{..},{..}]
    }
});

const listing=mongoose.model("Listing",listingschema);
module.exports={ listing,categoryEnum };

                  