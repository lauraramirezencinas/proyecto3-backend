require('dotenv').config();
const express = require('express');
const router = express.Router();
const mongoose = require("mongoose");
const Usuario = require('../models/usuario-modelo');
const Producto = require('../models/producto-modelo');
const Pedido = require('../models/pedido-modelo');


//ver todos los  pedido por baker
router.get("/all", async (req, res, next) => {
    try {

        let pedidos = null

        if (req.user) {
            if (req.query.status) {
                console.log("filtroooo",req.query.status )
                pedidos = await Pedido.find({idUsuario: req.user.id ,status: req.query.status })
            }else{
                pedidos = await Pedido.find({ idUsuario: req.user.id })
            }
            
           
        }
        res.status(200).json(pedidos)
    }
    catch (err) {
        res.json(err)
    }
})

//ver un solo pedido 
router.get("/:id", async (req, res, next) => {
    try {
        const pedido = await Pedido.find({ _id: req.params.id })
        res.status(200).json(pedido)

    }
    catch (err) {
        res.json(err)
    }
})

//crear un pedido 
router.post("/", async (req, res, next) => {
    try {
        const { precioTotal, nombre, telefono, email, recogida, idUsuario, items } = req.body;
        const pedidos = await Pedido.find()
        let numeroPedido = 1000;
        if (pedidos.length != 0) {
            let ordenados = pedidos.sort((a, b) => a.numeroPedido - b.numeroPedido);
            let total = ordenados.length;
            console.log(ordenados)
            let mayor = ordenados[total - 1]
            console.log(mayor)
            numeroPedido = mayor.numeroPedido + 1
        }
        const datos = {
            idUsuario: idUsuario,
            precioTotal: precioTotal,
            items: items,
            nombre: nombre,
            telefono: telefono,
            email: email,
            recogida: recogida,
            numeroPedido: numeroPedido

        }
        const pedido = await Pedido.create(datos)
        res.status(200).json(pedido)
        console.log("pedido creado", pedido)
    } catch (err) {
        res.json(err)
        console.log("pedido  no creado", err)
    }
})

//editar el pedido 
router.patch("/:id", async (req, res, next) => {
    try {

        const pedido = await Pedido.findByIdAndUpdate(req.params.id, req.body)
        res.json({ message: 'pedido editado' })
    }
    catch (err) {
        res.json(err)
        console.log("el pedido no fue editado ", err)
    }
})



module.exports = router;