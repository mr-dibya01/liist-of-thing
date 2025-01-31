const mongoose=require("mongoose");
const Schema=mongoose.Schema;
const passportLocalMangoose=require("passport-local-mongoose");

const userSchema=new Schema({
    email:{
        type:String,
        required:true,
    }
});

userSchema.plugin(passportLocalMangoose);//hash salt ->password ,username bydefault field set karta hai

module.exports = mongoose.model("User",userSchema);
