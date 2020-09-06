require('dotenv').config();
const express = require('express');
const router = express.Router();
const mongoose = require("mongoose");
const Producto = require('../models/producto-modelo');
const Usuario = require('../models/usuario-modelo');


//ver todos los productos de un usuario 
router.get("/profile", async (req, res, next) => {
  try {
    const usuario = await Usuario.findById(req.user.id)
    const productos = await Producto.find({ idUsuario: usuario })
    res.json(productos)
  } catch (err) {
    res.json(err)
  }
})

//todos los productos sin usuario 
router.get("/all", async (req, res, next) => {
  try {
    let productos = null;

    if (req.query.user_id) {
      productos = await Producto.find({idUsuario:req.query.user_id}).populate("idUsuario")
    } else {
      if (req.query.search){
        productos = await Producto.find(
          { "nombre": { "$regex": `${req.query.search}`, "$options": "i" } },
          function(err,docs) { 
          } 
      ).populate("idUsuario");
      } else{
      productos = await Producto.find().populate("idUsuario")
      }
    }
    res.json(productos)
  } catch (err) {
    console.log(err);
    res.json(err)
  }
})

//ver un prodcuto 
router.get("/:id", async (req, res, next) => {
  try {
    const producto = await Producto.findById(req.params.id);
    res.status(200).json(producto)
  }
  catch (err) {
    res.json(err)
  }
})

//crear un producto 
router.post("/", async (req, res, next) => {
  try {
    const { nombre, descripcion, precio, ingredientes, imagenUrl, idUsuario } = req.body
    const iduser = req.user.id;
    const producto = await Producto.create({
      nombre: nombre,
      descripcion: descripcion,
      precio: precio,
      ingredientes: ingredientes,
      imagenUrl: imagenUrl,
      idUsuario: iduser
    })

    res.status(200).json(producto)
    console.log("producto creado", producto)
  } catch (err) {
    res.json(err)
    console.log("producto  no creado", err)
  }
})


//editar un producto 
router.patch("/:id", async (req, res, next) => {
  try {
    const producto = await Producto.findByIdAndUpdate(req.params.id, req.body)
    res.json({ message: 'producto editado' })
  } catch (err) {
    res.json(err)
    console.log("producto  no editado")
  }
})

//eliminar producto 
router.delete("/:id", async (req, res, next) => {
  try {
    const producto = await Producto.findByIdAndDelete(req.params.id)
    res.json({ message: 'producto eliminado' })
  } catch (err) {
    res.json(err)
    console.log("producto  no eliminado")
  }
})

module.exports = router;