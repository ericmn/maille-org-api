//viewerController.js
Weave = require('../models/weaveModel');

const defaultProjection = Object
    .keys(Weave.schema.tree)
    .filter(key => Weave.schema.tree[key].index)
    .reduce((obj, key) => Object.assign(obj, { [key]: 1 }), { _id: 0 });

const defaultSort = { CreatedAt: 1 };

const respond = res => function (err, data) { res.json(err ? err : data); };

exports.index = function (req, res) {
    let { limit, offset } = req.query;
    Weave
        .search(req.query)
        .lean()
        .select(defaultProjection)
        .sort(defaultSort)
        .limit(limit)
        .skip(offset)
        .exec(respond(res));
};

exports.search = function (req, res) {
    let query = req.query;
    Weave
        .search(query)
        .lean()
        .select(defaultProjection)
        .sort(defaultSort)
        .exec(respond(res));
};

exports.new = function (req, res) {
    let body = req.body;
    Weave
        .create(body, respond(res));
};

exports.fetch = function (req, res) {
    let params = req.params;
    Weave
        .find(params, respond(res));
};

exports.delete = function (req, res) {
    let params = req.params;
    Weave
        .deleteMany(params, respond(res));
};