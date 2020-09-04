require('dotenv').config();
const express = require('express');
const router = express.Router();
const mongoose = require("mongoose");
const Producto = require('../models/producto-modelo');
const Usuario = require('../models/usuario-modelo');


//ver todos los productos de un usuario 
router.get("/all", async (req, res, next)=>{
  try{
    console.log("produ")
    const usuario = await Usuario.findById(req.user.id)
    const productos= await Producto.find({idUsuario:usuario})
    res.json(productos)
  } catch(err){
    res.json(err)
  }
})

//ver un prodcuto 
router.get("/:id", async (req,res,next) => {
  try{
    const producto =await Producto.findById(req.params.id);
    res.status(200).json(producto)
  }
  catch(err){
    res.json(err)
  }
})

//crear un producto 
router.post("/", async (req, res, next)=>{
  try{
    const{nombre, descripcion, precio, ingredientes,imagenUrl,idUsuario }= req.body
    const iduser= req.user.id;
    const producto = await Producto.create({
      nombre:nombre,
      descripcion:descripcion,
      precio:precio,
      ingredientes:ingredientes,
      imagenUrl:imagenUrl,
      idUsuario:iduser
    })
    
    res.status(200).json(producto)
    console.log("producto creado", producto)
  }catch(err){
    res.json(err)
    console.log("producto  no creado", err)
  }
})


//editar un producto 
router.patch("/:id", async (req, res, next)=>{
  try{
    const producto = await Producto.findByIdAndUpdate(req.params.id, req.body)
    res.json({ message: 'producto editado' })
  }catch(err){
    res.json(err)
    console.log("producto  no editado")
  }
} )

//eliminar producto 
router.delete("/:id", async (req, res, next)=>{
  try{
    const producto= await Producto.findByIdAndDelete(req.params.id)
    res.json({ message: 'producto eliminado' })
  }catch(err){
    res.json(err)
    console.log("producto  no eliminado")
  }
})

module.exports = router;