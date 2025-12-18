const express = require('express');
const router = express.Router();
const { addService, getService, getAllServices, updateService, deleteService } = require('./Controller/Services.Controller');
// const { auth } = require('../../Middlewares/Auth.middleware');
const { uploadServices } = require('../../middleware/upload');
const multer = require('multer');

// Error handling middleware for multer
const handleMulterError = (err, req, res, next) => {
    if (err instanceof multer.MulterError) {
        if (err.code === 'LIMIT_FILE_SIZE') {
            return res.status(400).json({ message: 'File too large', Error: err.message });
        }
        if (err.code === 'LIMIT_FILE_COUNT') {
            return res.status(400).json({ message: 'Too many files', Error: err.message });
        }
        if (err.code === 'LIMIT_UNEXPECTED_FILE') {
            return res.status(400).json({ message: 'Unexpected file field', Error: err.message });
        }
        return res.status(400).json({ message: 'Upload error', Error: err.message });
    }
    if (err) {
        return res.status(400).json({ message: 'File upload error', Error: err.message });
    }
    next();
};

router.post('/addService', uploadServices.array('images', 10), handleMulterError, addService);
router.get('/getService/:id', getService);
router.get('/getAllServices', getAllServices);
router.put('/updateService/:id', uploadServices.array('images', 10), handleMulterError, updateService);
router.delete('/deleteService/:id', deleteService);

module.exports = router;