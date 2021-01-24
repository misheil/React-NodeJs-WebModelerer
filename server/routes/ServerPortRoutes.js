const express = require('express');
const app = express();
const ServerPortRouter = express.Router();
// Misheil Get random number for coordinates 
var random = require('random-number');

// Misheil To read json files 
var fs = require('fs');
 // Misheil get the mock data services 
var coords = require('./../../static/coords.json');
var entities = require('./../../static/entities.json');
var baseX=300;
var baseY=110;



// Misheil get data from mock data services
ServerPortRouter.route('/getCoords').post(function (req, res, next) {
  var obj = [];
  for (i = 0; entities.length > i; i += 1) {
    for (j = 0; coords.length > j; j += 1) {
      if (coords[j].id === entities[i].id) {
        obj.push({id: entities[i].id, name :entities[i].name , x: coords[j].x , y: coords[j].y, BGcolor: entities[j].BGcolor});
      }
    }
  }
  res.send(obj)
});



// Misheil update Coords json file
ServerPortRouter.route('/updateDragedCoords').post(function (req, res, next) {
  var obj = [];
  var objUpdate = [];
  newCoordsObj=[];
  var dataEntities = fs.readFileSync('./../static/entities.json');
  entities = JSON.parse(dataEntities);
  var dataCoords = fs.readFileSync('./../static/coords.json');
  coords = JSON.parse(dataCoords);

  for (i = 0; entities.length > i; i += 1) {
    for (j = 0; coords.length > j; j += 1) {
      if (coords[j].id === entities[i].id) {
        if(parseInt(coords[j].id) === parseInt(req.body.id))
        {

          newCoordsObj.push({id: entities[i].id, x: parseInt(req.body.x)-baseX , y: parseInt(req.body.y)-baseY})
          obj.push({id: entities[i].id, name :entities[i].name , x: parseInt(req.body.x)-baseX , y: parseInt(req.body.y)-baseY, BGcolor: entities[j].BGcolor});
          objUpdate.push({id: entities[i].id, name :entities[i].name, x: parseInt(req.body.x)-baseX , y: parseInt(req.body.y)-baseY, BGcolor: entities[i].BGcolor})
        }
        else
        {
          newCoordsObj.push({id: entities[i].id, x: coords[j].x , y: coords[j].y})          
          objUpdate.push({id: entities[i].id, name :entities[i].name, x: coords[j].x , y: coords[j].y, BGcolor: entities[i].BGcolor})          
         obj.push({id: entities[i].id, name :entities[i].name , x: coords[j].x , y: coords[j].y, BGcolor: entities[j].BGcolor});
        }

      }
    }
  }
  fs.writeFileSync("./../static/coords.json",JSON.stringify(newCoordsObj))
  res.send(objUpdate)
});


// Misheil update Entity json file
ServerPortRouter.route('/updateEntityName').post(function (req, res, next) {
  var obj = [];
  var objUpdate = [];
  newEntityObj=[];
  var dataEntities = fs.readFileSync('./../static/entities.json');
  entities = JSON.parse(dataEntities);
  var dataCoords = fs.readFileSync('./../static/coords.json');
  coords = JSON.parse(dataCoords);

   for (i = 0; entities.length > i; i += 1) {
    for (j = 0; coords.length > j; j += 1) {
      if (coords[j].id === entities[i].id) {
        if(parseInt(coords[j].id) === parseInt(req.body.id))
        {
          newEntityObj.push({id: entities[i].id, name: req.body.name , BGcolor: entities[i].BGcolor})
          obj.push({id: entities[i].id, name :req.body.name , x: coords[j].x , y: coords[j].y, BGcolor: entities[j].BGcolor});
          objUpdate.push({id: entities[i].id, name :req.body.name, x: coords[j].x , y: coords[j].y, BGcolor: entities[i].BGcolor})
        }
        else
        {
          newEntityObj.push({id: entities[i].id, name: entities[i].name , BGcolor: entities[i].BGcolor})          
          objUpdate.push({id: entities[i].id, name :entities[i].name, x: coords[j].x , y: coords[j].y, BGcolor: entities[i].BGcolor})          
         obj.push({id: entities[i].id, name :entities[i].name , x: coords[j].x , y: coords[j].y, BGcolor: entities[j].BGcolor});
        }

      }
    }
  }

  fs.writeFileSync("./../static/entities.json",JSON.stringify(newEntityObj))
  res.send(objUpdate)
});


