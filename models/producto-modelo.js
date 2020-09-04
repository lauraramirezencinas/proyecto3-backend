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
    default: "https://www.pinch-arte.es/wp-content/uploads/2019/02/cookies-800x400.jpg"
  },
 
})

module.exports = model('producto', productoSchema)