var path=require('path');
var flash = require('express-flash-messages');
var view_dirname=('../views');
var User=require('../model/Schema');

module.exports={
    out:function (req,res) {
        req.session.loggedIn=false;
        req.session.destroy();
        res.redirect('/login');
    }
}


