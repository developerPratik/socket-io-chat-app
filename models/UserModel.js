let Schema = require('mongoose').Schema;

let UserSchema =  new Schema({
    username: String,
    email: String,
    password: String,
    conversations: Schema.Types.Array,
    blocked: Schema.Types.Array
});

let UserModel = require('mongoose').model('User', UserSchema, 'Users');
module.exports = UserModel;


