const User = require("../model/Schema");


var {check ,validationResult} = require('express-validator/check');
exports.index=function (req,res) {
    res.render('contact.ejs',{
        session:req.session
    })
}