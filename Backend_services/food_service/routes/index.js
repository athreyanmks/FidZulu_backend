var express = require('express');
const createHttpError = require('http-errors');
var router = express.Router();

const jsonData = require('../data/Foodjson.json');
const teamMembers = require('../data/members.json')

/* GET home page. */
router.get('/food/team', function(req, response, next) {

  response.setHeader('content-type', 'application/json');
  response.end(JSON.stringify(teamMembers));
});

router.get('/food/all/:country',function(request,response,next){

  var jsonDataTemp = JSON.parse(JSON.stringify(jsonData));
  
  const country = request.params.country;
  var multiplier
  if(country == 'India' || country == 'USA'){
    if(country == 'India'){
      multiplier = 1.075;
    } 
    else if(country == 'USA'){
      multiplier = 1.08;
    }

    for(x in jsonDataTemp)
    {
      jsonDataTemp[x]['price'] = (jsonDataTemp[x]['price']*multiplier).toFixed(2);
    }
  
    response.setHeader('content-type', 'application/json');
    response.end(JSON.stringify(jsonDataTemp));
  }
 
  else{
    next(createHttpError(400));
  }

});

module.exports = router;
