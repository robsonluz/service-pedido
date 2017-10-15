var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});


/* GET all pedidos. */
router.get('/pedidos', function (req, res, next) {
    var db = require('../db');
    var Pedido = db.Mongoose.model('pedidos', db.PedidoSchema, 'pedidos');
    Pedido.find({}).lean().exec(function(e, docs){
       res.json(docs);
       res.end();
    });
});

module.exports = router;
