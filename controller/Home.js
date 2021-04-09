var Product=require('../model/ProductM');


exports.index=function (req,res) {
 
    res.render('index.ejs',{
        session:req.session,
       
    });
}

exports.view=function (req,res) {

  console.log(req.query.search);
  var search_input=req.query.search;
Product.find({$or:[{description:{$regex:search_input,$options:"$i"}},{title:{$regex:search_input,$options:"$i"}}]},function (err,result) {
  if (result.length!=0) {
    //res.send(result)
    return  res.redirect('/product-list');
  }

  else{
    console.log(err)
 return  res.redirect('/');
  }
 
})

 
}