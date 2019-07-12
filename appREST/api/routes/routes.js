'use strict';

module.exports = function(app) {
    var controller = require('../controllers/controller');
    
    app.route('/holaMundo')
        .get(controller.holaMundo);
    app.route('/modelo')
        .get(controller.listModelo)
        .post(controller.createModelo);
    app.route('/modelo/:codigo')
        .get(controller.modeloByCode);
}