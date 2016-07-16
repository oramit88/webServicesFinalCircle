//daria
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
app.get('/getEventsByUser/:userMail',eventsModuleController.getEventsByUser);
app.get('/getFriendsByUserMail/:userMail',eventsModuleController.getFriendsByUserMail);


//EXAMPLE - http://localhost:3000/findEventsByTimeAndPrice?time=21:00&price=90&cat=NIGHTLIFE
app.get('/findEventsByTimeAndPrice',eventsModuleController.findEventsByTimeAndPrice);

//localhost:3000/getEvantsThatUserInvaitedTo/oramit88@gmail.com
app.get('/getEvantsThatUserInvaitedTo/:userMail',eventsModuleController.getEvantsThatUserInvaitedTo);

//THE USER SEND INVITATION TO SOMEONE
//SEE YONITS POWERPOINT
app.get('/getEvantsThatUserInvited/:userMail',eventsModuleController.getEvantsThatUserInvited);
//EXAMPLE- http://localhost:3000/isUserExist/oramitD88@gmail.com
app.get('/isUserExist/:userMail',eventsModuleController.isUserExist);

//EXAMPLE - http://localhost:3000/inviteUserToEvent?fromUser=oramit88@gmail.com&toUser=luiza.martinez@gmail.com&evantID=20
app.get('/inviteUserToEvent',eventsModuleController.inviteUserToEvent);

//EXAMPLE - http://localhost:3000/isUserLikeEvent?user=oramit88@gmail.com&evantId=20
app.get('/isUserLikeEvent',eventsModuleController.isUserLikeEvent);


//EXAMPLE - http://localhost:3000/addNewEvent?eventName=euro Final&eventCategory=Music&eventTime=20:30&eventPrice=90&eventDistance=100&eventDate=21/7/2016
app.get('/addNewEvent',eventsModuleController.addNewEvent);


app.listen(port);
console.log('listening on port' + port);

