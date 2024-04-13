import mongoose from "mongoose";

const SocialMediaSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    api_key: {
      type: String,
      required: true,
    },
    creator: {
      type: String,
    },
    projects: {
      type: [String],
      default: [],
    },
  },
  { timestamps: true }
);

export default mongoose.model("SocialMedia", SocialMediaSchema);
