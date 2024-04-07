import { createError } from "../error.js";
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
export const subscribe = async (req, res, next) => {
  try {
    await User.findByIdAndUpdate(req.user.id, {
      employee: req.params.id,
    });
    res.status(200).json("Employed");
  } catch (err) {
    next(err);
  }
};
export const unsubscribe = async (req, res, next) => {
  try {
    await User.findById(req.user.id, {
      employee: "",
    });
    res.status(200).json("unEmployed");
  } catch (err) {
    next(err);
  }
};

export const allEditor = async (req, res, next) => {
  //return all the users with type false from mongose User
  try {
    console.log("arole");
    const editors = await User.find({ type: true });
    res.status(200).json(editors);
  } catch (err) {
    next(err);
  }
};

// export const allCreator = async (req, res, next) => {
//   //return all the users with type false from mongose User
//   try {
//     const editors = await User.find({ type: false });
//   } catch (err) {
//     next(err);
//   }
// };