// Misheil save New Item 
ServerPortRouter.route('/saveNewItem').post(function (req, res, next) {

// Misheil range for random coords
  var options = {
    min:  140,
    max:  550,
    integer: true
  }
  function getNextId() {
    var objh;
    lastId=0;
    var dataEntities = fs.readFileSync('./../static/entities.json');
    objh = JSON.parse(dataEntities);
    objh.forEach(myFunction);

    function myFunction (item, index) {
      for( var key in item ) {
        if (key === 'id')
          {
            lastId=parseInt(item[key])+1;
          }
        }
      }
      return lastId;
    }


    function checkPositionX(xVal) {
    var dataCoords = fs.readFileSync('./../static/coords.json');
    var flag=0;

    objC = JSON.parse(dataCoords);
    objC.forEach(CoordsFunction)

    function CoordsFunction (item, index) {
      for( var key in item ) {
        if (key === 'x' )
        {
          xValCheck=parseInt(item[key]);
          if (xValCheck === xVal || (xValCheck-xVal >0 && xValCheck-xVal <20) || (xValCheck-xVal <0 && xVal-xValCheck <20)  ) {
            flag=1;
            return true;
            break;
          }
        }
      }
      return false;
    }

    if (flag === 1 )
        {
          return true;
        }
        else
        {
          return false;
        }
  };

  function checkPositionY(yVal) {
    var dataCoords = fs.readFileSync('./../static/coords.json');
    var flag=0;

    objC = JSON.parse(dataCoords);
    objC.forEach(CoordsFunction)

    function CoordsFunction (item, index) {
      for( var key in item ) {
        if (key === 'y' )
        {
          yValCheck=parseInt(item[key]);
          if (yValCheck === yVal || (yValCheck-yVal >0 && yValCheck-yVal <20) || (yValCheck-yVal <0 && yVal-yValCheck <20)  ) {
            flag=1;
            return true;
            break;
          }
        }
      }
      return false;
    }

    if (flag === 1 )
        {
          return true;
        }
        else
        {
          return false;
        }
  };

  var lastObj={};

  // Misheil check if the x,y coords not exist
  do {
    var xVal =random(options);
  }
  while (checkPositionX(xVal))

  do {
    var yVal =random(options);
  }
  while ( checkPositionY(yVal))

    if(xVal<270) xVal=(270-xVal) + 270;

    var objEntity = {
      id: getNextId(coords), name: req.body.newEntity, BGcolor: req.body.BG
    };

    var objCoords = {
      id: getNextId(coords), x: xVal , y: yVal
    };

    lastObj  = {id: getNextId(coords), name: req.body.newEntity, BGcolor: req.body.BG, x: xVal , y: yVal} ;

  // Misheil Read and write the json files

    fs.readFile('./../static/coords.json', function (err, data3) {
      var json = JSON.parse(data3)
      json.push(objCoords)
      fs.writeFileSync("./../static/coords.json",JSON.stringify(json))
    })
    fs.readFile('./../static/entities.json', function (err, data2) {
    var json = JSON.parse(data2)
    json.push(objEntity)

    fs.writeFileSync("./../static/entities.json",JSON.stringify(json))
  })


    var obj = [];

    for (i = 0; entities.length > i; i += 1) {
    for (j = 0; coords.length > j; j += 1) {
      if (coords[j].id === entities[i].id) {
        obj.push({id: entities[i].id, name :entities[i].name , x: coords[j].x , y: coords[j].y});
      }
    }
  }
  
  var objn = [];
  var dataEntities = fs.readFileSync('./../static/entities.json');
  var dataCoords = fs.readFileSync('./../static/coords.json');
  objE = JSON.parse(dataEntities);
  objC = JSON.parse(dataCoords);
  objE.forEach(EntitiesFunction);

  function EntitiesFunction (item, index) {
    var objTo={};

    for( var key in item ) {
        if (key === 'id' )
        {
          idVal = item[key];
        }
        objTo[key] = item[key]
        }

        objC.forEach(CoordsFunction);

        function CoordsFunction (item, index ) {
          for( var key in item ) {
            if (key === 'id' && item[key] === idVal)
              {
                objTo.x = item.x;
                objTo.y = item.y;
                objn.push(objTo);
              }
            }
          }
        }

        objn.push(lastObj);
        res.send(objn)
      });
module.exports = ServerPortRouter;