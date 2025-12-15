const express = require('express');
const router = express.Router();
const { addReservation, getAllReservations, getReservation, updateReservation, deleteReservation } = require('./Controller/Reservations.Controller');
// const { auth } = require('../../Middlewares/Auth.middleware');

router.post('/addReservation', addReservation);
router.get('/getReservation/:id', getReservation);
router.get('/getAllReservations', getAllReservations);
router.put('/updateReservation/:id', updateReservation);
router.delete('/deleteReservation/:id', deleteReservation);

module.exports = router;

