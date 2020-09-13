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
    match: [/^\S+@\S+\.\S+$/, 'Dirección de correo inválida, revise su dirección de correo :) .'],
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
    calleNumero: {
      type: String,
      trim: true,
    }
  },  
  horario: String,
  logoUrl: {
    type: String,
    default: "https://dcassetcdn.com/design_img/3228659/710100/710100_17852441_3228659_03c147fc_image.jpg"
  },
  googleID: String,
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