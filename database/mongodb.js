import mongoose from "mongoose";
import { DB_URI, NODE_ENV } from "../config/env.js";

if (!DB_URI) {
  throw new Error(
    "Please provide Mongo DB URI environment variable inside .env.<development/production>.local"
  );
}

const connectToDatabase = async () => {
  try {
    await mongoose.connect(DB_URI);

    console.log(`Connected to MongoDb in ${NODE_ENV} Succesfully.`);
  } catch (error) {
    console.error("Error connecting to Database: ", error);
    // process.exit();
  }
};

export default connectToDatabase;
