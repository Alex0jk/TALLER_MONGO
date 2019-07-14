'use strict';

module.exports = function(app) {
    var controller = require('../controllers/controller');

   app.route('/holaMundo')
        .get(controller.holaMundo);
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
