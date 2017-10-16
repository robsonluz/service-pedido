var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
const MongoClient = require('mongodb').MongoClient

var db

MongoClient.connect('mongodb://mongodb:mongodb@mongodb/pedidos', (err, database) => {
  if (err) return console.log(err)
  db = database
})

var routes = require('./routes/index');
var users = require('./routes/users');



var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use('/users', users);

/* GET all pedidos. */
app.get('/pedidos', function (req, res, next) {

  db.collection('Pedidos').find().toArray(function(err, results) {
    res.json(results);
    res.end();
  })

});

app.post('/pedidos', (req, res) => {
  db.collection('Pedidos').save(req.body, (err, result) => {
    console.log('saved to database')
    res.json(result);
    res.end();
  })
});

app.delete('/pedidos/:id', (req, res) => {
  var idPedido = req.params.id;
  db.collection('Pedidos', {}, function(err, pedidos) {
      pedidos.remove({_id: ObjectID(idPedido)}, function(err, result) {
          if (err) {
              console.log(err);
          }
          console.log(result);
          res.json({message:'ok'});
          res.end();

      });
  });
});


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
