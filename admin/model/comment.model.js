const mongoose = require('mongoose');
var mongoosePaginate = require('mongoose-paginate');
var CommentsSchema = new mongoose.Schema({ 
    title: String,
    text:String,
    cateId:mongoose.Schema.ObjectId
 });

 CommentsSchema.plugin(mongoosePaginate);
module.exports = mongoose.model('Comment', CommentsSchema);