import Notification from "../models/Notification.js";
import User from "../models/User.js";

export const addNotification = async (req, res, next) => {
  try {
    const newNotification = new Notification({
      fromUser: req.user.id,
      ...req.body,
    });
    await newNotification.save();
    await User.findByIdAndUpdate(newNotification.toUser, {
      $push: { notifications: newNotification.id },
    });
    res.status(200).json(newNotification);
  } catch (err) {
    next(err);
  }
};

export const updateNotification = async (req, res, next) => {
  try {
    const notification = await Notification.findById(req.params.id);
    notification.set(req.body);
    const updatedNotification = await notification.save();
    res.status(200).json(updatedNotification);
  } catch (err) {
    next(err);
  }
};

export const getNotification = async (req, res, next) => {
  try {
    const notification = await Notification.findById(req.params.id);
    res.status(200).json(notification);
  } catch (err) {
    next(err);
  }
};

export const deleteNotification = async (req, res, next) => {
  try {
    await Notification.findByIdAndDelete(req.params.id);
    res.status(200).json("succesful");
  } catch (err) {
    next(err);
  }
};
