import mongoose, { Mongoose } from "mongoose";

async function connectDatabase() {
    await mongoose.connect(
    "mongodb+srv://softwarenacanastra:RZngX6LS6mXjKuGJ@canastradb.u6e6o.mongodb.net/?retryWrites=true&w=majority&appName=CanastraDB"
    );
}

export default connectDatabase;
