require('dotenv').config();
const express = require('express');
const router = express.Router();
const mongoose = require("mongoose");
const Usuario = require('../models/usuario-modelo');
const uploader = require('../configs/cloudinary-setup');


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
router.patch('/:id', uploader.single('logoUrl'), async (req, res, next) => {
  try {
    const { nombre, apellido, email, nombreNegocio, descripcion, calle, numero, ciudad,
      horario } = req.body
    let logoUrl = null;
    if (req.file) {
      logoUrl = req.file.path;
    }
    if (req.user.id != req.params.id) {
      res.status(401).json({ message: 'Usuario no autorizado' })
    }
    let usuario = await Usuario.findById(req.params.id)
    if (nombre) {
      usuario.nombre = nombre;
    }
    if (apellido) {
      usuario.apellido = apellido;
    }
    if (email) {
      usuario.email = email;
    }
    if (nombreNegocio) {
      usuario.nombreNegocio = nombreNegocio;
    }
    if (descripcion) {
      usuario.descripcion = descripcion;
    }
    if (calle) {
      usuario.direccion.calle = calle;
    }
    if (numero) {
      usuario.direccion.numero = numero;
    }
    if (ciudad) {
      usuario.direccion.ciudad = ciudad;
    }
    if (horario) {
      usuario.horario = horario;
    }
    if (logoUrl) {
      usuario.logoUrl = logoUrl
    }
    usuario.save()
    res.status(200).json({ message: 'usuario editado', user: usuario })

  }
  catch (err) {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      res.status(400).json({ message: 'Specified id is not valid' });
      return;
    }
    console.log(err)
    res.json(err);
  }
})




//eliminar usuario
router.delete('/:id', async (req, res, next) => {
  try {
    const usuario = await Usuario.findByIdAndRemove(req.params.id)
    res.status(200).json({ message: 'usuario borrado' })
  } catch (err) {
    res.json(err)
  }
})



module.exports = router;
