const mongoose = require('mongoose');
const sequence = require("mongoose-sequence")(mongoose);

const schema = new mongoose.Schema({
    _id: Number,
    supervisor: {type: Number, ref:"teachers"},
    name: String,
    children: [{type: Number, ref:"childs"}],

},{
    toJSON : {virtuals : true},
    toObject : {virtuals : true}
});


schema.virtual("count_children").get(function (){
    return this.children.length;
})


schema.plugin(sequence,{id: 'class_counter'});


module.exports = mongoose.model("classes", schema);

