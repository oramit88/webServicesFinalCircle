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
app.get('/getAllUsers',eventsModuleController.getAllUsers);
app.get('/setLikeToEvent/:eventId',eventsModuleController.setLikeToEvent);
app.get('/setUnLikeToEvent/:eventId',eventsModuleController.setUnLikeToEvent);
//need to change getLikeEventsByUser
app.get('/getEventsByUser',eventsModuleController.getEventsByUser);
app.get('/getFriendsByUserMail/:userMail',eventsModuleController.getFriendsByUserMail);

//working!
//localhost:3000/getEvantsThatUserInvaitedTo/oramit88@gmail.com


app.get('/getEvantsThatUserInvaitedTo/:userMail',eventsModuleController.getEvantsThatUserInvaitedTo);


//EXAMPLE - http://localhost:3000/findEventsByTimeAndPrice?time=23:00&price=80
app.get('/findEventsByTimeAndPrice',eventsModuleController.findEventsByTimeAndPrice);




app.listen(port);
console.log('listening on port' + port);

