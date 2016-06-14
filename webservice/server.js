var express=require ('express');
var app=express();
var eventsModuleController=require('./mdl_events/eventsController');
var port=process.env.PORT||3000;

/***server settings ***/
app.set('port', port);
app.use('/', express.static('./public'));
app.use(function(req,res,next){
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With,Content-Type,Accept");

  app.set('json spaces', 4);
  res.set("Content-Type","application/json");
  next();
});

/*** All routes ***/
app.get("/",function(req,res){ //the regular route - send beck the html API document.
    res.set('Header-one', 'my talk function');
    res.sendFile(__dirname + '/API/api.html'); //sending the file to the client.
 });

app.get('/getAllCategories',eventsModuleController.getAllCategories);
app.get('/getAllEvents',eventsModuleController.getAllEvents);
app.get('/getEventsByCategory/:category',eventsModuleController.getEventsByCategory);




// app.get('/getEventsByCategory/:category',function(req,res){
//     var category = req.params.category;
//     //console.log("test: getStudentsByYear function, year received: "+year);
//     var jsonMessage=eventsModuleController.getEventsByCategory(category);
//     //console.log("test2: getStudentsByYear function, return val:"+jsonMessage);
//     res.send(jsonMessage);
// });


// app.get('/getEventsByDate/:date',function(req,res){
//     var date = req.params.date;
//     //console.log("test: getStudentsByYear function, year received: "+year);
//     var jsonMessage=eventsModuleController.getEventsByDate(date);
//     //console.log("test2: getStudentsByYear function, return val:"+jsonMessage);
//     res.send(jsonMessage);
// });


// app.get('/getEventsByTime/:time',function(req,res){
//     var time = req.params.time;
//     //console.log("test: getStudentsByYear function, year received: "+year);
//     var jsonMessage=eventsModuleController.getEventsByTime(time);
//     //console.log("test2: getStudentsByYear function, return val:"+jsonMessage);
//     res.send(jsonMessage);
// });

// app.get('/getEventsByPrice/:price',function(req,res){
//     var price = req.params.price;
//     //console.log("test: getStudentsByYear function, year received: "+year);
//     var jsonMessage=eventsModuleController.getEventsByPrice(price);
//     //console.log("test2: getStudentsByYear function, return val:"+jsonMessage);
//     res.send(jsonMessage);
// });


// app.get('/*',function(req,res){
//     var jsonMessage="<p>Error: Wrong path!</p><p>please use the API: https://students-grades.herokuapp.com</p>";
//     res.send(jsonMessage);
// });

app.listen(port);
console.log('listening on port' + port);