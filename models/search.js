exports.byRegexCaseInsensitive = s => ({ '$regex': s, '$options': 'i' });

exports.bySemicolonDelimitedAll = s => ({ '$all': s.split(";") });

exports.queryToFilter = (query = {}, filterFields = {}) => {
    let filter = {};
    Object
        .keys(filterFields)
        .filter(key => key in query)
        .forEach(key => filter[key] = filterFields[key](query[key]));
    return filter;
};

