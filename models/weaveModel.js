const mongoose = require('mongoose');
const shortid = require('shortid');

const vector3Schema = mongoose.Schema(
    {
        x: { type: Number, required: true },
        y: { type: Number, required: true },
        z: { type: Number, required: true }
    },
    { _id: false }
);

const ringSchema = mongoose.Schema(
    {
        name: { type: String, default: null },
        size: { type: Number, required: true },
        AR: { type: Number, required: true }
    },
    { _id: false }
);

const positionSchema = mongoose.Schema(
    {
        name: { type: String, default: null },
        center: vector3Schema,
        axis: vector3Schema
    },
    { _id: false }
);

const weaveSchema = mongoose.Schema(
    {
        _id: {
            type: String,
            default: shortid.generate
        },
        name: {
            type: String,
            required: true,
            unique: true
        },
        aliases: {
            type: [String],
            required: false
        }
        ,
        tags: {
            type: [String],
            required: false
        }
        ,
        rings: {
            type: [ringSchema],
            required: true
        },
        positions: {
            type: [positionSchema],
            required: true
        },
        directions: {
            type: [vector3Schema],
            required: true
        },
    },
);

var Weave = module.exports = mongoose.model('weave', weaveSchema);

//module.exports.get = function (callback, limit) {
//    Weave.find(callback).limit(limit);
//}