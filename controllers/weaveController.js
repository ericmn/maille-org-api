//viewerController.js
Weave = require('../models/weaveModel');

const sendjson = res => function (err, data) { res.json(err ? err : data); }

exports.index = function (req, res) {
    let output = { name: 1};
    Weave.find({}, output, sendjson(res));
};

exports.new = function (req, res) {
    let weave = req.body;
    Weave
        .create(weave, sendjson(res));
};

exports.fetch = function (req, res) {
    let id = req.params.id;
    Weave
        .findById(id, sendjson(res));
};

exports.delete = function (req, res) {
    console.log(req.params)
    let filter = req.params;
    Weave.deleteMany(filter,sendjson(res));
};