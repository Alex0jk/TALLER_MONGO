'use strict';

module.exports = function(app) {
    var controller = require('../controller/controller');
       
    app.route('/vehiculo')
        .post(controller.createVehiculo);
    app.route('/vehiculo/:placaId')
        .get(controller.vehiculoPorPlaca);
        
    app.route('/vehiculo/modelo/:marca/:nombreModelo')
        .get(controller.vehiculoPorModelo);
    app.route('/vehiculo/marca/:codigo')
      .get(controller.vehiculPorMarca);

    app.route('/vehiculo/propietario/:anios')
        .get(controller.vehiculoPropietarioEdad);
    app.route('/vehiculo/propietario')
        .put(controller.updatePropietario);

    app.route('/modelo')
        .get(controller.listModelo)
        .post(controller.createModelo);
    app.route('/modelo/:codigo')
        .get(controller.modeloByCode);
    app.route('/marca')
        .get(controller.listMarca)
        .post(controller.createMarca);
    app.route('/marca/:codigo')
        .get(controller.marcaByCode);
}