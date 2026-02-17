

const User = require("../Models/UserModel");

exports.createUser = async (req , res) => {

    try {
        const user = await User.create(req.body);
        res.status(201).json(user);
    }
    catch (error) {
    res.status(400).json({ message: error.message });
  }

};

// ----------------------- GET USER DETAILS --------------------

exports.getUsers = async (req, res) => {
  try {
    const users = await User.find().sort({ createdAt: -1 });
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ----------------------- UPDATE USER DETAILS -------------------

exports.updateUser = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(user);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

//------------------------ DELETE USER ---------------------

exports.deleteUser = async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.json({ message: "User deleted successfully" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};