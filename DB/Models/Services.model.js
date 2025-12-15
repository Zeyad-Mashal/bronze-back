const mongoose = require('mongoose');

const ServicesSchema = mongoose.Schema({
    images: [
        {
            url: { type: String, required: true },
            public_id: { type: String, required: true },
        }
    ],
    name: {
        type: String,
        required: true
    },
    description: [{
        type: String,
        required: true
    }],
    price: {
        type: Number,
        required: true
    }
}, { timestamps: true });

const ServicesModel = mongoose.model('services', ServicesSchema);
module.exports = ServicesModel;

