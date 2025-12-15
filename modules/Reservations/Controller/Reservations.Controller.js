const ReservationsModel = require('../../../DB/Models/Reservations.model');
const ServicesModel = require('../../../DB/Models/Services.model');

const addReservation = async (req, res) => {
    try {
        const { name, phone, email, address, service } = req.body;

        // service is the service ID (MongoDB ObjectId) from req.body
        const serviceId = service;

        // Validate that the service exists
        const serviceExists = await ServicesModel.findById(serviceId);
        if (!serviceExists) {
            return res.status(404).json({ message: "Service not found" });
        }

        const reservation = await ReservationsModel.create({
            name,
            phone,
            email,
            address,
            service: serviceId  // Store only the service ID
        });

        // Populate service data for response
        const populatedReservation = await ReservationsModel.findById(reservation._id)
            .populate('service');

        res.status(201).json({
            message: "Reservation created successfully",
            data: populatedReservation
        });
    } catch (err) {
        res.status(500).json({ message: "Internal Server Error", Error: err.message });
    }
}

const getAllReservations = async (req, res) => {
    try {
        const total = await ReservationsModel.countDocuments();
        const reservations = await ReservationsModel.find({})
            .populate('service');

        res.status(200).json({
            message: "Reservations fetched successfully",
            total,
            data: reservations
        });
    } catch (err) {
        res.status(500).json({ message: "Internal Server Error", Error: err.message });
    }
}

const getReservation = async (req, res) => {
    try {
        const id = req.params.id;
        const findReservation = await ReservationsModel.findById(id)
            .populate('service');

        if (!findReservation) {
            return res.status(404).json({ message: "Reservation not found" });
        }

        res.status(200).json({
            message: "Reservation fetched successfully",
            data: findReservation
        });
    } catch (err) {
        res.status(500).json({ message: "Internal Server Error", Error: err.message });
    }
}

const updateReservation = async (req, res) => {
    try {
        const id = req.params.id;
        const { name, phone, email, address, service } = req.body;

        const reservation = await ReservationsModel.findById(id);
        if (!reservation) {
            return res.status(404).json({ message: "Reservation not found" });
        }

        // service is the service ID (MongoDB ObjectId) from req.body
        // If service is being updated, validate it exists
        if (service) {
            const serviceExists = await ServicesModel.findById(service);
            if (!serviceExists) {
                return res.status(404).json({ message: "Service not found" });
            }
        }

        const updateData = {};
        if (name !== undefined) updateData.name = name;
        if (phone !== undefined) updateData.phone = phone;
        if (email !== undefined) updateData.email = email;
        if (address !== undefined) updateData.address = address;
        if (service !== undefined) updateData.service = service; // Store only the service ID

        const updatedReservation = await ReservationsModel.findByIdAndUpdate(
            id,
            updateData,
            { new: true }
        ).populate('service');

        return res.status(200).json({
            message: "Reservation updated successfully",
            data: updatedReservation
        });
    } catch (err) {
        res.status(500).json({ message: "Internal Server Error", Error: err.message });
    }
};

const deleteReservation = async (req, res) => {
    try {
        const reservation = await ReservationsModel.findById(req.params.id);
        if (!reservation) {
            return res.status(404).json({ message: "Reservation not found" });
        }

        const deletedReservation = await ReservationsModel.findByIdAndDelete(req.params.id);
        res.status(200).json({
            message: "Reservation deleted successfully",
            data: deletedReservation
        });
    } catch (err) {
        res.status(500).json({ message: "Internal Server Error", Error: err.message });
    }
}

module.exports = {
    addReservation,
    getAllReservations,
    getReservation,
    updateReservation,
    deleteReservation
}

