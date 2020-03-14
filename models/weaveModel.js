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
        id: {
            type: String,
            default: shortid.generate,
            index: true,
            unique: true
        },
        name: {
            type: String,
            required: true,
            index: true,
            unique: true
        },
        aliases: {
            type: [String],
            required: false,
            index: true
        },
        tags: {
            type: [String],
            required: false,
            index: true
        },
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
    { timestamps: true }
);

const weaveSearchQueryMap = {
    'name': s => ({ '$regex': s, '$options': 'i' }),
    'aliases': s => ({ '$regex': s, '$options': 'i' }),
    'tags': s => ({ '$all': s.split(";") })
};
weaveSchema.static('search', function (query = {}, ..._) {
    let filter = {}
    Object
        .keys(weaveSearchQueryMap)
        .filter(key => query[key] !== undefined)
        .forEach(key => filter[key] = weaveSearchQueryMap[key](query[key]));
    //console.log(filter)
    return this.find(filter, ..._);
});

module.exports = mongoose.model('weave', weaveSchema);


//module.exports.get = function (callback, limit) {
//    Weave.find(callback).limit(limit);
//}