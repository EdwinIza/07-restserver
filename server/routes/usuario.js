const express = require("express");
const Usuario = require("../models/usuario");
const underscore = require("underscore");
const bcrypt = require("bcrypt");
const app = express();

app.get("/usuario", function(req, res) {
  let desde = req.query.desde || 0;
  desde = Number(desde);
  let limite = req.query.limite || 5;
  limite = Number(limite);

  Usuario.find({},'nombre email role google img')
    .limit(limite)
    .skip(desde)
    .exec((err, usuarios) => {
      if (err) {
        return res.status(400).json({
          ok: false,
          err
        });
      }
      Usuario.count({}, (err, conteo) => {
        res.json({
          ok: true,
          cuantos: conteo,
          usuario: usuarios,
        });
      });
    });
});

app.post("/usuario", function(req, res) {
  let body = req.body;

  let usuario = new Usuario({
    nombre: body.nombre,
    email: body.email,
    password: bcrypt.hashSync(body.password, 10),
    role: body.role,
    img: body.img
  });

  usuario.save((err, usuarioDB) => {
    if (err) {
      return res.status(400).json({
        ok: false,
        err
      });
    }
    //usuarioDB.password= null;
    res.json({
      ok: true,
      usuario: usuarioDB
    });
  });
});

app.put("/usuario/:id", function(req, res) {
  let id = req.params.id;
  //Solucion eficiente
  let body = underscore.pick(req.body, [
    "nombre",
    "email",
    "img",
    "role",
    "estado"
  ]);

  //Solucion no eficiente
  // delete body.password;
  // delete bodey.google;

  Usuario.findByIdAndUpdate(
    id,
    body,
    { new: true, runValidators: true },
    (err, usuarioDB) => {
      if (err) {
        return res.status(400).json({
          ok: false,
          err
        });
      }

      res.json({
        ok: true,
        usuario: usuarioDB
      });
    }
  );
});

app.delete("/usuario/:id", function(req, res) {
  let id = req.params.id;

  Usuario.findByIdAndRemove(id,(err, usuarioBorrado)=>{
    if (err) {
      return res.status(400).json({
        ok: false,
        err
      });
    }
    if (usuarioBorrado === null) {
      return res.status(400).json({
        ok: false,
        err: {
          message: 'Usuario no encontrado'
        }
      });
    }
    res.json({
      ok: true,
      usuario: usuarioBorrado
    });
  });
});

module.exports = app;
