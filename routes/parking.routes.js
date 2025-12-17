const express = require('express');
const router = express.Router();
const {
    recordEntry,
    recordExit,
    viewActiveParking,
    viewVehicleHistory,
    viewUserHistory,
    dailyReport,
    monthlyReport
} = require('../controller/parking.controller');

const { verifyToken, authorizeRoles } = require('../middlewares/auth.middleware');

// ParkingManager routes
router.post('/entry', verifyToken, authorizeRoles('ParkingManager'), recordEntry);
router.post('/exit', verifyToken, authorizeRoles('ParkingManager'), recordExit);
router.get('/active', verifyToken, authorizeRoles('ParkingManager'), viewActiveParking);
router.get('/vehicle/:id', verifyToken, authorizeRoles('ParkingManager'), viewVehicleHistory);
router.get('/report/daily', verifyToken, authorizeRoles('ParkingManager'), dailyReport);
router.get('/report/monthly', verifyToken, authorizeRoles('ParkingManager'), monthlyReport);

// Normal user routes
router.get('/user/history', verifyToken, authorizeRoles('Driver', 'ParkingManager'), viewUserHistory);

module.exports = router;