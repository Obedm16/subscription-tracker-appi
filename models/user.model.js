import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: [true, "User Name is required"] },
    email: {
      type: String,
      required: [true, "User Email is required"],
      unique: true,
      trim: true,
      match: [/^\S+@\S+\.\S+$/, "Please provide a valid email"],
    },
    password: { type: String, required: [true, "User Password is required"] },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

export default User;
