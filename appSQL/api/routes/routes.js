'use strict';

module.exports = function(app) {
    var controller = require('../controller/controller');
    
    app.route('/vehiculo/modelo/:marca/:nombreModelo')
        .get(controller.vehiculoPorModelo);
    app.route('/vehiculo/propietario/:anios')
        .get(controller.vehiculoPropietarioEdad);
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