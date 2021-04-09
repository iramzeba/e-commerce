var path=require('path');
var view_dirname=('../views');
var User=require('../model/Schema');
var passport=require('passport');
var LocalStrategy =require('passport-local').Strategy; 
const { check, validationResult } = require('express-validator/check');
exports.index=function(req,res){
res.render(path.join(view_dirname,'login.ejs'))
    }



exports.login_post=[
    // check('email')
    // .not()
    // .isEmpty()
    // .withMessage('email is required'),
    check('password')
    .not()
    .isEmpty()
    .withMessage('password is required')
    ,(req,res)=>{

        var errors=validationResult(req);
        if (!errors.isEmpty()) {
            const error_res=errors.array()

            res.render('login',{
                error_res,
            });
        }

        else{
                     var email=req.body.email;
    
                   var password=req.body.password;
            passport.authenticate('local',function(err) {
                if (err) {
                    res.json({success:false, message:err})
                }
                else{
                    User.findOne({email:email,password:password},function (err,user,done) {
                     
                        if (err) { return done(err); }
                    if (!user || user.password!=password) {
                        res.render("login", {
                            flash: {
                                success: "email or password incorrect!"
                            }
                          });

                     //   res.json({success:false,message:'email or password incorrect'})
                    }
                   
                    else{ req.session.email = email;
                        req.session.username = user.username;
                        req.session.loggedIn=true;
                        req.session.user_id =user.user_id ;
                        req.session._id=user._id;
                        console.log(user._id)
                        res.redirect('/my-account');
                            
                    }     
                        
                    
                });
                }///
        })(req,res)
    }
    
}

]
//         console.log("hi")
//         var email=req.body.email;
    
//  var password=req.body.password;
//  passport.use(new LocalStrategy(
//      function(email,password,done){
//          User.findOne({email:email },function(err,user){
//              if (err) {
//                  return done(err)
//              }
//              if (!user) {
//                  return done (null,false,{message:'incorect email'})
//              }
//              if (!user.validPassword(password)) {
//                  return done(null,false,{message:'incorect password'})
//              }
//              return done(null, user)
//          });
//      }
//  )
//  )
 
    

    


//
exports.login_postss=function(req,res){
    var email=req.body.email;
    
      var password=req.body.password;
    if(!req.body.email){
        res.json({success:false ,message:'email was not given'})
    }
    else{
        if (!req.body.password) {
            res.json({success:false, message:'password was not given'})
        }
    
        else{

    passport.authenticate('local',function(err,user,info) {
        if (err) {
            res.json({success:false, message:err})
        }
        else{
            User.findOne({email:email,password:password},function (err,user,done) {
             
                if (err) { return done(err); }
            if (!user || user.password!=password) {
               
                  
                  
                res.json({success:false,message:'email or password incorrect'})
            }
            // if (user.password!=password) {
            //     return done(null, false, { message: 'Incorrect password.' });
            // }
            else{ req.session.email = email;
                req.session.user_id =user.user_id ;
                req.session._id=user._id;
                req.session.loggedIn=true;
                console.log(user._id)
                res.redirect('/my-account');
                       // res.json({success:true, message:'loggedin '})
            }     
                
            
        }
        )
        }///
    })(req,res)
    
        } 
}
    
}





