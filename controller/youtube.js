import Youtube from "../models/Youtube.js";

export const addYoutube = async (req, res, next) => {
  let newYoutube = new Youtube(req.body);
  try {
    const saveYoutube = await newYoutube.save();
    res.status(200).json(saveYoutube);
  } catch (err) {
    next(err);
  }
};

export const updateYoutube = async (req, res, next) => {
  try {
  } catch (err) {
    next(err);
  }
};

export const deleteYoutube = async (req, res) => {
  try {
  } catch (err) {
    next(err);
  }
};

export const getYoutube = async (req, res) => {
  try {
  } catch (err) {
    next(err);
  }
};
