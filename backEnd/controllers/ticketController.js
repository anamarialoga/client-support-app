const asyncHandler = require('express-async-handler');
const User = require('../models/userModel');
const Ticket = require('../models/ticketModel');

// @desc Get user tickets
// @route /api/tickets
// @access Protected
// GET
const getTickets = asyncHandler(async (req, rsp) => {

    const user = await User.findById(req.user.id);

    if(!user){
        console.log('User not found');
        return rsp.status(404).send({message: 'User not found'});
    }
    const tickets = await Ticket.find({user: req.user.id})
    if(tickets.length>0) {
        rsp.status(200).json(tickets);
    }else{
        console.log('Currently there are no tickets')
        rsp.status(200).json({message: 'Currently there are no tickets'})
    }   
})


// @desc Create a ticket
// @route /api/tickets
// @access Protected
// POST
const createTicket = asyncHandler(async (req, rsp) => {
    //destructure the ticket schema => for creating a ticket
    //the user will be set by the currenly connected user
    const {product, description}= req.body;

    if(!product || !description){
        console.log('Invalid Input')
        return rsp.status(400).send({message: 'Invalid Input'});
    }

    const user = await User.findById(req.user.id);

    if(!user){
        console.log('User not Connected');
        return rsp.status(404).send({message: 'User not Connected'});
    }

    const ticket = await Ticket.create({
        product, 
        description, 
        user: req.user.id, 
        status: 'new'
    })

    return rsp.status(200).json(ticket);
})


module.exports= {getTickets, createTicket};