//This content is released under the MIT License, http://opensource.org/licenses/MIT. See licence.txt for more details.
var Utils = require("./Utils");
var Constants = require("./Constants");
var nets = require("nets");

/**
 * @constructor
 * @param {string} baseURL - URL for the Open PHACTS API
 * @param {string} appID - Application ID for the application being used. Created by {@link https://dev.openphacts.org}
 * @param {string} appKey - Application Key for the application ID.
 * @license [MIT]{@link http://opensource.org/licenses/MIT}
 * @author [Ian Dunlop]{@link https://github.com/ianwdunlop}
 */
ConceptWikiSearch = function(baseURL, appID, appKey) {
	this.baseURL = baseURL;
	this.appID = appID;
	this.appKey = appKey;
}

/**
 * Performs a free text search to resolve the identity of an entity in a certain branch.
 * @param {string} query - Query of at least three characters.
 * @param {string} limit - The maximum number of search results.
 * @param {string} branch - The branch to search in: chebi, uniprot, drugbank, chembl or ocrs.
 * @param {string} type - Restrict search by compound, target or targetComponent.
 * @param {requestCallback} callback - Function that will be called with the result.
 * @method
 */
ConceptWikiSearch.prototype.freeText = function(query, limit, branch, type, callback) {
    params={};
    params['_format'] = "json";
    params['app_key'] = this.appKey;
    params['app_id'] = this.appID;
    params['q'] = query;
    limit ? params['l'] = limit : '';
    branch ? params['b'] = branch : '';
    type != null ? params['t'] = type : '';
    nets({
        url: this.baseURL + '/search?' + Utils.encodeParams(params),
        method: "GET",
        // 30 second timeout just in case
        timeout: 30000,
        headers: {
            "Accept": "application/json"
        }
    }, function(err, resp, body) {
        if (resp.statusCode === 200) {
            callback.call(this, true, resp.statusCode, JSON.parse(body.toString()));
        } else {
            callback.call(this, false, resp.statusCode);
        }
    });


}

ConceptWikiSearch.prototype.findCompounds = function(query, limit, callback) {
	params = {};
	params['_format'] = "json";
    params['app_key'] = this.appKey;
    params['app_id'] = this.appID;
    params['q'] = query;
    params['t'] = 'compound';
    limit != null ? params['l'] = limit : '';
    nets({
        url: this.baseURL + '/search?' + Utils.encodeParams(params),
        method: "GET",
        // 30 second timeout just in case
        timeout: 30000,
        headers: {
            "Accept": "application/json"
        }
    }, function(err, resp, body) {
        if (resp.statusCode === 200) {
            callback.call(this, true, resp.statusCode, JSON.parse(body.toString()));
        } else {
            callback.call(this, false, resp.statusCode);
        }
    });
}

ConceptWikiSearch.prototype.findTargets = function(query, limit, callback) {
	params = {};
	params['_format'] = "json";
    params['app_key'] = this.appKey;
    params['app_id'] = this.appID;
    params['q'] = query;
    limit ? params['l'] = limit : '';
    params['t'] = 'target';
    nets({
        url: this.baseURL + '/search?' + Utils.encodeParams(params),
        method: "GET",
        // 30 second timeout just in case
        timeout: 30000,
        headers: {
            "Accept": "application/json"
        }
    }, function(err, resp, body) {
        if (resp.statusCode === 200) {
            callback.call(this, true, resp.statusCode, JSON.parse(body.toString()));
        } else {
            callback.call(this, false, resp.statusCode);
        }
    });
}

ConceptWikiSearch.prototype.parseResponse = function(response) {
	var uris = [];
        response.hits.forEach(function(hit, i) {
		var label;
		hit["label"] != null ? label = hit["label"][0] : '';
		if (label != null) {
                    hit["altLabel"] ? label = hit["altLabel"][0] : '';
		}
			    uris.push({
				   'uri': hit["@id"],
				   'prefLabel': label,
				   'type': hit["@ops_type"],
				   // use the first type, can there be multiple?
				   'originalType': hit["@type"][0]
			    });
		    });
	return uris;
}
