var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');
var uri = 'mongodb://admin:j7V8bTAFQKPZCLbi@mycluster-shard-00-00-l25ub.mongodb.net:27017,mycluster-shard-00-01-l25ub.mongodb.net:27017,mycluster-shard-00-02-l25ub.mongodb.net:27017/Blog?ssl=true&replicaSet=mycluster-shard-0&authSource=admin';

module.exports = {
    signup: function(name, email, password) {
        MongoClient.connect(uri, function(err, db) {
            if(err){
                console.log(err)
            }
            else {
                // console.log('Coonected!')
                db.collection('user').insertOne({
                    "name": name,
                    "email": email,
                    "password": password
                }, function(err, result){
                    assert.equal(err, null);
                    console.log("Saved the user signup details.");
                })
            }
            db.close();
        });
    },

    validateSignIn: function(username, password, callback){
        MongoClient.connect(uri, function(err, db) {
            if(err){
                console.log(err)
            }
            else {
                // db.collection('user').find({},function(err,result){
                //     callback(result);
                // });
                db.collection('user').findOne({email: username, password: password}, 
                    function(err, result){
                        // console.log(result);
                        if(result==null){
                            callback(false);
                        }else{
                            // console.log('Has result');
                            callback(true);
                        }
                });
            }
            db.close();
        });
    }
}