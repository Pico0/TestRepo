var express = require('express');
var bodyParser = require('body-parser');
var cors = require ('cors');
var http = require('http');
var app = express();

// comment hello

var modArray = [];

app.use(cors());
app.use(express.static('public'));
app.use (bodyParser.json());

app.use(function(req,res,next){
    console.log("request");
    next();
});

app.get('/test/', function(req, res) {
   console.log("hurray");
});

app.get('/getMod', function(req, res) {
   res.send(modArray);
});

app.post('/setMod', function(req, res) {

   var mod = {
            name: req.body.name,
            credit: req.body.credit,
            note: req.body.note
    };
   console.log("HIER");
   modArray.push(mod);
   res.send();

});

app.delete('/del/:index', function (req, res) {
   console.log("TEST");

    //modArray.splice(modArray[req.params.index+1], 1);

    for(i=0; i<modArray.length; i++) {
        console.log(modArray[i]);
    }

    modArray.splice(req.params.index, 1);
    console.log("index: "+req.params.index);
    for(i=0; i<modArray.length; i++) {
        console.log(modArray[i]);
    }
});

app.listen(8080);