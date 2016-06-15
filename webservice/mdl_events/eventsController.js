var mongoose=require('mongoose');
var eventModel=require('./event');//the schema
var categoryModel=require('./categories');//the schema
var userModel=require('./user');


//getAll categories
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

//returns the the data from mongo DB.
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



//returns the Json with the student details by his id number. 
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
                console.log("error update is:"+err);
            }
            console.log("\n result object after update:"+doc.name)
        });
        res.json(doc);  
 }



