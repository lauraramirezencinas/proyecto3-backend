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
        const pedidos= await Pedido.find()
        let numeroPedido=1000;
        if (pedidos.length != 0){
            let ordenados = pedidos.sort((a,b)=> a.numeroPedido- b.numeroPedido);
            let total= ordenados.length;
            console.log(ordenados)
            let mayor=ordenados[total - 1]
            console.log(mayor)
            numeroPedido= mayor.numeroPedido+1
        }
       const datos={
        idUsuario: idUsuario,
        //precioTotal: precioTotal, 
        items:items, 
        nombre:nombre,
        telefono:telefono,
        email:email, 
        numeroPedido:numeroPedido
        //recogida:recogida
       }
        const pedido = await Pedido.create(datos)
        res.status(200).json(pedido)
        console.log("pedido creado", pedido)
    } catch (err) {
        res.json(err)
        console.log("pedido  no creado", err)
    }
})



module.exports = router;