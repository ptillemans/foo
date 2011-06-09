
/**
 * Module dependencies.
 */

var express = require('express');

var app = module.exports = express.createServer();

// Configuration

app.configure(function(){
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(express.cookieParser());
  app.use(express.session({ secret: 'your secret here' }));
  app.use(require('stylus').middleware({ src: __dirname + '/public' }));
  app.use(app.router);
  app.use(express.static(__dirname + '/public'));
});

app.configure('development', function(){
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
});

app.configure('production', function(){
  app.use(express.errorHandler());
});

// Routes
app.get('/assets', function(req, res){
  console.log('STATUS: ' + res.statusCode);
  console.log('HEADERS: ' + JSON.stringify(res.headers));

  var id = req.query.id;
  res.send(
    '<?xml version="1.0" encoding="utf-8"?>'
    + '<root>'
    + '  <item id="' + id + '_1" state="closed">'
    + '    <content><name>node ' + id + '_1 </name></content>'
    + '  </item>'
    + '  <item id="' + id + '_2" state="closed">'
    + '    <content><name>node ' + id + '_2 </name></content>'
    + '  </item>'
    + '  <item id="' + id + '_3">'
    + '    <content><name>node ' + id + '_3 </name></content>'
    + '  </item>'
    + '</root>'
    , {
      'Content-Type' : 'application/xml'
    }
    ,200);
});

app.get('/assets/:id.:format', function(req, res){
  var id = req.params.id;
  res.send(
    '<?xml version="1.0" encoding="utf-8"?>'
    + '<root>'
    + '  <item id="' + id + '_1">'
    + '    <content><name>node ' + id + '_1 </name></content>'
    + '  </item>'
    + '  <item id="' + id + '_2">'
    + '    <content><name>node ' + id + '_2 </name></content>'
    + '  </item>'
    + '  <item id="' + id + '_3">'
    + '    <content><name>node ' + id + '_3 </name></content>'
    + '  </item>'
    + '</root>'
  );
});


app.get('/', function(req, res){
  res.render('index', {
    title: 'Express'
  });
});


// Only listen on $ node app.js

if (!module.parent) {
  app.listen(3000);
  console.log("Express server listening on port %d", app.address().port);
}
