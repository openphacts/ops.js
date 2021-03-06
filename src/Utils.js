var nets = require("nets");

/**
 * Set to true to debug http requests
 */
var debug = false;
if (typeof process !== 'undefined') {
  debug = process.env.debug == "true";
}

/**
 * Check if some data is an array and return either itself if it is an array
 * or an array with it as the first member if it is not. Used for the cases where
 * the API returns either an array or a singleton.
 * @param {Object}
 * @returns {Array}
 * @method
 * @license [MIT]{@link http://opensource.org/licenses/MIT}
 * @author [Ian Dunlop]{@link https://github.com/ianwdunlop}
 */
exports.arrayify = function(data) {
    if (!Array.isArray(data)) {
        return [data];
    } else {
        return data;;
    }
}

/**
 * Turns an object containing key/value pairs into URI encoded 'key1=value1&key2=value2...' parameters for
 * an http request.
 * @param {Object}
 * @returns {String}
 * @method
 * @license [MIT]{@link http://opensource.org/licenses/MIT}
 * @author [Ian Dunlop]{@link https://github.com/ianwdunlop}
 */
exports.encodeParams = function(params) {
    var requestParams = "";
    Object.keys(params).forEach(function(key, index) {
        requestParams += key + "=" + encodeURIComponent(params[key]) + "&";
    });
    requestParams = requestParams.substr(0, requestParams.length - 1);
    return requestParams;
}

/**
  * Perform HTTP(S) request using nets.
  * Optional debugging of URL and results.
  */
exports.nets = function(options, callback) {
  if (debug) {
      console.log(options.method + " " + options.url);
      return nets(options, function(err, resp, body) {
        if (err != null) {
          console.log(err);
        } else {
          console.log(resp.statusCode);
        }
        return callback(err, resp, body);
      });
  } else {
    return nets(options, callback);
  }
}
