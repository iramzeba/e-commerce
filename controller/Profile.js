var path=require('path');
var view_dirname=('../views');
var User=require('../model/Schema');
var Daddress=require('../model/DeliveryM');
var mongoose=require('mongoose');


exports.account=function (req,res) {
   console.log (req.session._id);
   User.findById(req.session._id,(err,result)=>{
if (err) {
    console.log(err)
}

  Daddress.findById(req.session._id,(err1,resultAddress)=>{
      if (err1) {
          console.log(err1)
      }
      console.log(resultAddress)
  })
            res.render('my-account.ejs',{
                session: req.session,
                result:result
            })
        })
           
    }

   
    exports.update=function (req,res) {
        var data={
            fullname:req.body.fullname,
            username:req.body.username,
            email:req.body.email,
            mobile:req.body.mobile,
            gender:req.body.gender,
        
        }
        
var id=req.session._id ;
req.session.loggedIn=true;
        User.findByIdAndUpdate(id,{$set:data},function (err,result) {
            // if( !mongoose.Types.ObjectId.isValid(id) ) return false;
            console.log("id",data)
            if (err){ 
                console.log(err)
                res.send(err);
            } 
            else{ 
                req.session.email = result.email;
                        req.session.username = result.username;
                        req.session.user_id =result.user_id ;
                        req.session._id=result._id;

        //res.send('Done')
        res.redirect('/my-account')
            } 
        })
    }




    