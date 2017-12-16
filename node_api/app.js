'use strict';

var SwaggerExpress = require('swagger-express-mw');
var bodyParser = require('body-parser');
var cors = require('cors');
var app = require('express')();
module.exports = app; // for testing
global.absolutePath = __dirname;
global.q = require('q');
global._ = require('underscore');
global.config = require('./config/config');
global.commonFunc = require('./services/commonFunctions')


var swaggerConfig = {
    appRoot: __dirname // required config
};

var baseUrl = config.baseUrl;

app.use(cors());

app.use(bodyParser.raw({
    limit: '50mb'
}));
app.use(bodyParser.json({
    limit: '50mb'
}));
app.use(bodyParser.urlencoded({
    limit: '50mb',
    extended: true
}));


SwaggerExpress.create(swaggerConfig, function(err, swaggerExpress) {
    if (err) { throw err; }
    swaggerExpress.register(app);

    //===========Routes Start===================
    app.get(baseUrl + '/ping', function(req, res) {
        res.status(200).send('Pong');
    });
    app.get(baseUrl + '/skills', require('./api/controllers/getSkills').start);
    app.post(baseUrl + '/addSkill', require('./api/controllers/addSkill').start);
    app.get(baseUrl + '/search', require('./api/controllers/searchSkills').start);
    app.put(baseUrl + '/update', require('./api/controllers/editSkill').start);
    app.put(baseUrl + '/approve', require('./api/controllers/editStatus').start);

    //===========Routes End===================


    app.use(function(err, req, res, next) {
        console.log('-----Something broke!---', err);
        res.status(500).send('Something broke!');
    });


    var port = process.env.PORT || 1234;
    var server = app.listen(port);
    server.timeout = 3600000;
    module.exports = exports;
    if (swaggerExpress.runner.swagger.paths['/hello']) {
        console.log('try this:\ncurl http://127.0.0.1:' + port + baseUrl + '/ping');
    }
});