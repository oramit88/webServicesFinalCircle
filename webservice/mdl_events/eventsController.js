var mongoose=require('mongoose');
var eventModel=require('./event');//the schema
var categoryModel=require('./categories');//the schema
var userModel=require('./user');
var url=require ('url');

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

exports.findEventsByTimeAndPrice=function(req,res){
        console.log("test: in findEventsByTimeAndPrice- findEventsByTimeAndPrice function");
        var urlPart=url.parse(req.url,true);
        var query=urlPart.query;
        var searchTime=query.time;
        var searchPrice=query.price;
        //console.log("the time is: " +time+" the price is: "+price);

        eventModel.find({time:searchTime}).where('price').lte(searchPrice).exec(function(err,doc){
            console.log("searching...");
            if(err){
                console.log("error is:"+err);
                throw err;
            }
            else{
                console.log("RESULT  IS:\n" +doc);
                res.json(doc);
            }
        });
 }

//working!
//EXAMPLE - http://localhost:3000/getEvantsThatUserInvaitedTo/oramit88@gmail.com
 exports.getEvantsThatUserInvaitedTo=function(req,res){
        console.log("test: in getEvantsThatUserInvaitedTo- getEvantsThatUserInvaitedTo function");
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
                //console.log("RESULT emails IS:\n" +doc[0].invited_to);
                var numOfEvents= doc[0].invited_to.length;
                //console.log("number of events is: "+ numOfEvents);
                var eventName;
                var intEventId;

                var eventsIdsArray=[];
                for(var i = 0 ; i < numOfEvents; i++){
                    intEventId=parseInt(doc[0].invited_to[i].event_id);
                    //console.log("events Id is: "+ intEventId);
                     eventsIdsArray.push(intEventId);
                }
                console.log("eventsIdsArray"+ eventsIdsArray);
              
                eventModel.find({'id':{$in:eventsIdsArray}}).sort("id").exec(function(err,docs){ 
                    var  eventsArray=[];
                    console.log("see status?");
                    console.log(doc[0].invited_to[0].status);
                    docsAmounth=docs.length;
                    console.log("size is"+docsAmounth);
                    for(var i=0; i<docsAmounth;i++){ 
                        var convertedJSON = JSON.parse(JSON.stringify(docs[i]));
                        convertedJSON.status=doc[0].invited_to[i].status; //adding "status" field
                        convertedJSON.invited_by=doc[0].invited_to[i].invited_by; //adding "invited_by" field
                        eventsArray.push(convertedJSON);
                        //console.log("arr is "+ eventsIdsArray);
                        //console.log("docs is \n");
                    }
                     res.json(eventsArray);    
                })

            }
        });
 }

 




 exports.getEvantsThatUserInvited=function(req,res){
        console.log("test:  getEvantsThatUserInvaitedTo function");
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
                //console.log("RESULT emails IS:\n" +doc[0].invited_to);
                var numOfEvents= doc[0].invited_events.length;
                console.log("number of events is: "+ numOfEvents);
                var eventName;
                var intEventId;

                var eventsIdsArray=[];
                for(var i = 0 ; i < numOfEvents; i++){
                    intEventId=parseInt(doc[0].invited_events[i].event_id);
                    //console.log("events Id is: "+ intEventId);
                     eventsIdsArray.push(intEventId);
                }
                console.log("eventsIdsArray"+ eventsIdsArray);
              
                eventModel.find({'id':{$in:eventsIdsArray}}).sort("id").exec(function(err,docs){ 
                    var  eventsArray=[];
                    console.log("see status?");
                    //console.log(doc[0].invited_events[0].status);
                    docsAmounth=docs.length;
                    console.log("size is"+docsAmounth);
                    for(var i=0; i<docsAmounth;i++){ 
                        var convertedJSON = JSON.parse(JSON.stringify(docs[i]));
                        convertedJSON.status=doc[0].invited_events[i].status; //adding "status" field
                        convertedJSON.friend_email=doc[0].invited_events[i].friend_email; //adding "invited_by" field
                        eventsArray.push(convertedJSON);
                        //console.log("arr is "+ eventsIdsArray);
                        //console.log("docs is \n");
                    }
                     res.json(eventsArray);    
                })

            }
        });
 }



exports.isUserExist=function(req,res){
        var userMail = req.params.userMail; //will change after g+ implementation.
        console.log("test: in isUserExist-  function");
        //console.log("test my user is: "+CurrentUserEmail);
        //finding the current user in users collection and searching the events in events collection.
        var query=userModel.find().where('email',userMail);
        query.exec(function(err,doc){
            console.log("searching user events");
            if(err){
                console.log("error is:"+err);
                throw err;
            }
            else{
                if(doc[0]!=undefined){
                    console.log("the result is:\n" +doc[0].id);
                    returnMsg={"isExist":"TRUE"}
                    res.json(returnMsg);
                }
                else{
                    console.log("Didnf find user");  
                    returnMsg={"isExist":"FALSE"}
                    res.json(returnMsg);
                }
                //var numberOfEvents=doc[0].like.length;
            }
        });
 }


 exports.inviteUserToEvent=function(req,res){
        console.log("test: in inviteUserToEvent function");
        var urlPart=url.parse(req.url,true);
        var query=urlPart.query;
        var fromUser=query.fromUser;
        var toUser=query.toUser;
        var eventId=query.evantID;
        console.log("fromUser is: " +fromUser+" toUser is: "+toUser+ " evantID is "+eventId);
        //updating the "from" user document
        myFromJson= {"event_id": eventId,
            "friend_email": toUser,
            "status": "waiting"}
        var query= userModel.update({email: fromUser},{
            $addToSet:{invited_events:myFromJson}
        });
        query.exec(function(err,results){
            if(err){
                console.log("err is:"+err);
            }
            else{
                console.log("\n finishing Update doc: "+fromUser+"with: "+myFromJson);
            }
        });

        //updating the "to" user document
        myToJson= {"event_id": eventId,
            "status": "waiting",
            "invited_by": fromUser}
        var query2= userModel.update({email: toUser},{
            $addToSet:{invited_to:myToJson}
        });
        query2.exec(function(err,results){
            if(err){
                console.log("err is:"+err);
            }
            else{
                console.log("\n finishing Update doc: "+toUser+"with: "+myToJson);
            }
        });


 }