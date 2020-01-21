const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/Sagemcom',{useNewUrlParser: true});
const Schema = mongoose.Schema;

const deviceSchema = new Schema({
    DevEUI: String,
    GPS_Longitude: Number,
    GPS_Laltitude: Number,
    performance : String 
});

deviceSchema.virtual('id').get(function () {
    return this._id.toHexString();
});

// Ensure virtual fields are serialised.
deviceSchema.set('toJSON', {
    virtuals: true
});

deviceSchema.findById = function (cb) {
    return this.model('Devices').find({id: this.id}, cb);
};

const Device = mongoose.model('Devices', deviceSchema);

exports.findById = (id) => {
    return Device.findById(id)
        .then((result) => {
            result = result.toJSON();
            delete result._id;
            delete result.__v;
            return result;
        });
};

exports.findID = (DevEUI) => {
    return Device.find({DevEUI: DevEUI}).then((result) => {
        //console.log(result.length)
        return result.length;
    });
};

exports.createDevice = (gatewayData) => {
    const device = new Device(gatewayData);
    return device.save();
};


exports.ADD = (deviceData) => {
    var DevEUI = deviceData['lnsDevEui'];
    var GPS_Longitude =deviceData['deviceLongitudeWGS84'];
    var GPS_Laltitude = deviceData['deviceLatitudeWGS84'];
    var device = new Device({
        DevEUI:DevEUI,
        GPS_Longitude: GPS_Longitude,
        GPS_Laltitude :GPS_Laltitude
        })
    device.save()
}

exports.list = (perPage, page) => {
    return new Promise((resolve, reject) => {
        Device.find()
            .limit(perPage)
            .skip(perPage * page)
            .exec(function (err, devices) {
                if (err) {
                    reject(err);
                } else {
                    resolve(devices);
                }
            })
    });
};

exports.removeById = (DevEUI) => {
    return new Promise((resolve, reject) => {
        Device.remove({DevEUI: DevEUI}, (err) => {
            if (err) {
                reject(err);
            } else {
                resolve(err);
            }
        });
    });
};

/*exports.patchDevice = (id, deviceData) => {
    return new Promise((resolve, reject) => {
        Device.findById(id, function (err, device) {
            if (err) reject(err);
            for (let i in deviceData) {
                device[i] = deviceData[i];
            }
            device.save(function (err, updatedDevice) {
                if (err) return reject(err);
                resolve(updatedDevice);
            });
        });
    });

};*/

exports.patchDevice = (DevEUI, deviceData) => {
    return new Promise((resolve, reject) => {
        Device.findOneAndUpdate({DevEUI: DevEUI},deviceData, function (err, device) {
            if (err) reject(err);
            resolve(device);

            });
        });
};