var mongoose = require('mongoose');

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://dan:123456@ds127564.mlab.com:27564/quote_api');

module.exports = {
    mongoose
}