
const Product = require("../model/ProductM");
var Cart=require("../model/CartM");
var cartData=require("../model/CartSchema");
var User=require("../model/Schema");
var mongoose = require('mongoose');
const { query } = require("express-validator/check");
exports.index=function (req,res) {
    var productId=req.params.id;
    req.session.productId=productId;
    console.log(productId);
    var cart=new Cart(req.session.cart ? req.session.cart : {})
    Product.findById(productId,function (err,result) {
        if (err) {
            console.log(err)
        }
 
cart.add(result,result._id);
req.session.cart=cart;
console.log("cccc",req.session.cart)
  if (req.session.loggedIn) {
    // res.redirect('/')
   var cart_add=new cartData({
    user:req.session._id,

       cart:cart
 
   })
   
   cart_add.save(function (err,results) {
       if (err) {
           console.log(err)
       }
       //console.log("usser",results)
       req.session.cart=null;
       res.redirect('/view-cart')
   })
  
 }
else{
res.redirect('/view-cart')
}
    // res.render('cart',{
    //     result:result,
    //     session:req.session,
    //     price:result.price,
    //     imagePath:result.imagePath,
    //     id:result._id,
    //     title:result.title
    // })
})
}

exports.show=function (req,res) {
  
    
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
                 
              }
         
          var cart;
          orders.forEach(order => {
cart=new Cart(order.cart);
order.items=cart.generateArray();
req.session.totalQty=data;

          });
          res.render('view-cart.ejs',{
           session:req.session,
           orders:orders,
data:data
          })
        }) 
    })
        }
        else{
  if (!req.session.cart) {
        return res.render('view-cartt',{
            products:null
        })
    }
     var cart=new Cart(req.session.cart);
     //console.log("show",cart)
     res.render('view-cartt',{
         session:req.session,
        
        products:cart.generateArray()
     })
        }
    
}

exports.reduce=function (req,res) {
    var pid = req.params.id;
    var cart = new Cart(req.session.cart ? req.session.cart : {} )
    cart.reduceByOne(pid);
    req.session.cart=cart;
    res.redirect('/view-cart')
}


exports.increase=function (req,res) {
    var pid=req.params.id;
   // console.log(pid);
    var cart=new Cart(req.session.cart ? req.session.cart : {})
   
    if (req.session.loggedIn) {
        
        var userId=req.session._id;
       
        cartData

        .find({
            $and: [
               { user: userId},
               { _id: pid}
            ]
          })
        .populate('user')
        .exec(function(err, orders) {
          if(err) console.log(err)

orders.forEach(result=>{
    cart=new Cart(result.cart);
    result.items=cart.generateArray();
    result.items.forEach(function(docs){
        var id = (docs.item._id)
    //console.log(cart.items[id].qty)

    cart.items[id].qty++;
    cart.items[id].price=cart.items[id].item.price * cart.items[id].qty;
    cart.totalQty++;
    cart.totalPrice+=cart.items[id].item.price
//console.log(cart)

cartData.findOneAndUpdate({$and: [
    { user: userId},
    { _id: pid}
 ]},{$set:{cart:cart}},function (error,data) {
   if (error) {
    console.log(error);
   }
    //console.log("update",data);

})
    //console.log(result.cart.items['602f706b20480b378ccf8165'].price);
});
});
       
                res.redirect('/view-cart')
            
         })
    }
    else{
    cart.addByOne(pid);
    req.session.cart=cart;
   
    res.redirect('/view-cart')
    }
}
//




exports.reduce=function (req,res) {
    var pid=req.params.id;
   // console.log(pid);
    var cart=new Cart(req.session.cart ? req.session.cart : {})
   
    if (req.session.loggedIn) {
        
        var userId=req.session._id;
       
        cartData

        .find({
            $and: [
               { user: userId},
               { _id: pid}
            ]
          })
        .populate('user')
        .exec(function(err, orders) {
          if(err) console.log(err)

orders.forEach(result=>{
    cart=new Cart(result.cart);
    result.items=cart.generateArray();
    result.items.forEach(function(docs){
        var id = (docs.item._id)
    //console.log(cart.items[id].qty)

    cart.items[id].qty--;
    cart.items[id].price=cart.items[id].item.price * cart.items[id].qty;
    cart.totalQty--;
    cart.totalPrice-=cart.items[id].item.price
//console.log(cart)

cartData.findOneAndUpdate({$and: [
    { user: userId},
    { _id: pid}
 ]},{$set:{cart:cart}},function (error,data) {
   if (error) {
    console.log(error);
   }
    //console.log("update",data);

})
    //console.log(result.cart.items['602f706b20480b378ccf8165'].price);
});
});
       
                res.redirect('/view-cart')
            
         })
    }
    else{
    cart.reduceByOne(pid);
    req.session.cart=cart;
   
    res.redirect('/view-cart')
    }
}



//

exports.deleteItem=function (req,res) {
    
    var pid=req.params.id;

    //console.log(pid)
    var cart=new Cart(req.session.cart ? req.session.cart : {})
    if (req.session.loggedIn) {
       
   req.session.cart=cart;
        cartData.findByIdAndRemove(pid,function (error,row) {
            if (error) {
                console.log(error)
            }
            else{
                console.log(row)
                res.redirect('/view-cart')
            }
        })
    }
    else{
        cart.delete(pid);
        req.session.cart=cart;
        res.redirect('/view-cart')
    }
   
  

    
}