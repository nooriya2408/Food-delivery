 import mongoose from "mongoose";

export const connectDB = async()=>{
    await mongoose.connect("mongodb+srv://nooriya2408:nooriya2408@cluster0.dofhq.mongodb.net/Food-Delivery")
    .then(()=>console.log("DB connected"))
}