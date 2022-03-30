const asyncHandler = require('express-async-handler');
const User = require('../models/userModel');
const Ticket = require('../models/ticketModel');
const Note = require('../models/noteModel');

// @desc Get notes for a ticket
// @route /api/tickets/:ticketId/notes
// @access Protected
// GET
const getNotes = asyncHandler(async (req, rsp) => {

    const user = await User.findById(req.user.id);

    if(!user){
        console.log('User not found');
        return rsp.status(404).send({message: 'User not found'});
    }

    const ticket = await Ticket.findById(req.params.ticketIdNotes)

    if(ticket.userId.toString() !== req.user.id){
        return rsp.status(401).json({message: 'Not Authorized'});
    }

    const notes = await Note.find({ticketId: req.params.ticketIdNotes})
    return rsp.status(200).json(notes);

})


// @desc Create a note for a ticket
// @route /api/tickets/:ticketId/notes
// @access Protected
// POST
const addNote = asyncHandler(async (req, rsp) => {

    const user = await User.findById(req.user.id);

    if(!user){
        console.log('User not found');
        return rsp.status(404).send({message: 'User not found'});
    }

    const ticket = await Ticket.findById(req.params.ticketIdNotes)

    if(ticket.userId.toString() !== req.user.id){
        return rsp.status(401).json({message: 'Not Authorized'});
    }

    const note = await Note.create({
        ticketId: req.params.ticketIdNotes,
        text: req.body.text,
        isStaff: false,
        userId: req.user.id,
    })
    return rsp.status(200).json(note);
})

 module.exports = {getNotes, addNote}