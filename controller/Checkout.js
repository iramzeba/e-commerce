var Daddress=require('../model/DeliveryM'),
path = require('path'),
view_dirname=('../views'),
{check ,validationResult} = require('express-validator/check');
var Cart=require("../model/CartM");
var cartData=require("../model/CartSchema");
var mongoose = require('mongoose');
const { connected } = require('process');
const { update } = require('./Profile');
exports.index=function (req,res) {
    var cart=new Cart(req.session.cart ? req.session.cart : {})
    if(req.session.loggedIn){
      
        var userId=req.session._id;
       
        cartData

        .find({user:userId})
        .populate('user')
        .exec(function(err, orders) {
          if(err) console.log(err);
          //this will log all of the users with each of their posts 
          else //console.log("data",orders);
          cartData.aggregate([{$match:{user:mongoose.Types.ObjectId(userId)}},{$group:{_id:null,"total":{$sum:"$cart.totalPrice"},"Qty":{$sum:"$cart.totalQty"}}}],function (errors,data) {
              if(errors){
console.log(errors);

              }
              else{
                  //console.log("data",data)
              }
         
          var cart;
          orders.forEach(order => {
cart=new Cart(order.cart);
order.items=cart.generateArray();
          });
          if (cart ==null || cart === "") {
            res.redirect('/view-cart')
        }
Daddress.find({user:userId})
.populate('user')
.exec(function (error1,result1) {
    if (error1) {
        res.json({msg:'error'});
    }
    
    //console.log(result1)


          res.render('checkout.ejs',{
           session:req.session,
           orders:orders,
data:data,
result1:result1
})
          })
        }) 
    })
        }
    // res.render('checkout.ejs',{
        
    // })
}

exports.deliveryAdd=
[
    check('name')
    .not()
    .isEmpty()
    .withMessage('name is required'),


check('mobile', 'mobile must be at least 10 digits long ')
            .isLength({min:10})
            
,(req,res)=>{



    var errors = validationResult(req);
    if (!errors.isEmpty()) {
        console.log("rrr",errors)
        const alert =errors.array()
       // return res.status(422).json({ errors: errors.mapped() });
        res.render('checkout.ejs',{
           
            alert,
            hasError: true,
            validationErrors: errors.array(),
            
            
           
 
 
            
        
        });
    }

    else{
//console.log("data",req.body);

var address = new Daddress({
    user:req.session._id,
    name:req.body.name,
    mobile:req.body.mobile,
    address: req.body.address,
    state:req.body.state,
    city:req.body.city,
    landmark:req.body.landmark,
    pincode:req.body.pincode,
    locationType:req.body.locationType
})
address.save(function (err,result) {
    if (err) {
        res.json({msg:'error'});
    }
    res.json({msg:'success'});
//res.redirect('/checkout')
})
    }
}

]

exports.removeAddress= function (req,res) {
    Daddress.deleteOne({'_id':req.body.id},(err,removdata)=>{
        if (err) {
            res.json({msg:'error'})
        }
        else{
            res.json({msg:'success'})
        }
    })
}

exports.editAdrress=function (req,res) {
    var id = req.params.id;
    
    Daddress.findById(id,(err,editdata)=>{
        if (err) {
            res.send(err);
        }

        console.log(editdata)
       res.render('edit-address.ejs',{
           session:req.session,
        editdata:editdata
       })
    })
}

exports.updateAdrress = [
    check('name')
    .not()
    .isEmpty()
    .withMessage('name is required'),


check('mobile', 'mobile must be at least 10 digits long ')
            .isLength({min:10})
            
,(req,res)=>{



    var errors = validationResult(req);
    if (!errors.isEmpty()) {
        console.log("rrr",errors)
        const alert =errors.array()
       // return res.status(422).json({ errors: errors.mapped() });
        res.render('edit-address.ejs',{
           
            alert,
            hasError: true,
            validationErrors: errors.array(),
            
            
           
 
 
            
        
        });
    }

    else{
//console.log("data",req.body);
var id = req.params.id;
var address = new Daddress({
    user:req.session._id,
    name:req.body.name,
    mobile:req.body.mobile,
    address: req.body.address,
    state:req.body.state,
    city:req.body.city,
    landmark:req.body.landmark,
    pincode:req.body.pincode,
    locationType:req.body.locationType
})
Daddress.findByIdAndUpdate(id,req.body,(err,result)=>{
    if (err) {
        console.log(err)
    }
    
        console.log(result)
    
    res.redirect('/checkout')
})
    }
}

]
