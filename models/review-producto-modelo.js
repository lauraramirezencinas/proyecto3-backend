const {Schema,model} = require('mongoose');
const mongoose = require('mongoose');

const productoReviewSchema = new Schema({
  idUsario: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Usuario"
  }, 
  idProducto: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Producto"
  }, 
  comentario: {
    required: true,
    trim: true,
    type: String
  },
  createdAt: new Date()
   
})

module.exports = model('productoReview', productoReviewSchema)