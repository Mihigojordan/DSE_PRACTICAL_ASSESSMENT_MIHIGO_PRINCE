const express = require('express');
const router = express.Router();

const {
    createUser,
    getAllUsers,
    getUserById,
    updateUser,
    deleteUser
} = require('../controller/user.controller');

const {
    verifyToken,
    authorizeRoles
} = require('../middlewares/auth.middleware');

// Only ParkingManager can manage users
router.post('/', createUser);
router.get('/', verifyToken, authorizeRoles('ParkingManager'), getAllUsers);
router.get('/:id', verifyToken, authorizeRoles('ParkingManager'), getUserById);
router.put('/:id', verifyToken, authorizeRoles('ParkingManager'), updateUser);
router.delete('/:id', verifyToken, authorizeRoles('ParkingManager'), deleteUser);

module.exports = router;