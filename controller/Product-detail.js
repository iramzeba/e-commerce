const Product = require("../model/ProductM");
var cartData = require("../model/CartSchema");
var Cart=require("../model/CartM");
var {check ,validationResult} = require('express-validator/check');
exports.index=function (req,res) {
    var productId=req.params.id;
    var goto;
    //var cart=new Cart(req.session.cart ? req.session.cart : {})
   Product.findById(productId,function (err,result) {
       if (err) {
           console.log(err)
       }
       if (req.session.loggedIn) {
    //     var userId=req.session._id;
    //        cartData
    //        .find({ 
    //            $and: [
    //         { user: userId},
    //         { _id: productId}
    //      ]
    //     })
    //        .populate('user')
    //        .exec(function (error,doc) {
    //            if (error) {
    //                console.log(error)
    //            }
               
    //                console.log(doc);
               
    //            var cart;
    //            doc.forEach(order => {
    //  cart=new Cart(order.cart);
    //  order.items=cart.generateArray();
    //   //console.log(cart.items[productId])

    // order.items.forEach(docs=>{
    //    // var id= docs.items._id;
    //     //console.log(cart.items[productId].id)
    // })
    //            });
    //        })

        
    var userId=req.session._id;
       
    cartData

    .find({
      
            user: userId
        
        
      })
    .populate('user')
    .exec(function(err, orders) {
      if(err) console.log(err)
      var cart;
//console.log(orders)
orders.forEach(result=>{
cart=new Cart(result.cart);
result.items=cart.generateArray();
 result.items.forEach(function(docs){
    // var id = (docs.item.productId)
  

if (docs.id == productId) {
   goto=true;
 
    console.log("is ", goto)
}
else{
goto = false;
console.log(goto)
}



 });
 });
   
           
        
     // })

      // }
      //  else{
       
      //      if (cart.items[productId].id== productId) {

            
      //          goto=true;

      //      }

      //     else{
          
      //       goto=false;
      //      }
       
       
    res.render('product-detail.ejs',{
        session:req.session,
        title:result.title,
        description:result.description,
       image_path:result.imagePath,
       price:result.price,
       id:result._id,
       goto:goto
    
    })


  // }

   
           
        
     })

       }

   })
    
}