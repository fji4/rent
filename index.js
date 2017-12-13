const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const passport = require('passport');
const config = require('./config');
const User = require('./');
var flash = require('connect-flash');
const router = express.Router();
const cookieSession = require('cookie-session');
const cookieParser = require('cookie-parser');

app.use(express.static('./backend/static/'));
app.use(express.static('./frontend/dist/'));

app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(bodyParser.json());
////////

var allowCrossDomain = function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods", "POST, GET, PUT, DELETE, OPTIONS");
    next();
};
app.use(allowCrossDomain);




//////////
// Static routes
app.route('/').get(function(req, res) {
  return res.sendFile(path.join(__dirname, './backend/static/index.html'));
});
app.route('/login').get(function(req, res) {
  return res.sendFile(path.join(__dirname, './backend/static/index.html'));
});
app.route('/register').get(function(req, res) {
  return res.sendFile(path.join(__dirname, './backend/static/index.html'));
});
app.route('/dashboard').get(function(req,res) {
  return res.sendFile(path.join(__dirname, './backend/static/index.html'));
});
app.route('/home').get(function(req,res) {
    return res.sendFile(path.join(__dirname, './backend/static/index.html'));
});
app.route('/sublease').get(function(req,res) {
    return res.sendFile(path.join(__dirname, './backend/static/index.html'));
});
app.route('/watchlist').get(function(req,res) {
    return res.sendFile(path.join(__dirname, './backend/static/index.html'));
});
app.route('/list').get(function(req,res) {
    return res.sendFile(path.join(__dirname, './backend/static/index.html'));

})
app.route('/account').get(function (req, res) {
    return res.sendFile(path.join(__dirname, './backend/static/index.html'));
})
app.route('/notifications').get(function (req, res) {
    return res.sendFile(path.join(__dirname, './backend/static/index.html'));
})
app.route('/searchlist').get(function (req, res) {
    return res.sendFile(path.join(__dirname, './backend/static/index.html'));
})

app.route('/detail').get(function (req, res) {
    return res.sendFile(path.join(__dirname, './backend/static/index.html'));
})


/* New things ================================================================ */

require('./backend/models').connect(config.dbUri);
require('./backend/auth/passport')(passport);

// Initialize cookie sessions
app.use(cookieParser());
app.use(cookieSession({
  keys: ['asdf', 'asdf']
}));
app.use(flash());

// Initialize Passport
app.use(passport.initialize()); // Create an instance of Passport
app.use(passport.session());

// Get our routes
app.use('/api', require('./backend/routes/api')(router, passport));

///// test image route
app.use('/image', require('./backend/routes/imageroute'));

var imgroutes= require('./backend/routes/imageroute');
//URL : http://localhost:3000/images/
// To get all the images/files stored in MongoDB
app.get('/images', function(req, res) {
//calling the function from index.js class using routes object..
    imgroutes.getImages(function(err, genres) {
        if (err) {
            throw err;

        }
        res.json(genres);

    });
});

// URL : http://localhost:3000/images/(give you collectionID)
// To get the single image/File using id from the MongoDB
app.get('/images/:id', function(req, res) {

//calling the function from index.js class using routes object..
    imgroutes.getImageById(req.params.id, function(err, genres) {
        if (err) {
            throw err;
        }
//res.download(genres.path);
        res.send(genres.path)
    });
});

/* =========================================================================== */

// start the server
app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000 or http://127.0.0.1:3000');
});
