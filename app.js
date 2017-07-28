var express = require("express");
var path = require("path");
var bodyParser = require('body-parser');
var user = require('./user');
var session = require('express-session');


var app = express();
var sessions;

app.use(express.static(path.join(__dirname,"/html")));
app.use(bodyParser.json());
app.use(session({secret: 'my-secret'}));

app.listen(7777, function(){
    console.log("Start listening on port", 7777);
})
''
app.get('/home', function(req, res){
    if(sessions && sessions.username){
        res.sendFile(__dirname + '/html/home.html');
    }else{
        res.send('unauthorized');
    }
})
app.post('/signin', function(req, res) {
    sessions=req.session;
    var user_name = req.body.email;
    var password = req.body.password;
    // console.log(user_name)
    sessions.username=user_name;

    user.validateSignIn(user_name,password,function(result){
        // console.log(result);
        if(result){
            sessions.username = user_name;
            res.send('Success')
        }else{
            res.send('Wrong username password')
        }
    });
    // if(user_name=='admin' && password=='admin'){
    //     res.send('success');
    // }else{
    //     res.send('Failure');
    // }
})

app.post('/signup', function(req, res) {
    var name = req.body.name;
    var email = req.body.email;
    var password = req.body.password;

    if(name && email && password){
        user.signup(name,email,password)
    }else{
        res.send('Failure!');
    }
    // user.signup('','','')
    // console.log(res);
})

