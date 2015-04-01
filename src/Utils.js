/**
 * Check if some data is an array and return either itself if it is an array
 * or an array with it as the first member if it is not. Used for the cases where
 * the API returns either an array or a singleton.
 * @param {Object}
 * @returns {Array}
 * @method
 */
exports.arrayify = function(data) {
    if (!Array.isArray(data)) {
        return [data];
    } else {
        return data;;
    }
}

exports.encodeParams = function(params) {
    var requestParams = "";
    Object.keys(params).forEach(function(key, index) {
        requestParams += key + "=" + encodeURIComponent(params[key]) + "&";
    });
    requestParams = requestParams.substr(0, requestParams.length - 1);
    return requestParams;
}
