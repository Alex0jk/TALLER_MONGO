'use strict';
const Sequelize = require('sequelize'),
    sequelize = new Sequelize('tallerdb', 'root', 'root', {
        dialect: 'mysql'
    });
const Modelo = sequelize.import("../model/modelo");

exports.createModelo = function(req,res){
    Modelo.create({ NOMBRE: req.body.nombre, CODIGOMARCA: req.body.codigoMarca })
        .then(user=>{
            res.json(user)
        }).catch(err=> {
            console.log(err);
            if(err.name == "SequelizeForeignKeyConstraintError"){
                res.status(404).send("No existe marca especificada");
            }
            else{
                res.status(500).send("Error en la operación");
            }
                
        });
}
  
  exports.listModelo = function(req,res){
    Modelo.findAll()
    .then(modelos => {
        res.json(modelos);
    })
    .catch(err=>{
        console.log(err);
        res.status(500).send("Error en la operación");
    });
  }
  
  exports.modeloByCode = function(req,res){
    Modelo.findAll({
        where: {codigoMarca: req.params.codigo}
      }).then(modelos => {
        res.json(modelos);
    })
    .catch(err=>{
        console.log(err);
        res.status(500).send("Error en la operación");
    });
  }