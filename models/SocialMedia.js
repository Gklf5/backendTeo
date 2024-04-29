import mongoose from "mongoose";

const SocialMediaSchema = new mongoose.Schema(
  {
    media: {
      type: String,
      required: true,
    },
    api_key: {
      type: String,
    },
    cred: {
      client_id: {
        type: String,
      },
      client_secrete: {
        type: String,
      },
    },
    token: {},
    creator: {
      type: String,
    },
  },
  { timestamps: true }
);

export default mongoose.model("SocialMedia", SocialMediaSchema);
