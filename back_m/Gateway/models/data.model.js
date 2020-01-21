const mongoose = require('mongoose');
const GatewayModel = require('../models/gateway.model');
mongoose.connect('mongodb://localhost:27017/Sagemcom',{useNewUrlParser: true});
const Schema = mongoose.Schema;
const DataSchema = new Schema({
    data:Object,
    Topic:String,
    date:Date
});

const Data = mongoose.model('Uploads', DataSchema);

exports.createData = (NData,topic) => {
   var dd = new Data({
          data: NData,
          Topic:topic,
          date: new Date,
        });
        dd.save()
};
exports.insert = (req, res) => {
  GatewayModel.ADD(req.body)
};

