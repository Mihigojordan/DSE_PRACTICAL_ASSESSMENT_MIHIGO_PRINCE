const express = require('express');
const router = express.Router();

const {
    createVehicle,
    getAllVehicles,
    getVehicleById,
    updateVehicle,
    deleteVehicle
} = require('../controller/vehicle.controller');

const { verifyToken, authorizeRoles } = require('../middlewares/auth.middleware');

router.post('/', verifyToken, authorizeRoles('ParkingManager'), createVehicle);
router.get('/', verifyToken, authorizeRoles('ParkingManager'), getAllVehicles);
router.get('/:id', verifyToken, authorizeRoles('ParkingManager'), getVehicleById);
router.put('/:id', verifyToken, authorizeRoles('ParkingManager'), updateVehicle);
router.delete('/:id', verifyToken, authorizeRoles('ParkingManager'), deleteVehicle);

module.exports = router;