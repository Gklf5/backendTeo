import mongoose from "mongoose";

const SocialMediaSchema = new mongoose.Schema(
  {
    media: {
      type: String,
      required: true,
      unique: true,
    },
    api_key: {
      type: String,
    },
    cred: {},
    creator: {
      type: String,
    },
  },
  { timestamps: true }
);

export default mongoose.model("SocialMedia", SocialMediaSchema);
