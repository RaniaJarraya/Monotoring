const GatewayModel = require('../models/gateway.model');



exports.insert = (req, res) => {
    GatewayModel.createGateway(req.body)
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
    GatewayModel.list(limit, page)
        .then((result) => {
            res.status(200).send(result);
        })
};

exports.getById = (req, res) => {
    GatewayModel.findById(req.params.gatewayId)
        .then((result) => {
            res.status(200).send(result);
        });
};

exports.getID = (req, res) => {
    GatewayModel.findID(req.params.GTW)
        .then((result) => {
            res.status(200).send(result);
        });
};


exports.removeName = (req, res) => {
    GatewayModel.removeName(req.params.GTW_ID)
        .then((result)=>{
            res.status(204).send({});
        });
};

exports.patch = (req, res) => {
    GatewayModel.patchGateway(req.params.GTW_ID, req.body)
        .then((result) => {
            res.status(204).send({});
        });
};