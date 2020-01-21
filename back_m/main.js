const config = require('./env.config.js');
var mqtt = require('mqtt');
const express = require('express');
const main = express();
const bodyParser = require('body-parser');

const SecurityRouter = require('./security/routes.config');
const IdentityRouter = require('./identity/routes.config');
const indexRouter 	= require('./welcome/routes.config');
const GatewayRouter 	= require('./Gateway/routes.config');
const DeviceRouter 	= require('./Device/routes.config');
const UploadsRouter 	= require('./Gateway/controllers/data.provider');
config.initRefreshSecret();

//voir Helmet.md
const tls = require('spdy'); //http2 + https (tls)
const fs = require('fs');
let helmet = require('helmet');

const options2 = {
    key: fs.readFileSync('./TLS_2/test-key.pem'),
    cert: fs.readFileSync('./TLS_2/test-cert.pem')
};

main.use(helmet());

var options = {
    port: 15825,
    host: '	tailor.cloudmqtt.com',
    clientId: 'mqttjs_' + Math.random().toString(16).substr(2, 8),
    username: 'gjxtruok',
    password: '8wvavkK3r1Ug',
    keepalive: 60,
    reconnectPeriod: 1000,
    protocolId: 'MQIsdp',
    protocolVersion: 3,
    clean: true,
    encoding: 'utf8'
};
var client = mqtt.connect('mqtt://tailor.cloudmqtt.com', options);
client.on('connect',UploadsRouter.connexion )
var logger = require('morgan');
main.use(logger('dev'));
var cors = require('cors');

main.use(cors());
main.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', 'https://localhost:8100'/*, http://localhost:8100/tab/device', https://genealogy.kaaniche.xyz'*/);
    res.header('Access-Control-Allow-Credentials', 'true');
    res.header('Access-Control-Allow-Methods', 'GET,HEAD,PUT,PATCH,POST,DELETE');
    res.header('Access-Control-Expose-Headers', 'Content-Length');
    res.header('Access-Control-Allow-Headers', 'Accept, Authorization, Content-Type, X-Requested-With, Range');
    if (req.method === 'OPTIONS') {
        return res.send(200);
    } else {
        return next();
    }
});

main.use(bodyParser.json());
SecurityRouter.routesConfig(main);
IdentityRouter.routesConfig(main);
GatewayRouter.routesConfig(main);
DeviceRouter.routesConfig(main);
var path 		= require('path');
// view engine setup
/*main.set('views', path.join(__dirname, 'welcome/views'));
main.set('view engine', 'ejs');*/

indexRouter.routesConfig(main);
//main.listen(config.port,() => console.log(`server started at port: ${config.port}`));
tls.createServer(options2, main).listen(config.port, (error) => {
        if (error) {
            console.error(error);
            return process.exit(1)
        } else {
            console.log('express main configured with HTTP2 and TLSv1.2 and listening on port: ' + config.port + '.')
        }
    });
