const { Schema, model } = require('mongoose');
const mongoose = require('mongoose');




const pedidoSchema = new Schema({
  idUsuario: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Usuario"
  },
  precioTotal: Number,
  items: [
    {
      nombre: String,
      precio: Number,
      cantidad: Number
    }
  ],
  nombre: {
    required: true,
    trim: true,
    type: String
  }
  ,
  telefono: {
    required: true,
    trim: true,
    type: Number
  },
  email: String,
  recogida: String,
  numeroPedido: Number,
  status: {
    type: String,
    enum: ['Nuevo', 'EnPreparacion', 'Finalizado', 'Recogido', 'Cancelado'],
    default: 'Nuevo'
  },
  created_at: {
    type: Date,
    default: function(){
      return new Date()}
  }

})

module.exports = model('pedido', pedidoSchema)