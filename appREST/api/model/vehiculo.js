var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var VehiculoSchema = new Schema({
    placa: {type: String, max: 7},
    
    marca: [{type: Schema.Types.ObjectId, ref: 'Marca'}],
    modelo: [{type: Schema.Types.ObjectId, ref: 'Modelo'}],

    año: {type: String},
    motor: {type: String},
    trnasimision: {type: String},
    propietario: [{
        cedula: {type:String},
        nombrePropietario: {type: String},
        fechaNacimiento: {type: String} }],
});

module.exports = mongoose.model('Vehiculo', VehiculoSchema);