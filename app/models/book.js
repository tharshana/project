var mongoose = require('mongoose');
//schema to our book details
var bookSchema = mongoose.Schema({
    vegetableId: {type: String},
    qty: {type: String},
    name: {type: String},
    email: {type: String},
    address: {type: String},
    phoneNumber: {type: Number},


});




module.exports = mongoose.model('book', bookSchema);
