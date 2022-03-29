
const express = require('express');
const {getTickets, createTicket, getTicket, delTicket, updateTicket} = require('../controllers/ticketController');
const { protect } = require('../middleware/authMiddleware');
const router = express.Router();


router.route('/').get(protect, getTickets).post(protect, createTicket);
// router.get('/', protect, getTickets);
// router.post('/', protect, createTicket);
router.route('/:ticketId').get(protect, getTicket).delete(protect, delTicket).put(protect, updateTicket);


module.exports= router;