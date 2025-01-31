const { string, date } = require("joi");
const User=require("./user.js");
const mongoose=require("mongoose");
const { Schema }=mongoose;

const review=new Schema({
    content:String,
    rating:{
        type:Number,
        max:5,
        min:1
    },
    createdAt:{
        type:Date,
        default:Date.now(),
    },
    author:{
        type:mongoose.Schema.ObjectId,
        ref:User,
    }
});

module.exports=mongoose.model("Review",review);