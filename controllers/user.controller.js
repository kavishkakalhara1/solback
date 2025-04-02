import bcryptjs from "bcryptjs";
import { errorHandler } from "../utils/error.js";
import User from "../models/users/User.model.js";

export const updateUser = async (req, res, next) => {
  if (req.user.id !== req.params.userId) {
    return next(errorHandler(403, "You are not allowed to update this user"));
  }
  if (req.body.password) {
    if (req.body.password.length < 8) {
      return next(errorHandler(400, "Password must be at least 8 characters"));
    }
    req.body.password = bcryptjs.hashSync(req.body.password, 10);
  }
  if (req.body.email) {
    if (req.body.email.length < 7 || req.body.email.length > 20) {
      return next(
        errorHandler(400, "Email must be between 7 and 20 characters")
      );
    }
    if (req.body.email.includes(" ")) {
      return next(errorHandler(400, "Email cannot contain spaces"));
    }
    if (req.body.email !== req.body.email.toLowerCase()) {
      return next(errorHandler(400, "Email must be lowercase"));
    }
    if (!req.body.email.match(/^[a-zA-Z0-9]+$/)) {
      return next(
        errorHandler(400, "Email can only contain letters and numbers")
      );
    }
  }
  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.params.userId,
      {
        $set: {
          firstname: req.body.firstname,
          lastname: req.body.lastname,
          fullname: req.body.fullname,
          email: req.body.email,
        },
      },
      { new: true }
    );
    const { password, ...rest } = updatedUser._doc;
    res.status(200).json(rest);
  } catch (error) {
    next(error);
  }
};

export const deleteUser = async (req, res, next) => {
  try {
    await User.findByIdAndDelete(req.params.userId);
    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    next(error);
  }
};

export const changeIsMemberStatus = async (req, res, next) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.params.userId,
      { $set: { isMember: req.body.isMember } },
      { new: true }
    );
    res.status(200).json(updatedUser);
  } catch (error) {
    next(error);
  }
};

export const getUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.userId);
    if (!user) {
      return next(errorHandler(404, "User not found"));
    }
    const { password, ...rest } = user._doc;
    res.status(200).json(rest);
  } catch (error) {
    next(error);
  }
};

export const getUsers = async (req, res, next) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    next(error);
  }
};

export const signout = async (req, res, next) => {
  try {
    res.clearCookie("access_token", {
      sameSite: "none",
      secure: true,
    });
    res.status(200).json({ message: "User has been signed out." });
  } catch (error) {
    next(error);
  }
};

export const test = (req, res) => {
  res.status(200).json({ message: "Test route is working" });
};

