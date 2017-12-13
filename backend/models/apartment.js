var mongoose = require('mongoose');

var apartmentSchema = mongoose.Schema({
    location: {type:String,required: true},
    city: {type:String, required: true},
    price: {type:String,required: true},
    assignedOwner: String,
    gender: String,
    contactPhone: {type:String, default:""},
    contactEmail: {type: String, default:""},
    description: String,
    datePosted: {type: Date, default: Date.now()},
    dateStarted: {type: Date, required: true},
    dateEnd: {type: Date, required: true},
    completed:{type:Boolean, default: false},
    img : {type:[String], default: []},
    // author: {
    //     id: {
    //         type: mongoose.Schema.Types.ObjectId,
    //         ref: 'User'
    //     },
    //     username: String,
    //     img: String
    // }

});

module.exports= mongoose.model('Apartment',apartmentSchema);
