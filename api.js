let api = require('express').Router();
let Axios = require('axios');
let MessageModel = require('./models/MessageModel');
let ConversationModel = require('./models/ConversationModel');
// let TodoModel = require('./models/TodoModel');



// api.get('/', function (request, response) {

//     response.json({
//         success: true
//     });

// });


// // get all todos from the database

// api.get('/todos', function (req, res) {

//     let TodoModel = req.model.Todo;

//     TodoModel.find({}, function(err, docs){
//         if(err) {
//             console.log(err);
//             res.sendStatus(500);
//         }
//         else res.json(docs);
//     })
// });


// // create a new todo in the database
// api.post('/todos', function (req, res) {

//     let todo = req.body;

//     let TodoModel = req.model.Todo;
//     let Todo = new TodoModel({
//         text: todo.text
//     });

//     Todo.save(function (err, todo) {

//         if (err) res.json({ err }).status(401);
//         else res.send(todo).status(200);
//     })
// });


// // update a todo from id
// api.post('/todos/:id', function (req, res) {


//     let id = req.params.id;

//     let updatedTodo = req.body;



// });


// api.put('/todos/:id', function(req, res){

//     // toggle a todo Id

// });

// api.post('complete/:day', function(req, res){
//     // complete all todos for {param} day
// }) 
api.get('/login', function(request, response){

    response.json({
        auth: false
    })
});




api.get('/messages/:conversationId', function (req, res) {
    let conversationId = req.params.conversationId;


    MessageModel.find({}, function (error, docs) {

        if(error) {

           
            res.json({messages: []})
        }
        else {res.json({messages: docs})};
    })
});

api.get('/conversations/:userId', function(req, res){

    let userId = req.params.userId;
 
    ConversationModel.find({participants: userId}, function(error, conversations){
        if(error){
        
            res.json({
                conversations: []
            })
        }
        else{
           
            res.json({
                conversations
            })
        }
    })
});






module.exports = api;