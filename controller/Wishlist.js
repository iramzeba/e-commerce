const wishData = require("../model/WishlistM");
const Product = require("../model/ProductM");

var {check ,validationResult} = require('express-validator/check');


exports.addWish = function (req,res) {
    console.log("hi")
    var id = req.params.id;
    console.log("id", id);
Product.findById(id,function (err,data) {
    if (err) {
        console.log(err)
    }
  //  console.log("wishdata", data)


    var wish_add = new wishData({
        user: req.session._id,
        productId:data._id,
     title:data.title,
     imagePath:data.imagePath,
     price:data.price
    })
    wish_add.save(function (error,result) {
        if (error) {
            console.log(error)
        }
        //console.log(result)
    })
})
req.flash('info', 'Added to your Wishlist');
 res.redirect('/product-list')
}

exports.index=function (req,res) {
    var userId=req.session._id;
wishData.find({user:userId}).populate('user').exec(function (err,result) {
    if (err) {
        console.log(err)
    }
    
   // result.count(false, function(err, total){ console.log("total", total) })
    
    req.session.wish=result.length;
    res.render('wishlist.ejs',{
        session:req.session,
        result:result,
        header:'header'
    })
})
}


exports.deleteWish=function (req,res) {
    var id = req.params.id;
wishData.findByIdAndRemove(id,function (error,data) {
    if (error) {
        console.log(error)
    }

    res.redirect('/wishlist');
})
}