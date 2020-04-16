const mongoose = require("mongoose");

const search = require("./search");
const components = require("./components");
const shortid = require("shortid");

const weaveSchema = mongoose.Schema(
  {
    id: {
      type: String,
      default: shortid.generate,
      index: true,
      unique: true,
    },
    name: {
      type: String,
      required: true,
      index: true,
      unique: true,
    },
    aliases: {
      type: [String],
      required: false,
      index: true,
    },
    tags: {
      type: [String],
      required: false,
      index: true,
    },
    rings: {
      type: [components.ring],
      required: true,
    },
    positions: {
      type: [components.position],
      required: true,
    },
    directions: {
      type: [components.vector3],
      required: true,
    },
  },
  { timestamps: true }
);

const filterFields = {
  name: search.byRegexCaseInsensitive,
  aliases: search.byRegexCaseInsensitive,
  tags: search.bySemicolonDelimitedAll,
};

weaveSchema.static("search", function (query, ..._) {
  let filter = search.queryToFilter(query, filterFields);
  return this.find(filter, ..._);
});

module.exports = mongoose.model("weave", weaveSchema);
