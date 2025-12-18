const express = require('express');
const router = express.Router();
const { addService, getService, getAllServices, updateService, deleteService } = require('./Controller/Services.Controller');
// const { auth } = require('../../Middlewares/Auth.middleware');
const { uploadServices } = require('../../middleware/upload');
const multer = require('multer');

// Error handling middleware for multer
const handleMulterError = (err, req, res, next) => {
    // Set CORS headers
    const origin = req.headers.origin;
    res.header('Access-Control-Allow-Origin', origin || '*');
    res.header('Access-Control-Allow-Credentials', 'true');
    
    if (err instanceof multer.MulterError) {
        if (err.code === 'LIMIT_FILE_SIZE') {
            return res.status(413).json({ 
                message: 'File too large. Maximum file size is 4MB per file.', 
                Error: err.message 
            });
        }
        if (err.code === 'LIMIT_FILE_COUNT') {
            return res.status(400).json({ 
                message: 'Too many files. Maximum 10 files allowed.', 
                Error: err.message 
            });
        }
        if (err.code === 'LIMIT_UNEXPECTED_FILE') {
            return res.status(400).json({ 
                message: 'Unexpected file field', 
                Error: err.message 
            });
        }
        return res.status(400).json({ 
            message: 'Upload error', 
            Error: err.message 
        });
    }
    if (err) {
        // Check if it's a payload too large error
        if (err.status === 413 || err.message.includes('too large') || err.message.includes('413')) {
            return res.status(413).json({ 
                message: 'Request payload too large. Total request size must be under 4.5MB. Try uploading fewer or smaller images.', 
                Error: err.message 
            });
        }
        return res.status(400).json({ 
            message: 'File upload error', 
            Error: err.message 
        });
    }
    next();
};

router.post('/addService', uploadServices.array('images', 10), handleMulterError, addService);
router.get('/getService/:id', getService);
router.get('/getAllServices', getAllServices);
router.put('/updateService/:id', uploadServices.array('images', 10), handleMulterError, updateService);
router.delete('/deleteService/:id', deleteService);

module.exports = router;