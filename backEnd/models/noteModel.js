const mongoose=require('mongoose'); 

const noteSchema = mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId, //Relationship between user and notes
        required: true,
        ref: 'User' 
    },
    ticketId: {
        type: mongoose.Schema.Types.ObjectId, //Relationship between ticket and notes
        required: true,
        ref: 'Ticket' 
    },
    text: {
        type: String,
        required: [true, 'Please add some notes'],
    },
    isStaff:{
        type: Boolean,
        default: false,
    },
    staffId: {
        type: String,
    }
},
    {
        timestamps: true,
    }
)

module.exports = mongoose.model('Note', noteSchema);