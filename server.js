'use strict';
var express  = require('express'),
bodyParser   = require('body-parser'),
http         = require('http'),
config       = require('./config'),
server       = express(),
mongoose     = require('mongoose'),
Employee     = require('./models/employee'), //created model loading here
Conversation = require('./models/conversation');
//GameSchedule = require('./API/Models/GameSchedule');
// mongoose instance connection url connection
mongoose.Promise = global.Promise;
mongoose.connect(config.dbUrl);
server.use(bodyParser.urlencoded({ extended: true }));
server.use(bodyParser.json());
//var routes = require('./API/Routes/Routes'); //importing route
//routes(server); //register the route
server.use(express.static(__dirname + '/assets'));

// Get an instance of the Express router and start dealing with routes.
var router = express.Router();

var slack = require('./post-to-slack.js');



// When any request is received, register that we got it
router.use(function(req, res, next) {
    console.log('Something is happening.');
    next(); // make sure we go to the next routes and don't stop here
  });

router.get('/', function(req, res) {
    // res.json({
    //   message: 'We are happy to see you using Chat Bot Webhook!'
    // });
    res.sendFile(__dirname + '/index.html');
  });
  
  router.route('/')
  
  // create a post
  // (POST http://localhost:4500/api/posts)
  .post(function(req, res) {
      console.log(req);
      var con = new Conversation();
      con.id = req.body.id;
      con.timestamp = req.body.timestamp;
      con.result = req.body.result;
      con.save(function(err) {
        if (err) {
          res.send(err);
        }
        slack.postToSlack(req.body.result);
    
        // res.json({
        //   message: 'conversation saved!'
        // });
      });
     if (req.body.result.action == "bot.employee")
     {
        //console.log(req);
        getEmpInfo(req,res)
     }
     if (req.body.result.action == "bot.quit")
     {
        res.json({
            speech: 'I am sorry if i could not help you.',
            displayText: 'I am sorry if i could not help you.',
            source: 'bot info'

        })
     }
  });

  server.use('/api', router);

server.listen((process.env.PORT || 8000), function () {
    console.log("Server is up and listening on port" + process.env.PORT);
});



function getEmpInfo(req,res){
  // return res.json ({message:'getEmpInfo'});
   //console.log(req);
   let empToSearch = req.body.result && req.body.result.parameters && req.body.result.parameters.empid ? req.body.result.parameters.empid : 'Unknown';
  
   Employee.findOne({empId:empToSearch},function(err,empExists)
         {
            console.log(empExists)
           if (err)
           {
             return res.json({
                 speech: 'Something went wrong!',
                 displayText: 'Something went wrong!',
                 source: 'team info'
             });
           }
   if (empExists)
           {
               var response = "Employee Name is "+empExists.name;
             return res.json({
                   speech: response,
                   displayText: response,
                   source: 'team info'
               });
           }
           else {
             return res.json({
                   speech: 'Currently I am not having information about this employee',
                   displayText: 'Currently I am not having information about this employee',
                   source: 'team info'
               });
           }
         });
}