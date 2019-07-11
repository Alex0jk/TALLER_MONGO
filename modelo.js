var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ModelSchema = new Schema({
    codigoMarca: {type: String, required: true},
    nombre: {type: String, required: true},
});


// Export the model
module.exports = mongoose.model('Modelo', ModelSchema);