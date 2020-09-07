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
    type: String,  
  },
   precio: Number,
   ingredientes: {
    required: true,
    trim: true,
    type: String
  },
  imageName:String
 
})

module.exports = model('producto', productoSchema)