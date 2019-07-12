'use strict';

module.exports = function(app) {
    var controller = require('../controllers/controller');

   app.route('/holaMundo')
        .get(controller.holaMundo);
   app.route('/crearMarca')
        .post(controller.crearMarca);
   app.route('/listMarca')
        .get(controller.findAll);
app.route('/getMarca')
        .get(controller.findOne);
}

    app.route('/modelo')
        .get(controller.listModelo)
        .post(controller.createModelo);
    app.route('/modelo/:codigo')
        .get(controller.modeloByCode);
}
