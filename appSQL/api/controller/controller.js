'use strict';
const Sequelize = require('sequelize'),
    sequelize = new Sequelize('tallerdb', 'root', 'root', {
        dialect: 'mysql'
    });
const Op = Sequelize.Op
const Marca = sequelize.import("../model/marca");
const Modelo = sequelize.import("../model/modelo");
const Propietario = sequelize.import("../model/propietario");
const Vehiculo = sequelize.import("../model/vehiculo");
Marca.hasMany(Vehiculo,{foreignKey:'CODIGOMARCA'});
Vehiculo.belongsTo(Marca, {foreignKey: 'CODIGOMARCA'});
Modelo.hasMany(Vehiculo,{foreignKey:'CODIGOMODELO'});
Vehiculo.belongsTo(Modelo, {foreignKey: 'CODIGOMODELO'});
Propietario.hasMany(Vehiculo,{foreignKey:'CODIGOPROPIETARIO'});
Vehiculo.belongsTo(Propietario, {foreignKey: 'CODIGOPROPIETARIO'});

exports.createVehiculo = function(req,res){
    Vehiculo.create({ PLACA: req.body.PLACA, 
        CODIGOMARCA: req.body.codigoMarca, 
        CODIGOMODELO: req.body.codigoModelo, 
        ANIO: req.body.ANIO, 
        MOTOR: req.body.MOTOR,
        TRANSMISION: req.body.TRANSMISION,
        PROPIETARIO: req.body.codigoPropietario
    })
      .then(vehiculos=> {
              res.json(vehiculos);
      }).catch(err=> {
          console.log(err);
          res.status(500).send("Error en la operacion");
      });
    }


exports.vehiculoPorModelo = function(req,res){
    Vehiculo.findAll({
        include: [{
            model: Modelo,
            where: { CODIGOMARCA: req.params.marca, NOMBRE: req.params.nombreModelo}
        },
        {
            model:Propietario
        }]
    }).then(vehiculo=>{
        res.json(vehiculo);
    }).catch(err=>{
        console.log(err);
        res.status(500).send("Error en la operación");
    })
    
}
exports.vehiculPorMarca = function(req,res){
    Vehiculo.findAll({
        include: [{
            model: Marca,
            where: {NOMBRE: req.params.nombreMarca}
        },
        {
            model:Propietario
        }]
    }).then(vehiculo=>{
        res.json(vehiculo);
    }).catch(err=>{
        console.log(err);
        res.status(500).send("Error en la operación");
    })
    
}
exports.vehiculoPropietarioEdad = function(req,res){
    var date = new Date();
    date.setFullYear( date.getFullYear() - req.params.anios );
    console.log(date.toISOString());
    Vehiculo.findAll({
        include: [{
            model: Propietario,
            where: { FECHANACIMIENTO:{ [Op.lt]: date.toISOString() }}
        },
        {
            model:Modelo
        }]
    }).then(vehiculo=>{
        res.json(vehiculo);
    }).catch(err=>{
        console.log(err);
        res.status(500).send("Error en la operación");
    })
}

exports.createModelo = function(req,res){
    Modelo.create({ NOMBRE: req.body.nombre, CODIGOMARCA: req.body.codigoMarca })
        .then(modelo=>{
            res.json(modelo);
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
  exports.createMarca = function(req,res){
    Marca.create({ CODIGOMARCA: req.body.CODIGOMARCA, NOMBRE: req.body.NOMBRE })
      .then(marcas=> {
              res.json(marcas);
      }).catch(err=> {
          console.log(err);
          res.status(500).send("Error en la operacion");
      });
    }

exports.listMarca = function(req,res){
  Marca.findAll()
  .then(marcas => {
      res.json(marcas);
  })
  .catch(err=>{
      console.log(err);
      res.status(500).send("Error en la operacion");
  });
}
exports.marcaByCode = function(req,res){
Marca.findAll({
    where:{codigoMarca:req.params.codigo}
}).then(marcas => {
    res.json(marcas);
})
.catch(err=>{
    console.log(err);
    res.status(500).send("Error en la operacion");
});

}