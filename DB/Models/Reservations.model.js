const mongoose = require('mongoose');

const ReservationsSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    service: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'services',
        required: true
    }
}, { timestamps: true });

const ReservationsModel = mongoose.model('reservations', ReservationsSchema);
module.exports = ReservationsModel;

