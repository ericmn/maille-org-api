const mongoose = require('mongoose');

const search = require('./search');
const components = require('./components');
const shortid = require('shortid');

const tutorialSchema = mongoose.Schema(
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
        tags: {
            type: [String],
            required: false,
            index: true
        },
        contributors: {
            type: [String],
            required: false
        },
        rings: {
            type: [components.ring],
            required: true
        },
        positions: {
            type: [components.position],
            required: true
        }
    },
    { timestamps: true }
);

const filterFields = {
    'name': search.byRegexCaseInsensitive,
    'tags': search.bySemicolonDelimitedAll
}

tutorialSchema.static('search', function (query, ..._) {
    let filter = search.queryToFilter(query, filterFields);
    return this.find(filter, ..._);
});

module.exports = mongoose.model('tutorial', tutorialSchema);
