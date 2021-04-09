var mongoose=require('mongoose');
var mongoosePaginate=require('mongoose-paginate')
var productSchema=new mongoose.Schema({
    
imagePath:{type:String, required:true},
title:{type:String, required:true},
description:{type:String,required:true},
price:{type:Number,required:true},
size:{type:String},
color:{type:String}

});
productSchema.plugin(mongoosePaginate);

var Product=mongoose.model('products',productSchema);
module.exports=Product;
