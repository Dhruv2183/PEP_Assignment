const userModel = require("../models/user");

// GET all users
const getAllUsers = async (req, res) => {
    try {
        const allusers = await userModel.find({});
        res.status(200).json({
            message: "All users fetched",
            allusers
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// GET user by ID
const getUserById = async (req, res) => {
    try {
        const user = await userModel.findById(req.params.id);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        res.status(200).json({
            message: "User fetched",
            user
        });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// POST create user
const createUser = async (req, res) => {
    try {
        const newUser = new userModel(req.body);
        await newUser.save();
        res.status(201).json({
            message: "New user created",
            newUser
        });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// PATCH update user
const updateUser = async (req, res) => {
    try {
        const updatedUser = await userModel.findByIdAndUpdate(
            req.params.id,
            { $set: req.body },
            { new: true }
        );

        if (!updatedUser) {
            return res.status(404).json({ message: "User not found" });
        }

        res.status(200).json({
            message: "User updated",
            updatedUser
        });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// DELETE user
const deleteUser = async (req, res) => {
    try {
        const deletedUser = await userModel.findByIdAndDelete(req.params.id);

        if (!deletedUser) {
            return res.status(404).json({ message: "User not found" });
        }

        res.status(200).json({
            message: "User deleted",
            deletedUser
        });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Export all controllers
module.exports = {
    getAllUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser
};
