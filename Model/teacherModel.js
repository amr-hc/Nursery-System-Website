const mongoose = require('mongoose');
const sequence = require("mongoose-sequence")(mongoose);

const schema = new mongoose.Schema({
    _id: Number,
    fullname: String,
    email: {type: String , unique: true},
    password: {type:String , select : false},
    image: String,
});

schema.plugin(sequence,{id: 'teacher_counter'});


module.exports = mongoose.model("teachers", schema);
