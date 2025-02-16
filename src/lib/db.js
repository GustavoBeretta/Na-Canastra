import mongoose from "mongoose"
require('mongoose-currency').loadType(mongoose)

export default async function connectDatabase() {
    try{
        await mongoose.connect(process.env.MONGO_DB_URI);
        console.log("Connected to MongoDB")
    } catch (error) {
        console.log(error)
    }
}