const { Schema, model } = require('mongoose');
const mongoose = require('mongoose');

const reviewSchema = new Schema({
  idUsuario: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Usuario"
  },
  nombre: {
    type: String, 
    default:"Anónimo"
  },
  numeroPedido: {
    type: Number
  },
  comentario: {
    type: String
  },
  
  rating: {
    type: Number,
    required:true, 
    enum: [1,2,3,4,5],
  },
  created_at: {
    type: Date,
    default: function(){
      return new Date()}
  }
})

module.exports = model('review', reviewSchema)