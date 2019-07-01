const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/chat',{ useNewUrlParser: true });
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.Promise = global.Promise;

module.exports = mongoose;