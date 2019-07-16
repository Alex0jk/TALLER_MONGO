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
    Modelo.findAll({
        where: { CODIGOMARCA: req.body.modelo.codigoMarca, NOMBRE: req.body.modelo.nombre}
    }).then(modelo=>{
        Propietario.findOrCreate({where: {CEDULA: req.body.propietario.cedula},
            defaults: {
                NOMBRE:req.body.propietario.nombrePropietario,
                FECHANACIMIENTO:req.body.propietario.fechaNacimiento
            }
        }).then(([propietario, created]) => {
            console.log(modelo);
            Vehiculo.create({ PLACA: req.body.placa, 
                CODIGOMARCA: req.body.marca, 
                CODIGOMODELO: modelo[0].dataValues.CODIGOMODELO, 
                ANIO: req.body.anio, 
                MOTOR: req.body.motor,
                TRANSMISION: req.body.transmision,
                CODIGOPROPIETARIO: propietario.dataValues.CODIGOPROPIETARIO
            })
              .then(vehiculos=> {
                      res.json(vehiculos);
              }).catch(err=> {
                  console.log(err);
                  res.status(500).send("Error en la operacion");
              });
        });
    });
}

exports.vehiculoPorPlaca = function (req,res){
    Vehiculo.findAll({
        where: {placa : req.params.placaId}
        }).then(vehiculos => {
            if(vehiculos[0]==undefined){
                res.status(404).json({
                    message:"vehículo no encontrado"
                });
            }
            else{
                res.json(vehiculos);
            } 
        })
        .catch(err =>{
            console.log(err);
            res.status(500).send("Error en la operación");
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
        if(vehiculo[0]==undefined){
            res.status(404).json({
                message:"vehículo no encontrado"
            });
        }
        else{
            res.json(vehiculo);
        }
    }).catch(err=>{
        console.log(err);
        res.status(500).send("Error en la operación");
    })
    
}
exports.vehiculPorMarca = function(req,res){
    Vehiculo.findAll({
        include: [{
            model: Marca,
            where: {CODIGOMARCA: req.params.codigo}
        },
        {
            model:Propietario
        }]
    }).then(vehiculo=>{
        if(vehiculo[0]==undefined){
            res.status(404).json({
                message:"vehículo no encontrado"
            });
        }
        else{
            res.json(vehiculo);
        } 
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
        if(vehiculo[0]==undefined){
            res.status(404).json({
                message:"vehículo no encontrado"
            });
        }
        else{
            res.json(vehiculo);
        }
    }).catch(err=>{
        console.log(err);
        res.status(500).send("Error en la operación");
    })
}

exports.updatePropietario=function(req,res){
    Propietario.findOrCreate({where: {CEDULA: req.body.propietario.cedula},
        defaults: {
            NOMBRE:req.body.propietario.nombrePropietario,
            FECHANACIMIENTO:req.body.propietario.fechaNacimiento
        }
    }).then(([propietario, created])=>{
        Vehiculo.update({CODIGOPROPIETARIO : propietario.dataValues.CODIGOPROPIETARIO}, {
            where: {
                PLACA: req.body.placa
            }})  .then(vehiculo=>{
            res.json(vehiculo);
        }).catch(err=>{
            console.log(err);
            res.status(500).send("Error en la operación");
        })
    }); 
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
        if(modelos[0]==undefined){
            res.status(404).json({
                message:"modelos no encontrado"
            });
        }
        else{
            res.json(modelos);
        }
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
        if(modelos[0]==undefined){
            res.status(404).json({
                message:"modelos no encontrado"
            });
        }
        else{
            res.json(modelos);
        }
    })
    .catch(err=>{
        console.log(err);
        res.status(500).send("Error en la operación");
    });
  }
  exports.createMarca = function(req,res){
    Marca.create({ CODIGOMARCA: req.body.codigo, NOMBRE: req.body.nombre })
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
    if(marcas[0]==undefined){
        res.status(404).json({
            message:"marcas no encontrado"
        });
    }
    else{
        res.json(marcas);
    }
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
    if(marcas[0]==undefined){
        res.status(404).json({
            message:"marcas no encontrado"
        });
    }
    else{
        res.json(marcas);
    }
})
.catch(err=>{
    console.log(err);
    res.status(500).send("Error en la operacion");
});

}