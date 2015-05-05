//This content is released under the MIT License, http://opensource.org/licenses/MIT. See licence.txt for more details.
/**
 * @constructor
 * @param {string} baseURL - URL for the Open PHACTS API
 * @param {string} appID - Application ID for the application being used. Created by https://dev.openphacts.org
 * @param {string} appKey - Application Key for the application ID.
 * @license [MIT]{@link http://opensource.org/licenses/MIT}
 * @author Ian Dunlop
 */
Openphacts.TissueSearch = function TissueSearch(baseURL, appID, appKey) {
    this.baseURL = baseURL;
    this.appID = appID;
    this.appKey = appKey;
}

/**
 * Fetch the tissue represented by the URI provided.
 * @param {string} URI - The URI for the tissue of interest.
 * @param {string} [lens] - An optional lens to apply to the result.
 * @param {requestCallback} callback - Function that will be called with the result.
 * @method
 * @example
 * var searcher = new Openphacts.TissueSearch("https://beta.openphacts.org/1.5", "appID", "appKey");
 * var callback=function(success, status, response){
 *    var tissueResult = searcher.parseTissueResponse(response);
 * };
 * searcher.fetchTissue('ftp://ftp.nextprot.org/pub/current_release/controlled_vocabularies/caloha.obo#TS-0171', null, callback);
 */
Openphacts.TissueSearch.prototype.fetchTissue = function(URI, lens, callback) {
    params = {};
    params['_format'] = "json";
    params['app_key'] = this.appKey;
    params['app_id'] = this.appID;
    params['uri'] = URI;
    lens ? params['_lens'] = lens : '';
    var tissueQuery = $.ajax({
        url: this.baseURL + '/tissue',
        dataType: 'json',
        cache: true,
        data: params
    }).done(function(response, status, request) {
        callback.call(this, true, request.status, response.result);
    }).fail(function(response, status, statusText) {
        callback.call(this, false, response.status);
    });
}

/**
 * Parse the results from {@link Openphacts.TissueSearch#fetchTissue}
 * @param {Object} response - the JSON response from {@link Openphacts.TissueSearch#fetchTissue}
 * @returns {FetchTissueResponse} Containing the flattened response
 * @method
 */
Openphacts.TissueSearch.prototype.parseTissueResponse = function(response) {
    var constants = new Openphacts.Constants();
    var uri = response.primaryTopic[constants.ABOUT];
    var label = response.primaryTopic.label;
    var definition = response.primaryTopic.definition != null ? response.primaryTopic.definition : null;
    var dataset = response.primaryTopic[constants.IN_DATASET] != null ? response.primaryTopic[constants.IN_DATASET] : null;
    var dbXrefs = [];
    if (response.primaryTopic.hasDbXref != null) {
        Openphacts.arrayify(response.primaryTopic.hasDbXref).forEach(function(dbXref, index) {
            dbXrefs.push(dbXref);
        });
    }
    return {
        "uri": uri,
        "label": label,
        "definition": definition,
        "dataset": dataset,
        "dbXrefs": dbXrefs
    };
}
