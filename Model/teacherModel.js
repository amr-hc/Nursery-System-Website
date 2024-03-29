const mongoose = require('mongoose');


const schema = new mongoose.Schema({
    fullname: String,
    email: {type: String , unique: true},
    password: {type:String , select : false},
    image: String,
});


module.exports = mongoose.model("teachers", schema);
