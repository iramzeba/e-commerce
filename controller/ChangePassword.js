var path=require('path');
var view_dirname=('../views');
var User=require('../model/Schema');
const { check, validationResult } = require('express-validator/check');
const { rejects } = require('assert');
// module.exports={

//     update:function (req,res,next) {
//         var password=req.body.password;
//         var new_password=req.body.new_password;
//         var confirm_password=req.body.confirm_password;
//         var id=req.session._id ;
//        [ check('password')
//         .not()
//         .isEmpty()
//         .withMessage('password is required'),
//         check('new_password', 'new_password is required')
//         .isEmpty(),
//         check('confirm_password', 'confirm Password is requried')
//         .isEmpty()
//     ]
//         var errors = validationResult(req);
//         if (!errors.isEmpty()) {
//             console.log("rrr",errors)
//             const alert1 =errors.array()
//            // return res.status(422).json({ errors: errors.mapped() });
//             res.render('my-account',{
               
//                 alert1
            
//             });
//         } else {
//             req.session.success = true;
//             res.render('my-account', {
              
               
//             });
//         }
    // if (!password) {
    //     res.json({success:false,message:'password was not given'})
    // }
    // else{
    //     if (!new_password) {
    //         res.json({success:false,message:' new password was not given'})
    //     }
    //     else{
    //         if (!confirm_password) {
    //             res.json({success:false,message:'confirm password was not given'})
    //         }
    //         else{
    //            if (new_password!== confirm_password) {
    //                var err= new Error('confirm password donot match');
    //                err.status=400;
    //                return next(err);
    //            }
    //            else{
    //                User.findOneAndUpdate(id,{password:new_password},function (err,result,user) {
    //                 if (err){ 
    //                     console.log(err)
    //                     res.send(err);
    //                 } 
    //                 else{ 
    //                     if (user.password==new_password) {
    //                         console.log("pass", user.password)
    //                      res.json({success:false,message:'password cannot be same'})   
    //                     }
    //                     else{
    //                     console.log("RESULT: " + result);
        
    //             res.send('Done')
    //                     }
    //                 }    
    //                })
    //            }
    //         }
    //     }
    // }




  //  }
//}

exports.update = [
    check('password')
    .not()
    .isEmpty()
    .withMessage('password is required'),
    check('new_password')
    .not()
    .isEmpty()
    .withMessage('new_password is required'),
    check('confirm_password')
    .not()
    .isEmpty()
    .withMessage('confirm_password is required'),
    check('confirm_password', 'confirm_password and new password do not match').custom((value, {req}) => (value === req.body.new_password)),
   check('password', 'current password is wrong')
   .custom((password,{req})=>{
return User.findOne({password:req.body.password}).then((user)=>{
  if (!user) {
    return Promise.reject()
  }
})
   }),


    check('new_password', 'old password and new password are same')
    .custom((password,{req})=>{
      return User.findOne({password:req.body.new_password}).then((user)=>{
        if (user) {
          return Promise.reject()
        }
      })
    }),
    (req, res, next) => { var errors = validationResult(req);
        if (!errors.isEmpty()) {
          const alert1 =errors.array()
           console.log("rrors", errors)
           res.render('my-account',{
               
            alert1
        
        });
        } else {
          console.log('else')
          req.session.loggedIn=true;
            var new_password=req.body.new_password;
            var id=req.session._id;
            User.findByIdAndUpdate(id,{$set:{password:new_password}},function (err,result) {
             
              if (err) {
                console.log(err)
                res.send(err);
              } else {
                req.session.email = result.email;
                req.session.user_id =result.user_id ;
               
              res.render('my-account',{
                flash:{
                  success:'password changed successfully'
                }
              });
              }
            })
          
        }
    }
  ];