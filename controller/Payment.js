var mongoose = require('mongoose');
var Cart=require("../model/CartM");
var cartData=require("../model/CartSchema");
exports.index=function(req,res){
    var userId=req.session._id;
    cartData

    .find({user:userId})
    .populate('user')
    .exec(function(err, orders) {
      if(err) console.log(err);

      var cart;
          orders.forEach(order => {
cart=new Cart(order.cart);
order.items=cart.generateArray();
          });
          console.log(cart.totalPrice)
    if (cart ==null || cart === "") {
        res.redirect('/view-cart')
    }
    res.render('payment.ejs',{
        session:req.session,
        total:cart.totalPrice
    })
});
}

exports.add=function (req,res) {
    console.log("post payment")
    var stripe = require('stripe')(
        'sk_test_51IZF0ZSDp7nTaKRfiyTbatMnNEBzZxuWcxH61PkfSCbPVQierBPv0bzol2ZeynTMMGSnFwNQ0LWRzKwqbtLuiMMX00lHDl9Hw0'
    );
    var userId=req.session._id;
    cartData

    .find({user:userId})
    .populate('user')
    .exec(function(err, orders) {
      if(err) console.log(err);

      var cart;
          orders.forEach(order => {
cart=new Cart(order.cart);
order.items=cart.generateArray();

    var id = (order._id)

    stripe.charges.create({
        amount: cart.totalPrice * 100,
        currency: 'inr',
        source: req.body.stripeToken,
        description: 'My First Test Charge '
      },function (error,charge) {
          if (error) {
              console.log(error)
          }
          console.log(charge);
          console.log("id",id)
          cartData .findByIdAndRemove(
              
              
               id
              
          
             
              ,function(err1, result) {
      
         
              if (err1) {
                  console.log(err1)
               
              }
              console.log(result)
          })
          

        })
 
          res.redirect('/')
      });

    });


}