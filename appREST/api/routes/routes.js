'use strict';

module.exports = function(app) {
    var controller = require('../controllers/controller');

   app.route('/holaMundo')
        .get(controller.holaMundo);

    app.route('/vehiculo')
        .post(controller.crearVehiculo);
    app.route('/vehiculo/:placaId')
        .get(controller.vehiculoPorPlaca);
   app.route('/marca')
        .get(controller.findAll)
        .post(controller.crearMarca);
    app.route('/marca/:marcaId')
        .get(controller.findOne);
    app.route('/modelo')
        .get(controller.listModelo)
        .post(controller.createModelo);
    app.route('/modelo/:codigo')
        .get(controller.modeloByCode);
}
