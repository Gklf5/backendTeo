import { createError } from "../error.js";
import SocialMedia from "../models/SocialMedia.js";
import User from "../models/User.js";

export const updateUser = async (req, res, next) => {
  if (req.params.id === req.user.id) {
    try {
      const updatedUser = await User.findByIdAndUpdate(
        req.params.id,
        {
          $set: req.body,
        },
        { new: true }
      );
      res.status(200).json(updatedUser);
    } catch (err) {
      next(err);
    }
  } else {
    return next(createError(403, "You can only update your account"));
  }
};

export const deleteUser = async (req, res, next) => {
  if (req.params.id === req.user.id) {
    try {
      await User.findByIdAndDelete(req.params.id);
      res.status(200).json("deleted user");
    } catch (err) {
      next(err);
    }
  } else {
    return next(createError(403, "You can only delete your account"));
  }
};

export const getUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);
    res.status(200).json(user);
  } catch (err) {
    next(err);
  }
};

export const getEditors = async (req, res, next) => {
  try {
    // console.log("TRIGGERD");
    const user = await User.findById(req.params.id);
    const editorList = user.editors;
    if (editorList.length) {
      const editors = await Promise.all(
        editorList.map((editorId) => {
          return User.findById(editorId);
        })
      );
      console.log(editors);
      res.status(200).json(editors);
    } else {
      // res.status(200).json("Not editors");
    }
  } catch (err) {
    // console.error(err);
    next(err);
  }
};

export const assignEditor = async (req, res, next) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.user.id,
      {
        $addToSet: { editors: req.params.id },
      },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json(updatedUser);
  } catch (err) {
    next(err);
  }
};

export const unAssignEditor = async (req, res, next) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.user.id,
      {
        $pull: { editors: req.params.id },
      },
      { new: true }
    );
    res.status(200).json(updatedUser);
  } catch (err) {
    next(err);
  }
};

export const getAssignedBy = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);
    if (user.assigned_by.length) {
      const creator = await User.findById(user.assigned_by[0]);
      res.status(200).json(creator);
    } else {
      // res.status(200).json("no creator");
    }
  } catch (err) {
    next(err);
  }
};

export const getAllEditors = async (req, res, next) => {
  try {
    //list of all users with role attribute === editors
    const editors = await User.find({ role: "editor" });
    res.status(200).json(editors);
  } catch (err) {
    next(err);
  }
};

export const getAllCreators = async (req, res, next) => {
  try {
    //list of all users with role attribute === editors
    const creator = await User.find({ role: "creator" });
    res.status(200).json(creator);
  } catch (err) {
    next(err);
  }
};

export const requestPost = async (req, res, next) => {
  try {
    await User.findByIdAndUpdate(req.body.user, {
      $push: { requests: { user: req.user.id, post: req.body.post } },
    });
    await User.findByIdAndUpdate(req.user.id, {
      $push: { requests: req.body },
    });
    res.status(200).json("Success");
  } catch (err) {
    next(err);
  }
};
export const requestDelete = async (req, res, next) => {
  try {
    let user = await User.findById(req.user.id);
    let requestIndex = user.requests.findIndex(
      (request) => request.user === req.body.user
    );
    user.requests.splice(requestIndex, 1);
    await user.save();
    user = await User.findById(req.body.user);
    requestIndex = user.requests.findIndex(
      (request) => request.user === req.user.id
    );
    user.requests.splice(requestIndex, 1);
    await user.save();
    res.status(200).json("Success");
  } catch (err) {
    next(err);
  }
};

export const requestReject = async (req, res, next) => {
  try {
    await User.findByIdAndUpdate(req.body.user, {
      $set: { requests: { state: "rejected" } },
    });
    await User.findByIdAndUpdate(req.user.id, {
      $set: { requests: { state: "rejected" } },
    });
    res.status(200).json("Success");
  } catch (err) {
    next(err);
  }
};

export const requestAccept = async (req, res, next) => {
  try {
  } catch (err) {
    next(err);
  }
};

export const addSocials = async (req, res, next) => {
  try {
    // console.log(req.body);
    const newSocialMedia = new SocialMedia({
      ...req.body,
      creator: req.user.id,
    });
    const savedSocialMedia = await newSocialMedia.save();
    const updatedUser = await User.findByIdAndUpdate(
      req.user.id,
      {
        $push: {
          socialMedia: savedSocialMedia.id,
        },
      },
      { new: true }
    );
    res.status(200).json(updatedUser);
  } catch (err) {
    next(err);
  }
};

export const deleteSocials = async (req, res, next) => {
  try {
    // console.log(req.body);
    await SocialMedia.findByIdAndDelete(req.params.id);
    const updatedUser = await User.findByIdAndUpdate(
      req.user.id,
      {
        $pull: {
          socialMedia: req.params.id,
        },
      },
      { new: true }
    );
    res.status(200).json(updatedUser);
  } catch (err) {
    next(err);
  }
};

export const getAllSocials = async (req, res, next) => {
  try {
    // console.log(req.user);
    const user = await User.findById(req.params.id);
    const socialsList = user.socialMedia;
    console.log(socialsList);
    if (socialsList.length) {
      const socials = await Promise.all(
        socialsList.map((socialsId) => {
          return SocialMedia.findById(socialsId);
        })
      );
      res.status(200).json(socials);
    }
  } catch (err) {
    next(err);
  }
};
