var mongoose=require('mongoose'),
 passportLocalMongoose = require('passport-local-mongoose'),
autoIncrement = require('mongoose-sequence')(mongoose);

var userSchema =new mongoose.Schema({

   fullname: {
      type  :String,
      required:[true, "can't be blank"],
      trim: true,
    },
    username: {
        type  :String,
        required:[true, "can't be blank"],
        minLength: [4, 'username is too short!'],
        maxlength: 10,
        trim: true,
      },
      email: {
        type  :String,
        required:[true, "can't be blank"],
        uinque:[true, "should be unique"],
        trim: true,
      },
      password: {
        type  :String,
        required:[true, "can't be blank"],
        minLength: [4, 'password is too short!'],
        maxlength: 10,
      },
      mobile: {
        type  :Number,
        required:[true, "can't be blank"],
        uinque:[true, "should be unique"],
        min: 9,
       
        trim: true,
      },
      gender:{
        type:String
      },
      date: { type: Date, default: Date.now },
});
userSchema.plugin(autoIncrement,{inc_field:'user_id'});
userSchema.plugin(passportLocalMongoose);
var User=mongoose.model('stores',userSchema);
module.exports=User;