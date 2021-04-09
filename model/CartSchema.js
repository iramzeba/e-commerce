var mongoose=require('mongoose');
 
var Schema=mongoose.Schema;
var schema = new Schema({
    user  : { type: Schema.Types.ObjectId, ref: 'stores', required: true },
    cart:{type:Object,required:true},
   
    date: { type: Date, default: Date.now },
});

var  cartData = mongoose.model('carts', schema);
module.exports=cartData;