var mongoose=require('mongoose');
var eventModel=require('./event');//the schema
var categoryModel=require('./categories');//the schema
var userModel=require('./user');


//get All categories from categories collection
exports.getAllCategories=function(req,res){   
    console.log("test: in EventsController- getAllCategories function");
    categoryModel.find({}).exec(function(err,docs){
        if(err){
            console.log("error is"+err);
            throw err;
        }
        console.log("return val:" + docs);
        res.json(docs);
        return ; 
   });
}

//returns the the events from mongo DB.
exports.getAllEvents=function(req,res){   
    console.log("test: in EventsController- getAllEvents function");
    eventModel.find({}).exec(function(err,docs){
        if(err){
            console.log("error is"+err);
            throw err;
        }
        console.log("return val:" + docs);
        res.json(docs);
        return ; 
   });
}
 
//EXAMPLE - http://localhost:3000/getEventsByCategory/MUSIC
 exports.getEventsByCategory=function(req,res){
        console.log("test: in EventsController- getEventsByCategory function");
        var category = req.params.category;
        console.log("test my category is: "+category);
        var query=eventModel.find().where('category',category);
        query.exec(function(err,doc){
            console.log("searching...");
            if(err){
                console.log("error is:"+err);
                throw err;
            }
            else{
                console.log("RESULT IS:\n" +doc);
                res.json(doc);
            }
        });
 }

exports.getAllUsers=function(req,res){   
    console.log("test: in EventsController- getAllUsers function");
    userModel.find({}).exec(function(err,docs){
        if(err){
            console.log("error is:"+err);
            throw err;
        }
        console.log("return val:" + docs);
        res.json(docs);
        return ; 
   });
}


 exports.setLikeToEvent=function(req,res){
        console.log("test: in EventsController- setLikeToEvent2 function");
        var CurrentUserEmail="oramit88@gmail.com";
        var eventID = req.params.eventId;
        console.log("test: my EventID: "+eventID);
        var query= userModel.update({email: "oramit88@gmail.com"},{
              $addToSet:{like:eventID}
        });
        query.exec(function(err,results){
            if(err){
                console.log("err is:"+err);
            }
            else{
                console.log("\n finishing Update like to event");
            }
        });
        res.json("ok");  
 }


 exports.setUnLikeToEvent=function(req,res){
        console.log("test: in EventsController- setUnLikeToEvent function");
        var CurrentUserEmail="oramit88@gmail.com";
        var eventID = req.params.eventId;
        console.log("test: my EventID: "+eventID);
        var query= userModel.update({email: "oramit88@gmail.com"},{
              $pullAll:{like:[eventID]}
        });

        query.exec(function(err,results){
            if(err){
                console.log("error update is:"+err);
            }
            else{
                console.log("\n finishingUpdate UnLike to Event");
            }
        });
        res.json("ok");  
 }

//returns current logedIn user events
exports.getEventsByUser=function(req,res){
        var CurrentUserEmail="oramit88@gmail.com"; //will change after g+ implementation.
        console.log("test: in EventsController- getEventsByUser function");
        //console.log("test my user is: "+CurrentUserEmail);
        //finding the current user in users collection and searching the events in events collection.
        var query=userModel.find().where('email',CurrentUserEmail);
        query.exec(function(err,doc){
            console.log("searching user events");
            if(err){
                console.log("error is:"+err);
                throw err;
            }
            else{
                console.log("the ivents is:\n" +doc[0].like);
                //var numberOfEvents=doc[0].like.length;
                var LikeEventsArray=doc[0].like;
                eventModel.find({'id':{$in:LikeEventsArray}}).exec(function(err,docs){
                    res.json(docs);
                })
                //res.json(doc);
            }
        });
 }


 //EXAMPLE - http://localhost:3000/getFriendsByUserMail/oramit88@gmail.com
 //Return value- json with the user friends
 exports.getFriendsByUserMail=function(req,res){
        console.log("test: in getFriendsByUserMail- getFriendsByUserMail function");
        var userMail = req.params.userMail;
        console.log("test: User mail is: "+userMail);
        var query=userModel.find().where('email',userMail); //finding the current user
        query.exec(function(err,doc){
            console.log("searching...");
            if(err){
                console.log("error is:"+err);
                throw err;
            }
            else{
                console.log("RESULT emails IS:\n" +doc[0].friends_email);
                var friendsArray=doc[0].friends_email; //holdind array with firend mail
                //find the user firends and return their json
                userModel.find({'email':{$in:friendsArray}}).exec(function(err,docs){
                    var friendList=docs;
                    res.json(docs);
                })
                //res.json(doc[0].friends_email);
            }
        });
 }


