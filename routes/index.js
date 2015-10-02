var express = require('express');
var path = require('path');
var router = express.Router();
var cute = path.join(__dirname, '../models/cute.json');
var jsonquery = require('json-query');
var fs = require('fs');

/* GET home page. */

router.use(express.static(path.join(__dirname, "../public")));

router.get('/', function(req, res, next) {
  res.sendFile(path.join(__dirname, '../views/index.html'));
});

router.get('/:id', function (req,res) {
    console.log('getting ID');

    var id = req.params.id;
    console.log(id);
    fs.readFile(cute, function (err, data) {
        if (err){
            console.log(err);
        }

        obj = JSON.parse(data);
        console.log('obj:');
        console.log(obj);
        var query = getJsonQueryString('id', id);
        //console.log('query:',query);
        var img = jsonquery(query, {data: obj}).value;
        console.log('img:',img);
        res.send(img);

    });
    //res.json(cute);
});

module.exports = router;



function getJsonQueryString(key, value){
    var queryString = '[' + key + '=' + value + ']';
    console.log('Generate query string: ' + queryString);
    return queryString;
}