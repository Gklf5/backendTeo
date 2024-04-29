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
      type: [String],
    },
    role: {
      type: String,
    },
    editors: {
      type: [String],
    },
    projects: {
      type: [String],
      default: [],
    },
    assigned_by: {
      type: [String],
    },
    youtube: {
      type: [String],
    },
    role: {
      type: String,
    },
    requests: [
      {
        user: {
          type: String,
          required: true,
        },
        post: {
          type: String,
          required: true,
        },
        state: {
          type: String,
          default: "unseen",
        },
      },
    ],
    notifications: {
      type: [String],
    },
  },
  { timestamps: true }
);

export default mongoose.model("User", UserSchema);
