const {Schema,model} = require('mongoose');
const mongoose = require('mongoose');

const productoSchema = new Schema({
  idUsuario: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Usuario"
  }, 
  nombre: {
    required: true,
    trim: true,
    type: String
  },
  descripcion: {
    required: true,
    trim: true,
    type: String
  },
   precio: Number,
   ingredientes: {
    required: true,
    trim: true,
    type: String
  },
  imagenUrl: {
    type: String,
    default: "https://res.cloudinary.com/dtkvfvtev/image/upload/v1593469937/logotipo-restaurante_23-2148558726_ebzwhz.jpg"
  },
 
})

module.exports = model('producto', productoSchema)