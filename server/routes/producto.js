const express = require("express");
const Producto = require("../models/producto");
const app = express();

app.post("/producto", function(req, res) {
  let body = req.body;

  let producto = new Producto({
    nombre: body.nombre,
    precioUni: body.precioUni,
    disponible: body.disponible
});

  producto.save((err, productoDB) => {
    if (err) {
      return res.status(400).json({
        ok: false,
        err
      });
    }
    res.json({
      ok: true,
      categoria: productoDB
    });
  });
});


module.exports = app;