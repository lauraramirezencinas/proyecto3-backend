require('dotenv').config();
const express = require('express');
const router = express.Router();
const mongoose = require("mongoose");
const nodemailer = require('nodemailer');
const Review = require('../models/review-modelo');



//ver todos las review por baker
router.get("/:id", async (req, res, next) => {
    try {
        let rewiews = null 

        rewiews = await Review.find({ idUsuario: req.params.id }) 
                                      
        res.status(200).json(rewiews)
    }
    catch (err) {
        res.json(err)
    }
})



//crear una review  
router.post("/", async (req, res, next) => {
    try {
        const { nombre, numeroPedido, comentario, rating, idUsuario} = req.body;
        if (!numeroPedido ) {
             res.status(400).json({
               message: "Numero del pedido y rating son obligatorios"
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