require('dotenv').config();
const express = require('express');
const router = express.Router();
const mongoose = require("mongoose");
const Usuario = require('../models/usuario-modelo');
const Producto = require('../models/producto-modelo');
const Pedido = require('../models/pedido-modelo');


//ver un pedido 
router.get("/all", async (req, res, next) => {
    try {
        const usuario = await Usuario.findById(req.user.id);
        const pedidos = await Pedido.find({ idUsuario: usuario })
        res.status(200).json(pedidos)
    }
    catch (err) {
        res.json(err)
    }
})

router.post("/", async (req, res, next) => {
    try {
        const { precioTotal, nombre, telefono, email, recogida, idUsuario} = req.body; 
        const items=req.body.items;
    
       
        const pedido = await Pedido.create({
            idUsuario: idUsuario,
            //precioTotal: precioTotal, 
            items:items, 
            nombre:nombre,
            telefono:telefono,
            email:email, 
            //recogida:recogida
        })
        res.status(200).json(pedido)
        console.log("pedido creado", pedido)
    } catch (err) {
        res.json(err)
        console.log("pedido  no creado", err)
    }
})



module.exports = router;