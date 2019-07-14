'use strict';

module.exports = function(app) {
    var controller = require('../controller/controller');
    
    app.route('/modelo')
        .get(controller.listModelo)
        .post(controller.createModelo);
    app.route('/modelo/:codigo')
        .get(controller.modeloByCode);
}