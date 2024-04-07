import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    img: {
      type: String,
    },
    socialMedia: {
      type: String,
    },
    type: {
      type: Boolean,
      default: false,
    },
    employee: {
      type: String,
    },
    projects: {
      type: [String],
      default: [],
    },
    role: {
      type: String,
    },
  },
  { timestamps: true }
);

export default mongoose.model("User", UserSchema);
