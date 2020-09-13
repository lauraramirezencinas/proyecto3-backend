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
    required: [true, "El nombre de usuario es requerido :) ."],
    trim: true,
    type: String
  }
  ,
  telefono: {
    required: [true, "El telefono es requerido :) ."],
    trim: true,
    type: Number
  },
  email: {
    type: String,
    match: [/^\S+@\S+\.\S+$/, 'Dirección de correo inválida, revise su dirección de correo :) .'],
    unique: true,
    lowercase: true,
    trim: true
  },
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