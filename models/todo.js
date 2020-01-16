var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var todoSchema = new Schema({
    title: {type: String, required: true},
    details: {type: String, default: 'Details'}
},{
    timestamps: true
});

module.exports = mongoose.model('Todo', todoSchema);