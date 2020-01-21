const DeviceModel = require('../models/device.model');

module.exports.predect = (req, res) => {
    var spawn = require('child_process').spawn
	//var exec = require('child_process').exec;
	//const child_process = require('child_process');
	//var id=71;
	var child=spawn('python', ['C:/Users/Rania/Desktop/ka/Device/controllers/test.py'])
    var datain = [req.params['InputInfo1'],req.params['InputInfo2'],req.params['InputInfo3']]
    console.log(datain)
    //var child = exec('python test.py');
    child.stdin.write(JSON.stringify(datain));
	child.stdout.on('data', function(data) {
        result=[data.toString()]
		res.send(result);
        console.log('stdout: ' + data);
	});
	child.stderr.on('data', function(data) {
		console.log('stdout: ' + data);
	});
	
    child.stdin.end();

};


exports.insert = (req, res) => {
    DeviceModel.createDevice(req.body)
        .then((result) => {
            res.status(201).send({id: result._id});
        });
};

exports.list = (req, res) => {
    let limit = req.query.limit && req.query.limit <= 100 ? parseInt(req.query.limit) : 10;
    let page = 0;
    if (req.query) {
        if (req.query.page) {
            req.query.page = parseInt(req.query.page);
            page = Number.isInteger(req.query.page) ? req.query.page : 0;
        }
    }
    DeviceModel.list(limit, page)
        .then((result) => {
            res.status(200).send(result);
        })
};


exports.getById = (req, res) => {
    DeviceModel.findById(req.params.deviceId)
        .then((result) => {
            res.status(200).send(result);
        });
};
exports.getID = (req, res) => {
    DeviceModel.findID(req.params.DevEUI)
        .then((result) => {
            res.status(200).send(result);
        });
};

exports.removeById = (req, res) => {
    DeviceModel.removeById(req.params.DevEUI)
        .then((result)=>{
            res.status(204).send({});
        });
};

exports.patch = (req, res) => {
    DeviceModel.patchDevice(req.params.DevEUI, req.body)
        .then((result) => {
            res.status(204).send({});
        });
};
