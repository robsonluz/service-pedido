mongoose.connect('mongodb://mongodb/pedidos');

var pedidoSchema = new mongoose.Schema(
  {
    cliente: String
  },
  {
    collection: 'Pedido'
  }
);

module.exports = { Mongoose: mongoose, PeditoSchema: pedidoSchema }
