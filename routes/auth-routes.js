require('dotenv').config();
const express = require('express');
const authRoutes = express.Router();

const saltRounds = 10
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
// const session = require('express-session');
// const nodemailer = require('nodemailer');
const passport = require('passport');
const Usuario = require('../models/usuario-modelo');


//authRoutes.get("/signup", (req, res) => res.render("index"))

authRoutes.post("/signup", async (req, res, next) => {
  try {
    const { nombre, apellido, email, password, isBaker } = req.body
    //Comprobracion de que todos los campos han sido introducidos
    if (!nombre || !email || !password) {
      res.status(400).json({
        message: "Los campos username, email y contraseña son obligatorios"
      })
      return
    }
    //Validacion password fuerte front-end 
    //La contraseña debe contener al menos 6 caracteres, una mayúscula y un número
    const regex = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/;
    if (!regex.test(password)) {
      res.status(400).json({ message: 'La contraseña debe contener al menos 6 caracteres, una mayúscula y un número' });
      return;
    }

    try {
      const foundUser = await Usuario.findOne({ email: email })
      if (foundUser) {
        res.status(400).json({ message: 'el email ya existe' });
        return;
      }
    }
    catch (err) {
      if (err) {
        res.status(500).json({ message: err });
        return;
      }
    }

    // Encriptacion de la password
    const salt = await bcrypt.genSalt(saltRounds);
    const hashedPassword = await bcrypt.hash(password, salt);
    const usuario = await new Usuario({
      nombre: nombre,
      apellido: apellido,
      email: email,
      passwordHash: hashedPassword,
      isBaker: isBaker
    })

    try {
      const nuevoUsuario = await usuario.save()
      req.login(nuevoUsuario, (err) => {
        if (err) {
          res.status(500).json({ message: "error al loguearse" + err });
          return;
        }
        res.status(200).json(nuevoUsuario)
      })

    } catch (err) {
      res.status(400).json({ message: 'El usuario no fue creado' + err });
      return
    }


    // req.session.currentUser = usuario;
    // let transporter = await nodemailer.createTransport({
    //   host: "smtp.eu.mailgun.org",
    //   port: 25,
    //   auth: {
    //     user: process.env.USER_MG,
    //     pass: process.env.PASS_MG
    //   },
    // });
    // transporter.sendMail({
    //   from: 'info@my-menu.site',
    //   to: email,
    //   subject: "¡Bienvenido a MyMenu!",
    //   html: `<h2><b>Hola</b> ${nombre}, </h1>
    //   <h3>Bienvenido a MyMenu</h3>

    //   <br/>
    //   <p>Ahora podrás introducir tu carta o menú del dia y mostrarlo a tus clientes de manera inmediata.</p>
    //   <br/>
    //   <p>100% higienico y rapido!</p>
    //   <img src="https://res.cloudinary.com/dtkvfvtev/image/upload/v1593548914/mymenu_lchxqn.png" alt="logo Mymenu">
    //   `

    // }, (err, info) => {
    //   console.log(err);
    // });


  } catch (error) {
    if (error instanceof mongoose.Error.ValidationError) {
      res.status(400).json({
        message:  error
      });
      //Error de duplicidad
    } else if (error.code === 11000) {
      res.status(400).json({
        message: 'correo ya existe, por favor pruebe uno nuevo.'
      });

    } else {
      next(error);
    }
  }
})


//authRoutes.get('/login', (req, res) => res.render('index'))

authRoutes.post('/login', async (req, res, next) => {
  passport.authenticate('local', (err, theUser, failureDetails) => {
    if (err) {
      res.status(500).json({ message: 'Error de autentificacion' });
      return;
    }

    if (!theUser) {
      res.status(401).json(failureDetails);
      return;
    }

    req.login(theUser, (err) => {
      if (err) {
        res.status(500).json({ message: 'Session save went bad.' });
        return;
      }
      res.status(200).json(theUser);
    })
  })(req, res, next);
})

authRoutes.post('/logout', (req, res, next) => {
  req.logout();
  res.status(200).json({ message: 'Session finalizada' });
});


authRoutes.get('/loggedin', (req, res, next) => {
  if (req.isAuthenticated()) {
      res.status(200).json(req.user);
      return;
  }
  res.status(403).json({ message: 'Unauthorized' });
});




module.exports = authRoutes;