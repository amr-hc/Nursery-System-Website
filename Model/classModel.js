const mongoose = require('mongoose');
const sequence = require("mongoose-sequence")(mongoose);

const schema = new mongoose.Schema({
    _id: Number,
    supervisor: {type: Number, ref:"teachers"},
    name: String,
    children: [{type: Number, ref:"childs"}],

});

schema.plugin(sequence,{id: 'class_counter'});


module.exports = mongoose.model("classes", schema);

