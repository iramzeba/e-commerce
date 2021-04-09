var path=require('path');
var flash = require('express-flash-messages');
var view_dirname=('../views');
var User=require('../model/Schema');

const { check, validationResult } = require('express-validator/check');
//module.exports={

  exports.index=function(req,res){
    
// res.render(path.join(view_dirname,'registration.ejs'))
res.render('registration', {
    flashMessages: {
        success: "Loaded all users!"
      },
    pageTitle: 'Test',
    hasError: false,
    validationErrors: [],
   
})
    }




    exports.insert_login=
        
        [
        

            
          
            
        check('email','Email already exist') 
        .custom(email=>{
          return  User.findOne({email:email}).then ((user) =>{
                if (user) {
                   return Promise.reject()
                }
                
            })
        }),  

        check('mobile','mobile number is already registerd') 
        .custom(mobile=>{
          return  User.findOne({mobile:mobile}).then ((user) =>{
                if (user) {
                   return Promise.reject()
                }
                
            })
        }),  

    
        

    check('confirmPassword', 'Passwords do not match').custom((value, {req}) => (value === req.body.password))
           
        ,(req,res)=>{

            var data={
                fullname:req.body.fullname,
                username:req.body.username,
                email:req.body.email,
                mobile:req.body.mobile,
                password:req.body.password,
            
            }

var errors = validationResult(req);
if (!errors.isEmpty()) {
    console.log("rrr",errors)
    const alert =errors.array()
   // return res.status(422).json({ errors: errors.mapped() });
    res.render('registration',{
       
        alert,
        hasError: true,
        validationErrors: errors.array(),
        
         
        
    
    });
} else {
  
    console.log(req.body)
    var user=new User(data);

    // res.render('registration', {
      
       console.log(data)
    // });
    user.save(function (error,result) {
    if (error)  {
        console.log(error)
         res.json({ error });
    
    //res.render('register')
    }
    else {
        
        req.session.loggedIn=true;
         req.session.email = result.email;
         req.session.user_id =result.user_id ;
         req.session._id=result._id;
         req.session.username = result.username;
         
        //return res.json({ result });
        res.redirect('/my-account');

    }
});
}
}
        ]

// if (req.body.password !== req.body.confirmPassword) {
//     var err = new Error('Passwords do not match.');
//     err.status = 400;
//     return next(err);
// }
//else{


// var user=new User(data);

// user.save(function (error,result) {
//     if (error)  {
//          //res.json({ error });
    
//     res.render('register')
//     }
//     else {

//         return res.json({ result });
        

//     }
// });

//    }


//}