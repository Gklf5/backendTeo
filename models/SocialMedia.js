import mongoose from "mongoose";

const SocialMediaSchema = new mongoose.Schema(
  {
    media: {
      type: String,
      required: true,
    },
    auth: {},
    token: {},
    creator: {
      type: String,
    },
  },
  { timestamps: true }
);

export default mongoose.model("SocialMedia", SocialMediaSchema);
