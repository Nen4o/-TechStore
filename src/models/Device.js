const mongoose = require('mongoose');

const deviceSchema = new mongoose.Schema({
    brand: {
        type: String,
        required: true,
        minLength: 2,
    },
    model: {
        type: String,
        required: true,
        minLength: 5,
    },
    hardDisk: {
        type: String,
        required: true,
        minLength: 5,
    },
    screenSize: {
        type: String,
        minLength: 1,
        required: true,
    },
    ram: {
        type: String,
        minLength: 2,
        required: true,
    },
    operatingSystem: {
        type: String,
        required: true,
        minLength: 5,
        maxLength: 20,
    },
    cpu: {
        type: String,
        required: true,
        minLength: 10,
        maxLength: 50,
    },
    gpu: {
        type: String,
        required: true,
        minLength: 10,
        maxLength: 50,
    },
    price: {
        type: Number,
        required: true,
        min: 0
    },
    color: {
        type: String,
        required: true,
        minLength: 2,
        maxLength: 10,
    },
    weight: {
        type: String,
        required: true,
        minLength: 1,
    },
    image: {
        type: String,
        required: true,
        validate: /^https?\/\//,
    },
    preferredList: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    }],
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    }
})

const Device = mongoose.model('Device', deviceSchema);

module.exports = Device;