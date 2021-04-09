var mongoose=require('mongoose');
var userSchema=new mongoose.Schema({
  user  : { type: mongoose.Schema.Types.ObjectId, ref: 'stores', required: true },
    name: {
        type  :String,
        required:[true, "can't be blank"],
        trim: true,
      },
      
        state: {
          type  :String,
          required:[true, "can't be blank"],
         
          trim: true,
        },
        city: {
          type  :String,
          required:[true, "can't be blank"],
         
        },
        mobile: {
          type  :Number,
          required:[true, "can't be blank"],
          uinque:[true, "should be unique"],
          min: 9,
         
          trim: true,
        },
        address:{
          type:String
        },
        landmark:{
            type:String
        },
        pincode: {
            type  :Number,
            required:[true, "can't be blank"],
          
           
            trim: true,
          },
          locationType:{
            type:String
            
          },
        date: { type: Date, default: Date.now },




})

var Daddress=mongoose.model('shipping-Address',userSchema);
module.exports=Daddress;