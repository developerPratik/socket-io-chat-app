
let ChatModel = require('./ChatModel');

module.exports =  (database) => {


    return ({
        // User: UserModel(database)
        Chat: ChatModel(database)
    })

}