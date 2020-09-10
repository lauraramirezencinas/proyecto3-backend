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
  recogida: Number,
  numeroPedido: Number,
  status: {
    type: String,
    enum: ['Nuevo', 'EnPreparation', 'Finalizado', 'Recogido', 'Cancelado'],
    default: 'Nuevo'
  },
  lastActiveAt: Date

})

module.exports = model('pedido', pedidoSchema)