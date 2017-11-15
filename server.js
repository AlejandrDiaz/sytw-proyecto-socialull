"use strict";

let express = require('express');
let app = express();
let session = require('express-session');


app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');
app.use(express.static(__dirname + '/public'));

app.set('port', (process.env.PORT || 8080));


require('./app/routes.js')(app);


var server = app.listen(app.get('port'), function () {

  var host = server.address().address
  var port = server.address().port

  console.log('Example app listening at http://%s:%s', host, port)

});