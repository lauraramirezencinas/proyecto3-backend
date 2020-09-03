require('dotenv').config();
const express = require('express');
const router = express.Router();
const mongoose = require("mongoose");
const Usuario = require('../models/usuario-modelo');


//ver usuario
router.get("/:id", async (req, res, next) => {
  try {
    console.log(req.user)
    const usuario = await Usuario.findById(req.params.id)
    res.status(200).json(usuario)
  } catch (err) {
    res.json(err)
  }
})

//editar usuario
router.patch('/:id', async (req, res, next) => {
  try {
    const { nombre, apellido, email, nombreNegocio, descripcion, calle, numero, cuidad,
      horario } = req.body
    let usuario= await Usuario.findById(req.params.id)
    if (nombre){
      usuario.nombre=nombre;
    }
    if(apellido){
    usuario.apellido=apellido;
    }
   if(email){
      usuario.email=email;
    }
    if(nombreNegocio){
      usuario.nombreNegocio=nombreNegocio;
    }
    if(descripcion){
     usuario.descripcion=descripcion;
    }
    if(calle){
      usuario.direccion.calle=calle;
    }
    if(numero){
      usuario.direccion.numero=numero;
    }
    if(cuidad){
      usuario.direccion.cuidad=cuidad;
    }
    if(horario){
      usuario.horario=horario;
    }
    usuario.save()
    res.status(200).json({ message: 'usuario editado' })

  }
  catch (err) {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      res.status(400).json({ message: 'Specified id is not valid' });
      return;
    }
    res.json(err);
  }
})

//eliminar usuario
router.delete('/:id',async (req, res, next)=>{
  try {
    const usuario = await Usuario.findByIdAndRemove(req.params.id)
    res.status(200).json({message: 'usuario borrado'})
  } catch (err) {
    res.json(err)
  }
})



module.exports = router;
