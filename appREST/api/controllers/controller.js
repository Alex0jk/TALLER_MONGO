'use strict'
var mongoose = require('mongoose'),
Modelo = mongoose.model('Modelo'),
Marca = mongoose.model('Marca'),
Vehiculo = mongoose.model('Vehiculo');

exports.holaMundo = function(req, res) {
    res.json("Hola Mundo");
};

exports.crearVehiculo = function(req,res){
    Marca.findOne({nombre:req.body.marca},function(error,marca){
        if(error){
            res.status(500).json(error);
        }
        else{
            console.log(marca);
            Modelo.findOne({nombre:req.body.modelo},function(error,modelo){
                if(error){
                    res.status(500).json(error);
                }
                else{
                    console.log(modelo);
                    if((req.body.anio >=1800) && req.body.anio<=2019){
                        if((req.body.motor >0) && (req.body.motor < 10000)){
                            if((req.body.transmision == "MAN") || (req.body.transmision == "AUT")){
                                var newVehiculo = new Vehiculo({
                                    placa: req.body.placa,
                                    marca: marca._id,
                                    modelo: modelo._id,
                                    anio: req.body.anio,
                                    motor: req.body.motor,
                                    transmision: req.body.transmision,
                                    propietario: req.body.propietario
                                });
                                newVehiculo.save();
                                res.json(newVehiculo);
                            } else{
                                res.status(404).json();
                            }
                        } else{
                            res.status(404).json();
                        }
                    } else{
                        res.status(404).json();
                    }
                    
                }
            });
        }
    });
    
}

exports.vehiculoPorPlaca = function(req,res){
    Vehiculo.find({placa:req.params.placaId}).populate('marca').populate('modelo').exec((err,vehiculo)=>{
        if(err){
            res.status(500).json(err);
        }
        else{
            console.log(vehiculo);
            if(vehiculo[0]==undefined){
                res.status(404).json({
                    message:"vehículo no encontrado"
                });
            }
            else{
                res.json(vehiculo);
            } 
        }
      });
      
}

exports.vehiculoPorModelo = function(req,res){
    Modelo.findOne({codigoMarca:req.params.marca,nombre:req.params.nombreModelo},function(err,modeloResult){
        if(err){
            res.json(err);
        }
        else{
            console.log(modeloResult);
            Vehiculo.find({modelo:modeloResult}).populate('marca').populate('modelo').exec((errV,vehiculos)=>{
                if(errV){
                    res.json(errV);
                }
                else{
                    console.log(vehiculos);
                    if(vehiculos[0]==undefined){
                        res.status(404).json({
                            message:"vehículos no encontrado"
                        });
                    }
                    else{
                        res.json(vehiculos);
                    } 
                }
            });
        }
      });
    
}
exports.vehiculoPorMarca = function(req,res){
    Marca.findOne({codigo:req.params.codigoMarca},function(err,marcaResult){
        if(err){
            res.json(err);
        }
        else{
            console.log(marcaResult);
            Vehiculo.find({marca:marcaResult}).populate('marca').populate('modelo').exec((errV,vehiculos)=>{
                if(errV){
                    res.json(errV);
                }
                else{
                    console.log(vehiculos);
                    if(vehiculos[0]==undefined){
                        res.status(404).json({
                            message:"vehículos no encontrado"
                        });
                    }
                    else{
                        res.json(vehiculos);
                    } 
                }
            });
        }
      });
    
}
exports.updatePropietario=function(req,res){
    if(!req.body) {
        return res.status(400).send({
            message: "No se enviaron datos"
        });
    }
    console.log(req.body)
    Vehiculo.update(
        {placa: req.body.placa},
        {propietario:{
            cedula: req.body.propietario.cedula,
            nombrePropietario: req.body.propietario.nombrePropietario,
            fechaNacimiento: req.body.propietario.fechaNacimiento
        }}
      ).then((rawResponse) => {
        console.log(rawResponse)
        if(rawResponse.n == 0) {
            return res.status(404).send({
                message: "no existe el vehiculo con la placa " + req.body.placa
            });
        }else{
            return res.status(200).send();
        }
        
      })
      .catch((err) => {
            res.status(500).json(err);
      });
    
    }

exports.vehiculoPropietarioEdad = function(req,res){
    var date = new Date();
    date.setFullYear( date.getFullYear() - req.params.anios );
    console.log(date.toISOString());
    Vehiculo.find({'propietario.fechaNacimiento':{$lt:date.toISOString()}})
    .populate('marca').populate('modelo').exec((err,vehiculo)=>{
        if(err){
            res.status(500).json(err);
        }
        else{
            console.log(vehiculo);
            if(vehiculo[0]==undefined){
                res.status(404).json({
                    message:"vehículos no encontrado"
                });
            }
            else{
                res.json(vehiculo);
            } 

        }
    });
}
exports.crearMarca=function(req,res)
{
    var newMarca = new Marca(req.body);
    newMarca.save(function(err, marca) {
      if (err)
          res.status(500).send(err);
      else{
          res.json(marca);
      }
    });

}

exports.listMarca = (req, res) => {
    Marca.find()
    .then(marcas => {
        if(marcas[0]==undefined){
            res.status(404).json(
                {
                    message:"No se encontraron marcas"
                }
            );
        }
        else{
            res.send(marcas);
        }
    }).catch(err => {
        res.status(500).send({
            message: err.message || "No existe marca"
        });
    });
};

exports.marcaByCode = (req, res) => {
    Marca.find({codigo:req.params.marcaId},function(err,marca){
        if(err){
            res.status(500).json(err);
        }
        else{
            console.log(marca);
            if(marca[0]==undefined){
                res.status(404).json(
                    {
                        message:"No se encontro marca"
                    }
                );
            }
            else{
                res.send(marca);
            }
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
                    res.status(500).send(err);
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
            res.status(500).send(err);
        else{
            if(modeloList[0]==undefined){
                res.status(404).json(
                    {
                        message:"No se encontraron modelos"
                    }
                );
            }
            else{
                res.send(modeloList);
            }
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
            if(modelo[0]==undefined){
                res.status(404).json(
                    {
                        message:"No se encontro modelos"
                    }
                );
            }
            else{
                res.send(modelo);
            }
        }
      });
}

