const Device = require('../models/Device');

const deviceServices = {
    getAll() {
        return Device.find();
    },
    create(deviceData) {
        return Device.create(deviceData);
    },
    getById(deviceId) {
        return Device.findById(deviceId);
    },
    updateById(deviceId, updateData) {
        return Device.findByIdAndUpdate(deviceId, updateData, { runValidators: true });
    },
    deleteById(deviceId) {
        return Device.findByIdAndDelete(deviceId);
    }
}

module.exports = deviceServices;