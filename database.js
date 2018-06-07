const mongoose = require('mongoose');
const {db_url} = require('./config');

var db = mongoose.createConnection(db_url);


module.exports = db;