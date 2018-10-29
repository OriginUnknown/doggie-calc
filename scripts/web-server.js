var express = require('express'),
    path = require('path'),
    bodyParser = require('body-parser'),
    port = 6801,
    app = express(),
    rootPath = path.normalize(__dirname + '/../');
    app.use(express.static(rootPath + '/app'));

    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(bodyParser.json());

    // wildcard to catch all requests that haven't been routed
    app.get('*', function(request, response){
      var indexPage = rootPath + '/app/index.html';
      response.sendFile(indexPage);
    });

    app.listen(port);

console.log('Listening on port '+ port);
