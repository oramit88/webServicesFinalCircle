 var mongoose=require('mongoose');
 var schema=mongoose.Schema;
 var userSchema=new schema({ //schema definition
    name: String,
    email: {type:String,required:true,unique:true},
    friends_email: [String],
    invited_events:[{event_id:String,friend_email:String,status:String}],
    invited_to:[{event_id:String,status:String,invited_by:String}],
    like:[Number]
 }, {collection:'users'});

//creating a model object and connecting the schema to it.
 var userModel=mongoose.model('userModel',userSchema);
 module.exports=userModel; //exports the model