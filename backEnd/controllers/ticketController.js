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
    const tickets = await Ticket.find({userId: req.user.id})
    if(tickets.length>0) {
        rsp.status(200).json(tickets);
    }else{
        console.log('Currently there are no tickets')
        rsp.status(200).json({message: 'Currently there are no tickets'})
    }   
})


// @desc Get user ticket
// @route /api/tickets/:ticketid
// @access Protected
// GET
const getTicket = asyncHandler(async (req, rsp) => {

    const user = await User.findById(req.user.id);

    if(!user){
        console.log('User not found');
        return rsp.status(404).send({message: 'User not found'});
    }

    //acccess the id of the ticket from URL params;
    const ticket = await Ticket.findById(req.params.ticketId);

    if(!ticket) {
        return rsp.status(404).json({message: 'Ticket not found'});
    }

    //if the userId from the ticket obj doesn't match the id of the user that made the request
    if(ticket.userId.toString() !== req.user.id)
    {
        console.log('Not Authorized')
        return rsp.status(401).json({message: 'Not Authorized'})
    } 

    return rsp.status(200).json(ticket);
})


// @desc Delete user ticket
// @route /api/tickets/:ticketid
// @access Protected
// DELETE
const delTicket = asyncHandler(async (req, rsp) => {

    const user = await User.findById(req.user.id);

    if(!user){
        console.log('User not found');
        return rsp.status(404).send({message: 'User not found'});
    }

    //acccess the id of the ticket from URL params;
    const ticket = await Ticket.findById(req.params.ticketId);

    if(!ticket) {
        return rsp.status(404).json({message: 'Ticket not found'});
    }

    //if the userId from the ticket obj doesn't match the id of the user that made the request
    if(ticket.userId.toString() !== req.user.id)
    {
        console.log('Not Authorized')
        return rsp.status(401).json({message: 'Not Authorized'})
    } 

    await ticket.remove();

    return rsp.status(200).json({message: 'The ticket has been deleted'});
})

// @desc Update user ticket
// @route /api/tickets/:ticketid
// @access Protected
// PUT
const updateTicket = asyncHandler(async (req, rsp) => {

    const user = await User.findById(req.user.id);

    if(!user){
        console.log('User not found');
        return rsp.status(404).send({message: 'User not found'});
    }

    //acccess the id of the ticket from URL params;
    const ticket = await Ticket.findById(req.params.ticketId);

    if(!ticket) {
        return rsp.status(404).json({message: 'Ticket not found'});
    }

    //if the userId from the ticket obj doesn't match the id of the user that made the request
    if(ticket.userId.toString() !== req.user.id)
    {
        console.log('Not Authorized')
        return rsp.status(401).json({message: 'Not Authorized'})
    } 

    const updatedTicket = await Ticket.findByIdAndUpdate(req.params.ticketId, req.body, {new: true});

    return rsp.status(200).json(updatedTicket);
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
        userId: req.user.id, 
        status: 'new'
    })

    return rsp.status(200).json(ticket);
})


module.exports= {getTickets, createTicket, getTicket, delTicket, updateTicket};