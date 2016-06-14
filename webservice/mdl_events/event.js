 var mongoose=require('mongoose');
 var schema=mongoose.Schema;
 var eventSchema=new schema({ //schema definition
    name: String,
    category: String,
    date: String,
    time:String,
    price:Number,
    distance:Number,
    short_description:String,
    long_description:String,
    invited_people_amount:Number
 }, {collection:'events'});

//creating a model object and connecting the schema to it.
 var eventModel=mongoose.model('eventModel',eventSchema);
 module.exports=eventModel; //exports the model