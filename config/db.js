var mongoos = require('mongoose');
var url= "mongodb://localhost:27017/users";
mongoos.connect(url,function(err,db){
    if (err) {
        console.log(err);
    }
    else{
        console.log("connected successfully")
    }
})
