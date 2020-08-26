require('dotenv').config();
const express = require('express');
const router = express.Router();
const mongoose = require("mongoose");
const Usuario = require('../models/usuario-modelo');

router.get("/:id", async (req, res, next) => {
  try {
    const usuario = await Usuario.findById(req.params.id)
    res.status(200).json(usuario)
  } catch (err) {
    res.json(err)
  }
})


router.put('/:id', async (req, res, next) => {
  try {
    const { nombre, apellido, email, nombreNegocio, descripcion, calle, numero, cuidad,
      horario } = req.body
    const usuarioEditado = await Usuario.findByIdAndUpdate(req.params.id, {$set:{
      nombre: nombre,
      apellido:apellido,
      email:email,
      nombreNegocio:nombreNegocio,
      descripcion:descripcion,
        direccion: {
          calle: calle,
          numero: numero,
          cuidad:cuidad
        },
        horario: horario,
    }},{new: true})

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


router.delete('/:id',async (req, res, next)=>{
  try {
    const usuario = await Usuario.findByIdAndRemove(req.params.id)
    res.status(200).json({message: 'usuario borrado'})
  } catch (err) {
    res.json(err)
  }
})



module.exports = router;
