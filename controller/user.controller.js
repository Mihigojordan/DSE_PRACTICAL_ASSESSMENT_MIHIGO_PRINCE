const UserModel = require('../models/user.model');

/**
 * Create new user
 */
const createUser = async(req, res) => {
    try {
        const { full_name, phone, role } = req.body;

        if (!full_name || !phone || !role) {
            return res.status(400).json({ message: 'All fields required' });
        }

        if (!['ParkingManager', 'Driver'].includes(role)) {
            return res.status(400).json({ message: 'Invalid role' });
        }

        const existingUser = await UserModel.findByPhone(phone);
        if (existingUser) {
            return res.status(400).json({ message: 'Phone already exists' });
        }

        const userId = await UserModel.create({
            full_name,
            phone,
            role
        });

        res.status(201).json({
            message: 'User created successfully',
            userId
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

/**
 * Get all users
 */
const getAllUsers = async(req, res) => {
    try {
        const users = await UserModel.getAll();
        res.json(users);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

/**
 * Get single user by ID
 */
const getUserById = async(req, res) => {
    try {
        const user = await UserModel.findById(req.params.id);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.json(user);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

/**
 * Update user
 */
const updateUser = async(req, res) => {
    try {
        const { full_name, phone, role } = req.body;

        if (role && !['ParkingManager', 'Driver'].includes(role)) {
            return res.status(400).json({ message: 'Invalid role' });
        }

        const updated = await UserModel.update(req.params.id, {
            full_name,
            phone,
            role
        });

        if (!updated) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.json({ message: 'User updated successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

/**
 * Delete user
 */
const deleteUser = async(req, res) => {
    try {
        const deleted = await UserModel.delete(req.params.id);

        if (!deleted) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.json({ message: 'User deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

module.exports = {
    createUser,
    getAllUsers,
    getUserById,
    updateUser,
    deleteUser
};