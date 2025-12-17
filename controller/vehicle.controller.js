const VehicleModel = require('../models/vehicle.model');

const createVehicle = async(req, res) => {
    try {
        const { plate_number, vehicle_type, user_id } = req.body;

        if (!plate_number || !vehicle_type || !user_id) {
            return res.status(400).json({ message: 'All fields required' });
        }

        const existing = await VehicleModel.getByPlateNumber(plate_number);
        if (existing) {
            return res.status(400).json({ message: 'Vehicle already exists' });
        }

        const vehicleId = await VehicleModel.create({
            plate_number,
            vehicle_type,
            user_id
        });

        res.status(201).json({
            message: 'Vehicle created',
            vehicleId
        });
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
};

const getAllVehicles = async(req, res) => {
    try {
        const vehicles = await VehicleModel.getAll();
        res.json(vehicles);
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
};

const getVehicleById = async(req, res) => {
    try {
        const vehicle = await VehicleModel.getById(req.params.id);
        if (!vehicle) {
            return res.status(404).json({ message: 'Vehicle not found' });
        }
        res.json(vehicle);
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
};

const updateVehicle = async(req, res) => {
    try {
        const updated = await VehicleModel.update(req.params.id, req.body);
        if (!updated) {
            return res.status(404).json({ message: 'Vehicle not found' });
        }
        res.json({ message: 'Vehicle updated' });
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
};

const deleteVehicle = async(req, res) => {
    try {
        const deleted = await VehicleModel.delete(req.params.id);
        if (!deleted) {
            return res.status(404).json({ message: 'Vehicle not found' });
        }
        res.json({ message: 'Vehicle deleted' });
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
};

module.exports = {
    createVehicle,
    getAllVehicles,
    getVehicleById,
    updateVehicle,
    deleteVehicle
};