import mongoose from "mongoose";

const YoutubeSchema = new mongoose.Schema(
  {
    creatorId: {
      type: String,
      required: true,
    },
    editorId: {
      type: String,
    },
    title: {
      type: String,
      required: true,
    },
    desc: {
      type: String,
    },
    imgUrl: {
      type: String,
    },
    videoUrl: {
      type: String,
    },
    approved: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Youtube", YoutubeSchema);
