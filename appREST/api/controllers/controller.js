'use strict'
var mongoose = require('mongoose'),
Modelo = mongoose.model('Modelo'),
Marca = mongoose.model('Marca'),
Vehiculo = mongoose.model('Vehiculo');

exports.holaMundo = function(req, res) {
    res.json("Hola Mundo");
};

exports.crearVehiculo = function(req,res){
    Marca.find({codigo:req.body.marca},function(error,marca){
        if(error){
            res.json(error);
            return res.status(404).json()
        }
        else{
            console.log(marca);
            Modelo.find({codigoMarca:req.body.modelo},function(error,modelo){
                if(error){
                    res.json(error);
                }
                else{
                    console.log(modelo);
                    if((req.body.anio >=1800) && req.body.anio<=2019){
                        if((req.body.motor >0) && (req.body.motor < 10000)){
                            if((req.body.transmision == "MAN") || (req.body.transmision == "AUT")){
                                var newVehiculo = new Vehiculo({
                                    placa: req.body.placa,
                                    marca: marca[0]._id,
                                    modelo: modelo[0]._id,
                                    anio: req.body.anio,
                                    motor: req.body.motor,
                                    transmision: req.body.transmision,
                                    propietario: req.body.propietario
                                });
                                newVehiculo.save();
                                return res.json("nuevo vehiculo");
                            } else{
                                return res.status(404).json();
                            }
                        } else{
                            return res.status(404).json();
                        }
                    } else{
                        return res.status(404).json();
                    }
                    
                }
            });
        }
    });
    
}

exports.vehiculoPorPlaca = function(req,res){
    Vehiculo.find({placa:req.params.placaId},function(err,vehiculo){
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

