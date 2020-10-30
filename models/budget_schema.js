const mongoose = require("mongoose")

const budgetSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        unique: true,
        uppercase: true
    }, 
    related_value: {
        type: Number,
        required: true,
        unique: false
    },
     color: {
        type: String,
        required: true,
        unique: true
     }
}, {collection: 'budget'})

module.exports = mongoose.model('budget', budgetSchema)