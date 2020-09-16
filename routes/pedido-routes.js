require('dotenv').config();
const express = require('express');
const router = express.Router();
const mongoose = require("mongoose");
const nodemailer = require('nodemailer');
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
        if (!nombre || !telefono ) {
             res.status(400).json({
               message: "Todos los campos son obligatorios*"
             })
             return
           }
        
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
            precioTotal: parseInt(precioTotal),
            items: items,
            nombre: nombre,
            telefono: parseInt(telefono),
            email: email,
            recogida: recogida,
            numeroPedido: numeroPedido

        }

        
        const pedido = await Pedido.create(datos)

        let transporter = await nodemailer.createTransport({
            host: "smtp.eu.mailgun.org",
            port: 25,
            auth: {
              user: process.env.USER_MG,
              pass: process.env.PASS_MG
            },
          });
          transporter.sendMail({
            from: 'info@my-menu.site',
            to: email,
            subject: "Pedido en Sugar-Place",
            html: `<div style="border: 1px solid #dadada;text-align: center;">
            <h2 style="color:#E32283 ; font-family: 'Montserrat', sans-serif;">Hola ${nombre}, </h1>
            <h3 style="color:#E32283 ; font-family: 'Montserrat', sans-serif;">Gracias por realizar tu pedido en Sugar-Place.</h3>
            <h4 style="color:#60656F ; font-family: 'Montserrat', sans-serif;"> Tu número de pedido es el <b> ${numeroPedido}</b> </h4>
            <p style="color:#60656F ; font-family: 'Montserrat', sans-serif;"> Podrás recoger tu pedido en ${recogida}, </p>
            <p style="color:#60656F ; font-family: 'Montserrat', sans-serif;">el importe a pagar es ${precioTotal}€</p>
            <h4 style="color:#60656F ; font-family: 'Montserrat', sans-serif;">¡QUE DISFRUTES!</h4>
            <p style="color:#60656F ; font-family: 'Montserrat', sans-serif;">Te esperamos pronto en Sugar-place</p>
            <br>
            <h5 style="color:#E32283; font-family: 'Lobster', cursive;font-size: 22px;">Sugar-Place</h5>
            </div>
            `
      
          }, (err, info) => {
            console.log(err);
          });
       
        
        res.status(200).json(pedido)

       
        //console.log("pedido creado", pedido)
    } catch (err) {
        console.log(err)
        res.status(401).json({ message: res })
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