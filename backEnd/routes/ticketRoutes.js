
const express = require('express');
const {getTickets, createTicket} = require('../controllers/ticketController');
const { protect } = require('../middleware/authMiddleware');
const router = express.Router();


router.route('/').get(protect, getTickets).post(protect, createTicket);
// router.get('/', protect, getTickets);
// router.post('/', protect, createTicket);


module.exports= router;