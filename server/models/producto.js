const mongoose = require("mongoose");

let Schema = mongoose.Schema;

let productoSchema = new Schema({
  nombre: {
    type: String,
    required: [true, "El nombre es Requerido"]
  },
  precioUni: {
    type: Number,
    required: [true, "El precio es requerido"]
  },
  disponible: {
    type: Boolean,
    default: true
  }
});

module.exports = mongoose.model("producto", productoSchema);
