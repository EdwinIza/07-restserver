const mongoose = require("mongoose");

let Schema = mongoose.Schema;

let categoriaSchema = new Schema({
  nombre: {
    type: String,
    required: [true, "El nombre es Requerido"]
  }
});

module.exports = mongoose.model("categoria", categoriaSchema);
