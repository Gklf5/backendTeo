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

export const getEditors = async (req, res, next) => {
  try {
    const editorList = await User.find(req.user.id);
    const editors = Promise.all(editorList.map((editor) => {
      return User.findById(editor);
    }))
    res.status(200).json(editors);
  } catch (err) {
    next(err);
  }
};

export const assignEditor = async (req,res,next)=>{
try {
  await User.findByIdAndUpdate(req.user.id, {
  $push: {editors:req.params.id}
},{new:true})
res.status(200).json(res.body)
} catch (err) {
  next(err)
}
}

export const unAssignEditor = async (req,res,next) =>{
  try {
    await User.findByIdAndUpdate(req.user.id,{
      $pull:{editors:req.params.id}
    })
    res.status(200).json("Successfully ")
  } catch (err) {
    next(err)
    
  }
}


export const getAssignedBy = async (req,res,next) => {
  try {
    const creator = await User.findById(req.user.assigned_by)
    res.status(200).json(creator)
  } catch (err) {
    next(err)
  }
}

