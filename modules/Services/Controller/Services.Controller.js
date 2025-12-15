const cloudinary = require('../../../config/cloudinary');
const ServicesModel = require('../../../DB/Models/Services.model');

const addService = async (req, res) => {
    try {
        const { name, description, price } = req.body;

        // Parse description if it's a string (JSON array)
        let descriptionArray = description;
        if (typeof description === 'string') {
            try {
                descriptionArray = JSON.parse(description);
            } catch (e) {
                // If not JSON, treat as single string and convert to array
                descriptionArray = [description];
            }
        }

        // Ensure description is an array
        if (!Array.isArray(descriptionArray)) {
            descriptionArray = [descriptionArray];
        }

        const images = req.files ? req.files.map(file => ({
            url: file.path,
            public_id: file.filename
        })) : [];

        const service = await ServicesModel.create({
            name,
            description: descriptionArray,
            price,
            images
        });

        res.status(201).json({ message: "Service created successfully", data: service });
    } catch (err) {
        res.status(500).json({ message: "Internal Server Error", Error: err.message });
    }
}

const getService = async (req, res) => {
    try {
        const id = req.params.id;
        const findService = await ServicesModel.findById(id);
        if (!findService) {
            return res.status(404).json({ message: "Service not found" });
        }
        res.status(200).json({ message: "Service fetched successfully", data: findService });
    } catch (err) {
        res.status(500).json({ message: "Internal Server Error", Error: err.message });
    }
}

const getAllServices = async (req, res) => {
    try {
        const total = await ServicesModel.countDocuments();
        const services = await ServicesModel.find({});
        res.status(200).json({
            message: "Services fetched successfully",
            total,
            data: services
        });
    } catch (err) {
        res.status(500).json({ message: "Internal Server Error", Error: err.message });
    }
}

const updateService = async (req, res) => {
    try {
        const id = req.params.id;
        const { name, description, price } = req.body;

        const service = await ServicesModel.findById(id);
        if (!service) {
            return res.status(404).json({ message: "Service not found" });
        }

        // Handle description update
        let descriptionArray = service.description;
        if (description !== undefined) {
            if (typeof description === 'string') {
                try {
                    descriptionArray = JSON.parse(description);
                } catch (e) {
                    // If not JSON, treat as single string and convert to array
                    descriptionArray = [description];
                }
            } else if (Array.isArray(description)) {
                descriptionArray = description;
            }
        }

        // Handle images update
        let images = service.images;
        if (req.files && req.files.length > 0) {
            // Delete old images from cloudinary
            for (let img of service.images) {
                if (img.public_id) {
                    await cloudinary.uploader.destroy(img.public_id);
                }
            }
            // Set new images
            images = req.files.map(file => ({
                url: file.path,
                public_id: file.filename
            }));
        }

        const updateData = {};
        if (name !== undefined) updateData.name = name;
        if (description !== undefined) updateData.description = descriptionArray;
        if (price !== undefined) updateData.price = price;
        if (req.files && req.files.length > 0) updateData.images = images;

        const updatedService = await ServicesModel.findByIdAndUpdate(
            id,
            updateData,
            { new: true }
        );

        return res.status(200).json({
            message: "Service updated successfully",
            data: updatedService
        });
    } catch (err) {
        res.status(500).json({ message: "Internal Server Error", Error: err.message });
    }
};

const deleteService = async (req, res) => {
    try {
        const service = await ServicesModel.findById(req.params.id);
        if (!service) {
            return res.status(404).json({ message: "Service not found" });
        }

        // Delete images from cloudinary
        for (let img of service.images) {
            if (img.public_id) {
                await cloudinary.uploader.destroy(img.public_id);
            }
        }

        const deletedService = await ServicesModel.findByIdAndDelete(req.params.id);
        res.status(200).json({
            message: "Service deleted successfully",
            data: deletedService
        });
    } catch (err) {
        res.status(500).json({ message: "Internal Server Error", Error: err.message });
    }
}

module.exports = {
    addService,
    getService,
    getAllServices,
    updateService,
    deleteService
}

