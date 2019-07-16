'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ModelSchema = new Schema({
    codigoMarca: {type: String, required: true,index:{unique:true},dropDups: true},
    nombre: {type: String, required: true},
});
// Export the model
module.exports = mongoose.model('Modelo', ModelSchema);


var marcaSchema = new Schema({
    codigo:  String,
    nombre: String,
});
module.exports= mongoose.model('Marca',marcaSchema);


var VehiculoSchema = new Schema({
  placa: {type: String, max: 7,index:{unique:true},dropDups: true},  
  marca: [{type: Schema.Types.ObjectId, ref: 'Marca'}],
  modelo: [{type: Schema.Types.ObjectId, ref: 'Modelo'}],
  //marca: String,
  //modelo: String,
  anio: {type: String},
  motor: {type: String},
  transmision: {type: String},
  propietario: {
      cedula: String,
      nombrePropietario: String,
      fechaNacimiento: Date },
});

module.exports = mongoose.model('Vehiculo', VehiculoSchema);