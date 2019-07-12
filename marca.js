var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var marcaSchema = new Schema({
  codigo:  String,
  nombre: String,
  
});
module.exports= mongoose.model('Marca',marcaSchema);