import mongoose from "mongoose";

const NotificationSchema = new mongoose.Schema({
  toUser: {
    type: String,
  },
  fromUser: {
    type: String,
  },
  fun: {
    type: String,
  },
  post: {
    type: String,
  },
  status: {
    type: String,
    default: "unseen",
  },
});

export default mongoose.model("Notification", NotificationSchema);
