const mongoose = require('mongoose');
const sequence = require("mongoose-sequence")(mongoose);

const schema = new mongoose.Schema({
    _id: Number,
    fullname: String,
    email: {type: String , unique: true},
    password: {type:String , select : false},
    image: String,
    role: String
});

schema.plugin(sequence,{id: 'teacher_counter'});

// schema.plugin(sequence, { inc_field: '_id' });

module.exports = mongoose.model("teachers", schema);
