import mongoose from "mongoose";

const projectSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    creator: {
      type: String,
      required: true,
    },
    assigned_editor: {
      type: String,
    },
    img: {
      type: String,
    },
    socialMedia: {
      type: String,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Project", projectSchema);
