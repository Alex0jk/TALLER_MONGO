'use strict'
var mongoose = require('mongoose'),
Modelo = mongoose.model('Modelo'),
Marca = mongoose.model('Marca');

exports.holaMundo = function(req, res) {
    res.json("Hola Mundo");
};

exports.crearVehiculo = function(req,res){
    var newVehiculo = new Vehiculo(req.body);
    newVehiculo.save(function(err, vehiculo){
        if (err)
            res.send(err);
        else{
            res.json(vehiculo);
        }
    });
}

exports.vehiculByCode = function(req,res){
    Vehiculo.find({placa:req.params.codigo},function(err,vehiculo){
        if(err){
            res.json(err);
        }
        else{
            console.log(vehiculo);
            res.json(vehiculo);
        }
      });
}

exports.crearMarca=function(req,res)
{
    var newMarca = new Marca(req.body);
    newMarca.save(function(err, marca) {
      if (err)
          res.send(err);
      else{
          res.json(marca);
      }
    });

}

exports.findAll = (req, res) => {
    Marca.find()
    .then(marcas => {
        res.send(marcas);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "No existe marca"
        });
    });
};

exports.findOne = (req, res) => {
    Marca.find({codigo:req.params.marcaId},function(err,marca){
        if(err){
            res.json(err);
        }
        else{
            console.log(marca);
            res.json(marca);
        }
      });
};

exports.createModelo = function(req,res){
  Marca.find({codigo:req.body.codigoMarca},function(err,marca){
    if(err){
        res.json(err);
    }
    else{
        console.log(marca);
        if(marca[0]!=undefined){
            var newModelo = new Modelo(req.body);
            console.log(marca);
            newModelo.save(function(err, modelo) {
                if (err)
                    res.send(err);
                else{
                    res.json(modelo);
                }
            });
        }
        else{
            res.status(404).send({
                message:'No existe la marca'
            });
        }
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
    Modelo.find({codigoMarca:req.params.codigo},function(err,modelo){
        if(err){
            res.json(err);
        }
        else{
            console.log(modelo);
            res.json(modelo);
        }
      });
}

