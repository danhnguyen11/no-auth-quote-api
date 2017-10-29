var mongoose = require('mongoose');

var Quote = mongoose.model('Quote', {
    content: { type: String, required: true, trim: true},
    author: { type: String, required: true, trim: true}
});

module.exports = {
    Quote
};