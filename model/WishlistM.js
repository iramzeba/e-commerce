var mongoose=require('mongoose');
 
var Schema=mongoose.Schema;
var schema = new Schema({
    user  : { type: Schema.Types.ObjectId, ref: 'stores', required: true },
    productId:{ type: Schema.Types.ObjectId, ref: 'products', required: true },
    imagePath: { type: String, ref: 'products', required: true },
    title: { type: String, ref: 'products', required: true },
    price: { type: Number, ref: 'products', required: true },
    date: { type: Date, default: Date.now },
});

var  wishData = mongoose.model('wishes', schema);
module.exports=wishData;