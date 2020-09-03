const {Schema,model} = require('mongoose')

const usuarioSchema = new Schema({
  nombre: {
    type: String,
    trim: true,
    required: [true, "El nombre de usuario es requerido :) ."],
  },
  apellido: {
    type: String,
    trim: true,
  },
  email: {
    type: String,
    required: [true, "El email es requerido :) ."],
    //asegurar formato email desde el servidor
    //match: [/^\S+@\S+\.\S+$/, 'Dirección de correo inválida, revise su dirección de correo :) .'],
    unique: true,
    lowercase: true,
    trim: true
  },
  // googleID: String,
  // facebookID:String,
  //Password property 
  passwordHash: {
    type: String,
    //required: [true, "La contraseña es un campo requerido :) ."]
  }, 
  isBaker:{
    type: Boolean,
  },
  nombreNegocio: {
    type: String,
    trim: true,
  },
  descripcion: {
    type: String,
    trim: true,
  },
  direccion: {
    calle: {
      type: String,
      trim: true,
    },
    numero: {
      type: Number,
    },
    cuidad: {
      type: String,
      trim: true,
    },
  },  
  horario: String,
  logoUrl: {
    type: String,
    default: "https://res.cloudinary.com/dtkvfvtev/image/upload/v1593469937/logotipo-restaurante_23-2148558726_ebzwhz.jpg"
  },
  facebook: {
    type: String,
    trim: true,
  },
  instagram: {
    type: String,
    trim: true,
  }, 
  productos:[
    {
      type: Schema.Types.ObjectId,
      ref: 'Producto'
    }
  ]  
})

module.exports = model('Usuario', usuarioSchema)