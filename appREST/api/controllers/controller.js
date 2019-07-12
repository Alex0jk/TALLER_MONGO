'use strict'
exports.holaMundo = function(req, res) {
    
    res.json("Hola Mundo");
};
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
    Marca.findById(req.params.marcaId)
    .then(marca => {
        if(!marca) {
            return res.status(404).send({
                message: "Marca not found with id " + req.params.marcaId
            });            
        }
        res.send(marca);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Marca not found with id " + req.params.marcaId
            });                
        }
        return res.status(500).send({
            message: "Something wrong retrieving Marca with id " + req.params.marcaId
        });
    });
};