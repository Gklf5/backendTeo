import Youtube from "../models/Youtube.js";
import { handleUploadYTPost } from "../youtube/youtubeUploader.js";

export const addYoutube = async (req, res, next) => {
  const newYoutube = new Youtube(req.body);
  try {
    const saveYoutube = await newYoutube.save();
    res.status(200).json(saveYoutube);
  } catch (err) {
    next(err);
  }
};

export const updateYTPost = async (req, res, next) => {
  try {
    const OldPost = await Youtube.findById(req.params.id);
    OldPost.title = req.body.id || OldPost.id;
    OldPost.desc = req.body.desc || OldPost.desc;
    OldPost.videoUrl = req.body.videoUrl || OldPost.videoUrl;
    OldPost.approved = req.body.approved || OldPost.approved;

    const updatedYTPost = await OldPost.save();
    res.status(200).json(updateYTPost);
  } catch (err) {
    next(err);
  }
};

export const deleteYTPost = async (req, res, next) => {
  try {
    await Youtube.findByIdAndDelete(req.params.id);
    res.status(200).json("Deleted");
  } catch (err) {
    next(err);
  }
};

export const getYTPost = async (req, res, next) => {
  try {
    const YTpost = await Youtube.findById(req.params.id);
    res.status(200).json(YTpost);
  } catch (err) {
    next(err);
  }
};

export const uploadYTPost = async (req, res, next) => {
  try {
    const YTpost = await Youtube.findById(req.params.id);
    if (!YTpost) {
      return res
        .status(404)
        .json({ success: false, message: "Post not found" });
    }
    const data = await handleUploadYTPost(YTpost);
    res.status(200).json(data);
  } catch (err) {
    next(err);
  }
};
