require('dotenv').config();
const express = require('express');
const router = express.Router();
const mongoose = require("mongoose");
const nodemailer = require('nodemailer');
const Usuario = require('../models/usuario-modelo');
const Review = require('../models/review-modelo');



//ver todos las review por baker
router.get("/all", async (req, res, next) => {
    try {
        let rewiews = null
        if (req.user) {
                rewiews = await Pedido.find({ idUsuario: req.user.id })
            }                    
        res.status(200).json(rewiews)
    }
    catch (err) {
        res.json(err)
    }
})


//crear una review  
router.post("/", async (req, res, next) => {
    try {
        const { nombre, numeroPedido, comentario, rating} = req.body;
        const idUsuario= req.params.id
        if (!numeroPedido ) {
             res.status(400).json({
               message: "El numero del pedido es obligatorio*"
             })
             return
           }
         
        const datos = {
            idUsuario: idUsuario,
            nombre: nombre,
            numeroPedido: numeroPedido,
            comentario: comentario,
            rating: rating,   
        }

        
        const review = await Review.create(datos) 

        res.status(200).json(review)       
        console.log("review creado", review)
    } catch (err) {
        console.log(err)
        res.status(401).json({ message: res })
    }
})


module.exports = router;