'use strict';

module.exports = function(app) {
    var controller = require('../controllers/controller');
    
    app.route('/holaMundo')
        .get(controller.holaMundo);
}