const express = require('express');
const router = express.Router();
const { addService, getService, getAllServices, updateService, deleteService } = require('./Controller/Services.Controller');
// const { auth } = require('../../Middlewares/Auth.middleware');
const { uploadServices } = require('../../middleware/upload');

router.post('/addService', uploadServices.array('images', 10), addService);
router.get('/getService/:id', getService);
router.get('/getAllServices', getAllServices);
router.put('/updateService/:id', uploadServices.array('images', 10), updateService);
router.delete('/deleteService/:id', deleteService);

module.exports = router;