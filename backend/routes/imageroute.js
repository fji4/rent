//var Image = require('../models/imageSchema'),
var    express= require('express'),
    multer = require('multer'),
    mongoose = require('mongoose'),
    router= express.Router();


var ImageSchema = mongoose.Schema({
    path: {
        type: String,
        required: true,
        trim: true
    },
    originalname: {
        type: String,
        required: true
    }

});

var Image = module.exports = mongoose.model('files', ImageSchema);
router.getImages = function(callback, limit) {

    Image.find(callback).limit(limit);
};

router.getImageById = function(id, callback) {

    Image.findById(id, callback);

};

router.addImage = function(image, callback) {
    Image.create(image, callback);
};

var storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, 'public/')
    },
    filename: function(req, file, cb) {
        cb(null, file.originalname);
    }
});

var upload = multer({
    storage: storage
});

// router.get('/', function(req, res, next) {
//     res.render('index.ejs');
// });


router.post('/', upload.any(), function(req, res, next) {

    res.send(req.files);

    /*req.files has the information regarding the file you are uploading...
    from the total information, i am just using the path and the imageName to store in the mongo collection(table)
    */
    console.log ("check", req.files[0].path);
    var path = req.files[0].path;
    var imageName = req.files[0].originalname;

    var imagepath = {};
    imagepath['path'] = path;
    imagepath['originalname'] = imageName;

    //imagepath contains two objects, path and the imageName

    //we are passing two objects in the addImage method.. which is defined above..
    router.addImage(imagepath, function(err) {

    });

});

module.exports = router;