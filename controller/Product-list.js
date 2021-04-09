const Product = require("../model/ProductM");
const router = require("../routes");
const wishData = require('../model/WishlistM');
exports.index=function (req,res) {
  var options = {
    sort: { date: -1 },
    populate: 'users',
    lean: true,
    offset: 10, 
    limit: 6
  };
  Product.find(function (err,docs) {

 Product.paginate({},options,function (error,result) {
   if (error) {
     console.log(error)
   }
   for (let i = 0; i < result.length; i++) {
     const rid = result[i]._id;
     console.log(rid)
     
   }
   
  var userId=req.session._id;
  wishData.find({user:userId}).populate('user').exec(function (err1,wresult) {
      if (err1) {
          console.log(err1)
      }
      
        var wid;
        wresult.forEach(wresult1=>{
  wid=wresult1.productId
  console.log("wid", wid);
}); 
  
 // console.log("wid", wid)
    
     
 res.render('product-list.ejs', { title: 'pagination',result:result.docs,total:result.total,limit:result.limit,
 page:result.page,
 pages:result.pages,
 data:docs,
 session:req.session,

 expressFlash: req.flash('info')


})

  })
    })
  });
    
}

exports.show=function (req,res) {
  var page=req.params.page ||1;
  var r_limit=req.params.limit ||2;
var limit=parseInt(r_limit);
console.log(limit)
Product.find(function (err,docs) {

Product.paginate({},{page:page,limit:limit},function (err,result) {

  var userId=req.session._id;
  wishData.find({user:userId}).populate('user').exec(function (err1,wresult) {
      if (err1) {
          console.log(err1)
      }
      var wid;
      wresult.forEach(wresult1=>{
wid=wresult1.productId
      });




  res.render('product-list.ejs', { title: 'pagination',result:result.docs,total:result.total,limit:result.limit,
  page:page,
  pages:result.pages,
  data:docs,

  session:req.session,
  expressFlash: req.flash('info')
});

});
});
})
}