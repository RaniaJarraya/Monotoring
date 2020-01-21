const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/Sagemcom',{useNewUrlParser: true});
const Schema = mongoose.Schema;
const gatewaySchema = new Schema({
    GTW_ID: String,
    data_id: Number,
    GTW_Longitude: Number,
    GTW_Laltitude: Number,
    GTW_RSSI: Number,
    GTW_SNR: Number,
    GTW_RSSI_Signal: Number
});

gatewaySchema.virtual('id').get(function () {
    return this._id.toHexString();
});

// Ensure virtual fields are serialised.
gatewaySchema.set('toJSON', {
    virtuals: true
});

gatewaySchema.findById = function (cb) {
    return this.model('Gateways').find({id: this.id}, cb);
};

const Gateway = mongoose.model('Gateways', gatewaySchema);

exports.findById = (id) => {
    return Gateway.findById(id)
        .then((result) => {
            result = result.toJSON();
            delete result._id;
            delete result.__v;
            return result;
        });
};


exports.findID = (GTW) => {
    return new Promise((resolve, reject) => {
        Gateway.find({GTW_ID: GTW})
            .exec(function (err, gate) {
                if (err) {
                    reject(err);
                } else {
                    resolve(gate.length);
                }
            })
    })
};

exports.findID = (GTW) => {
    return Gateway.find({GTW_ID: GTW});
};


/*exports.findID = (GTW) => {
    return new Promise((resolve, reject) => {
        Gateway.find({GTW_ID: GTW}, (err) => {
            if (err) {
                reject(err);
            } else {
                resolve(err);
            }
        });
    });
};
*/
exports.createGateway = (gatewayData) => {
    console.log(gatewayData)
    const gateway = new Gateway(gatewayData);
    return gateway.save();
};

exports.ADD = (gatewayData) => {
    for( i in gatewayData){
        console.log(i)
        console.log( gatewayData[i]['gatewayID'])
        var GTW_ID = gatewayData[i]['gatewayID'];
        var GTW_Longitude =gatewayData[i]['antennaLongitude'];
        var GTW_Laltitude = gatewayData[i]['antennaLatitude'];
        var GTW_RSSI = gatewayData[i]['rssi'];
        var GTW_SNR =gatewayData[i]['snr'];
        var GTW_RSSI_Signal = gatewayData[i]['rssiSignal'];
        var gateway = new Gateway({
            GTW_ID:GTW_ID,
            GTW_Longitude: GTW_Longitude,
            GTW_Laltitude :GTW_Laltitude,
            GTW_RSSI: GTW_RSSI,
            GTW_SNR: GTW_SNR,
            GTW_RSSI_Signal: GTW_RSSI_Signal
            })
        gateway.save()
          };
      
}

/*
module.exports.ADD = (gatewayData) => {
        //console.log( gatewayData[i]['gatewayID'])
        var GTW_ID = gatewayData['gatewayID'];
        var GTW_Longitude =gatewayData['antennaLongitude'];
        var GTW_Laltitude = gatewayData['antennaLatitude'];
        var GTW_RSSI = gatewayData['rssi'];
        var GTW_SNR =gatewayData['snr'];
        var GTW_RSSI_Signal = gatewayData['rssiSignal'];
        var gateway = new Gateway({
            GTW_ID:GTW_ID,
            GTW_Longitude: GTW_Longitude,
            GTW_Laltitude :GTW_Laltitude,
            GTW_RSSI: GTW_RSSI,
            GTW_SNR: GTW_SNR,
            GTW_RSSI_Signal: GTW_RSSI_Signal
            })
        gateway.save()
};*/
      


exports.list = (perPage, page) => {
    return new Promise((resolve, reject) => {
        Gateway.find()
            .limit(perPage)
            .skip(perPage * page)
            .exec(function (err, gate) {
                if (err) {
                    reject(err);
                } else {
                    resolve(gate);
                }
            })
    });
};


exports.removeName = (GTW_ID) => {
    return new Promise((resolve, reject) => {
        Gateway.remove({GTW_ID: GTW_ID}, (err) => {
            if (err) {
                reject(err);
            } else {
                resolve(err);
            }
        });
    });
};


/*
exports.removeById = (gatewayId) => {
    return new Promise((resolve, reject) => {
        Gateway.remove({_id: gatewayId}, (err) => {
            if (err) {
                reject(err);
            } else {
                resolve(err);
            }
        });
    });
};

exports.patchGateway = (id, gateData) => {
    return new Promise((resolve, reject) => {
        Gateway.findById(id, function (err, gate) {
            if (err) reject(err);
            for (let i in gateData) {
                gate[i] = gateData[i];
            }
            gate.save(function (err, updatedGateway) {
                if (err) return reject(err);
                resolve(updatedGateway);
            });
        });
    });

};*/

/*exports.patch = ( gatewayData) => {
    return new Promise((resolve, reject) => {
        for (i in gatewayData){
            console.log(gatewayData[i])
            Gateway.findOneAndUpdate({GTW_ID: gatewayData[i]['gatewayID']},gatewayData[i], function (err, gate) {
                if (err) reject(err);
                resolve(gate);
    
                });
        }
        });
};*/

exports.patch = ( gatewayData) => {
    return new Promise((resolve, reject) => {
            console.log(gatewayData)
            Gateway.findOneAndUpdate({GTW_ID: gatewayData['gatewayID']},gatewayData, function (err, gate) {
                if (err) reject(err);
                resolve(gate);
    
                });
        });
};


exports.patchGateway = (GTW_ID, gatewayData) => {
    return new Promise((resolve, reject) => {
        Gateway.findOneAndUpdate({GTW_ID: GTW_ID},gatewayData, function (err, gate) {
            if (err) reject(err);
            resolve(gate);

            });
        });
};
