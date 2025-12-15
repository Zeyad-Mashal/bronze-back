const mongoose = require('mongoose');
const { image } = require('../../config/cloudinary');
const { type } = require('node:os');
const ServicesSchema = mongoose.Schema({
    images: [
        {
        url: {type: String, required: true},
        public_id: {type: String, required: true},
    }],
    title: {
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
},{timestamps: true});

const ServicesModel = mongoose.model('services', ServicesSchema);
module.exports = ServicesModel;

