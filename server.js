let express = require('express');
let app = express();

let server = require('http').Server(app);
let io = require('socket.io')(server);

let webpack = require('webpack');
let path = require('path');
let bodyParser = require('body-parser');

let mongoose = require('mongoose');

let expressJwt = require('express-jwt');
let jwt = require('jsonwebtoken');


let Twitter = require('twitter');
let twitterConfig = require('./config');

let config = require('./webpack.config');
let compiler = webpack(require('./webpack.config'));
let api = require('./api');
let { db_url } = require('./config');
let { secret } = require('./config');
let twitterClient = new Twitter(twitterConfig);

let UserModel = require('./models/UserModel');
let ConversationModel = require('./models/ConversationModel');
let MessageModel = require('./models/MessageModel');
//Set up default mongoose connection

mongoose.connect(db_url);
// Get Mongoose to use the global promise library
mongoose.Promise = global.Promise;
//Get the default connection
let db = mongoose.connection;

let ioEvents = require('./utils/io');

db.on('error', console.error.bind(console, 'MongoDB connection error:'));

db.on('connection', console.error.bind(console, 'MongoDB connected'));

app.use(require('webpack-dev-middleware')(compiler, {
    noInfo: true,
    publicPath: config.output.publicPath,
    hot: true
}));

app.use(require('webpack-hot-middleware')(compiler));


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true,
    limit: '5mb'
}));

app.post('/login', function (request, response) {

    let username = request.body.username;
    let password = request.body.password;

    UserModel.findOne({ username: username, password: password }, function (error, user) {
        if (!error && user) {

            let profile = {
                username: user.username,
                email: user.email,
                id: user._id
            }
            const token = jwt.sign(profile, secret);
            response.status(200).json({ token });
        }
        else {

            response.status(401).send('Invalid username or password');
        }
    });
});


app.use('/api', expressJwt({ secret: secret }), function (request, response, next) {
    next();
}, api);



app.get('*', function (req, res) {
    res.sendFile(path.join(__dirname, 'build/index.html'));
});


io.on('connection', client => {

    ioEvents(client);
});

app.use(function (err, req, res, next) {
    if (err.name === 'UnauthorizedError') {
        return res.status(403).send({
            success: false,
            message: 'No token provided.'
        });
    }
});

let port = process.env.PORT || 4000;
server.listen(port, () => {
    console.log(`Listening on port ${port}`);
})


