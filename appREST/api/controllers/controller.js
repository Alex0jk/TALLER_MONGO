'use strict'
var mongoose = require('mongoose'),
Modelo = mongoose.model('Modelo');

exports.holaMundo = function(req, res) {
    res.json("Hola Mundo");
};

exports.createModelo = function(req,res){
  var newModelo = new Modelo(req.body);
  newModelo.save(function(err, modelo) {
    if (err)
        res.send(err);
    else{
        res.json(modelo);
    }
  });
}

exports.listModelo = function(req,res){
    Modelo.find({}, function(err, modeloList) {
        if (err)
            res.send(err);
        else{
            res.json(modeloList);
        }
    });
}

exports.modeloByCode = function(req,res){
    Modelo.find({codigo:req.params.codigo},function(err,modelo){
        if(err){
            res.json(err);
        }
        else{
            console.log(modelo);
            res.json(modelo);
        }
      });
}