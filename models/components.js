const mongoose = require("mongoose");

const vector3 = mongoose.Schema(
  {
    x: { type: Number, required: true },
    y: { type: Number, required: true },
    z: { type: Number, required: true },
  },
  { _id: false }
);

const ring = mongoose.Schema(
  {
    name: { type: String, default: null },
    size: { type: Number, required: true },
    AR: { type: Number, required: true },
  },
  { _id: false }
);

const position = mongoose.Schema(
  {
    name: { type: String, default: null },
    center: vector3,
    axis: vector3,
  },
  { _id: false }
);

module.exports = { vector3, ring, position };
