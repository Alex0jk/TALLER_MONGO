'use strict';

module.exports = function(app) {
    var controller = require('../controllers/controller');

    app.route('/holaMundo')
        .get(controller.holaMundo);
    app.route('/vehiculo')
        .post(controller.crearVehiculo);
    app.route('/vehiculo/:placaId')
        .get(controller.vehiculoPorPlaca);
    app.route('/vehiculo/modelo/:marca/:nombreModelo')
        .get(controller.vehiculoPorModelo);
    app.route('/vehiculo/marca/:nombreMarca')
        .get(controller.vehiculoPorMarca);

    app.route('/vehiculo/propietario/:anios')
        .get(controller.vehiculoPropietarioEdad);
   app.route('/marca')
        .get(controller.listMarca)
        .post(controller.crearMarca);
    app.route('/marca/:marcaId')
        .get(controller.marcaByCode);
    app.route('/modelo')
        .get(controller.listModelo)
        .post(controller.createModelo);
    app.route('/modelo/:codigo')
        .get(controller.modeloByCode);
}
