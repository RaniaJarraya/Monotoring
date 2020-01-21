var mqtt = require('mqtt');
const DataModel = require('../models/data.model');
const GatewayModel = require('./../models/gateway.model');
const DeviceModel=require('./../../Device/models/device.model');
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

var tab =[]
var tab2 =[]
var client = mqtt.connect('mqtt://tailor.cloudmqtt.com', options);
module.exports.connexion = (req, res) =>{ // When connected
    console.log('connected');
    // subscribe to a topic
    client.subscribe('#', function() {
        // when a message arrives, do something with it
        client.on('message', function(topic, message, packet) {
            console.log("Received = " + message);
            DataModel.createData(JSON.parse(message),topic)  
            console.log(JSON.parse(message)['gateways'])
            GatewayModel.ADD(JSON.parse(message)['gateways'])  
            DeviceModel.findID(JSON.parse(message)['lnsDevEui']).then((result) => {
                if (result==0){
                    DeviceModel.ADD(JSON.parse(message))
                }
                else{
                    device=[(JSON.parse(message))['lnsDevEui'],(JSON.parse(message))['deviceLongitudeWGS84'],JSON.parse(message)['deviceLatitudeWGS84']]
                    DeviceModel.patchDevice(JSON.parse(message)['lnsDevEui'],device) 
                }
                //console.log(result)
            });
    
    // publish a message to a topic
    /*client.publish('topic1/#', 'my message', function() {
        console.log("Message is published");
        client.end(); // Close the connection when published
    });*/
    })
  })
}