 var mongoose=require('mongoose');
 var schema=mongoose.Schema;
 var categorySchema=new schema({ //categories schema definition
    categories:[{name:String,color:String}]
 }, {collection:'categories'});

//creating a model object and connecting the schema to it.
 var categoryModel=mongoose.model('categoryModel',categorySchema);
 module.exports=categoryModel; //exports the model