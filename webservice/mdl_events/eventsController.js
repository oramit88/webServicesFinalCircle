var mongoose=require('mongoose');
var eventModel=require('./event');//the schema
var categoryModel=require('./categories');//the schema



//getAll categories
exports.getAllCategories=function(req,res){   
    console.log("test: in EventsController- getAllCategories function");
    categoryModel.find({}).exec(function(err,docs){
        console.log("return val:" + docs);
        res.json(docs);
        return ; 
   });
}

//returns the the data from mongo DB.
exports.getAllEvents=function(req,res){   
    console.log("test: in EventsController- getAllEvents function");

    eventModel.find({}).exec(function(err,docs){
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
                console.log("err is:"+err);
            }
            else{
                console.log("RESULT IS:\n" +doc);
                res.json(doc);
            }
        });

 }
