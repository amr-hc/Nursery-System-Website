const mongoose = require('mongoose');
const sequence = require("mongoose-sequence")(mongoose);

const addressSchema = new mongoose.Schema({
    city:String,
    street:Number,
    building:Number
},{_id:false});

const schema = new mongoose.Schema({
    _id: Number,
    age: Number,
    fullname: String,
    level: String,
    image: String,
    address: addressSchema

});

schema.plugin(sequence,{id: 'child_counter'});

module.exports = mongoose.model("childs", schema);

