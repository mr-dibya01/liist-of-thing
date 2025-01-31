const mongoose=require("mongoose");
const initdata=require("./data.js");
const { listing }=require("../models/listing");

const MONGO_URL="mongodb://127.0.0.1:27017/wanderlust";

main().then(()=>console.log("connected")).catch((err)=>console.log(err));

async function main() {
    await mongoose.connect(MONGO_URL);
} 
console.log("hii");
const initdb=async ()=>{
   await listing.deleteMany({});
   initdata.data=initdata.data.map((obj) => ({
    ...obj,
    owner:"67921c1b058a4fe02e9709af",
   }));

   await listing.insertMany(initdata.data);
   console.log("data was initialization");
};
initdb();