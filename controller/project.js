import Project from "../models/Project.js";
import User from "../models/User.js";
import { createError } from "../error.js";

export const addProject = async (req, res, next) => {
  const newProject = new Project({ ...req.body, creator: req.user.id });
  try {
    const savedProject = await newProject.save();
    await User.findByIdAndUpdate(
      req.user.id,
      {
        $push: { projects: savedProject.id },
      },
      { new: true }
    );
    res.status(200).send("project has been created");
  } catch (err) {
    next(err);
  }
};

export const getProject = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id);
    const projects = await Promise.all(
      user.projects.map((projectId) => {
        return Project.findById(projectId);
      })
    );
    res.send(projects);
  } catch (err) {
    next(err);
  }
};

export const updateProject = async (req, res, next) => {
  const project = await Project.findById(req.params.id);
  if (project.creator === req.user.id) {
    try {
      const updatesProject = await Project.findByIdAndUpdate(
        req.params.id,
        {
          $set: req.body,
        },
        { new: true }
      );
      res.status(200).json(updatesProject);
    } catch (err) {
      next(err);
    }
  } else {
    return next(createError(403, "You can only update your account"));
  }
};

export const updateProjectEditor = async (req, res, next) => {
  const project = await Project.findById(req.params.id);
  const user = await User.findById(req.user.id);
  if (project.creator === req.user.id) {
    try {
      const updatedProject = await Project.findByIdAndUpdate(req.params.id, {
        editor: user.employee,
      });
      await User.findByIdAndUpdate(user.employee, {
        $push: { projects: req.params.id },
      });
      res.status(200).json(updatedProject);
    } catch (err) {
      next(err);
    }
  } else {
    return next(createError(403, "You can only update your account"));
  }
};
